import { supabase } from './supabase';

export interface LiveBooking {
  id: string;
  token_id: string;
  slot_date: string;
  assigned_gate: string | null;
  weighbridge: string | null;
  queue_position: number | null;
  stage: string;
  wave: {
    time_range: string;
    wave_name: string;
    slots_remaining: number;
    expected_wait_mins: number;
    status: string;
  } | null;
  mandi: {
    name: string;
    current_stock_qtl: number;
    capacity_qtl: number;
  } | null;
}

export async function getActiveBooking(farmerId: string): Promise<LiveBooking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, token_id, slot_date, assigned_gate, weighbridge, queue_position, stage, wave:slot_waves(time_range, wave_name, slots_remaining, expected_wait_mins, status), mandi:mandis(name, current_stock_qtl, capacity_qtl)'
    )
    .eq('farmer_id', farmerId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Failed to fetch booking:', error.message);
    return null;
  }

  return data as unknown as LiveBooking | null;
}

export function subscribeToBooking(
  bookingId: string,
  onChange: (booking: Partial<LiveBooking>) => void
) {
  const uniqueSuffix = Math.random().toString(36).slice(2);
  const channel = supabase
    .channel('booking-' + bookingId + '-' + uniqueSuffix)
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'bookings', filter: 'id=eq.' + bookingId },
      (payload) => {
        onChange(payload.new as Partial<LiveBooking>);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToWave(waveId: string, onChange: (wave: any) => void) {
  const uniqueSuffix = Math.random().toString(36).slice(2);
  const channel = supabase
    .channel('wave-' + waveId + '-' + uniqueSuffix)
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'slot_waves', filter: 'id=eq.' + waveId },
      (payload) => {
        onChange(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
