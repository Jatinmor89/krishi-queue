import { supabase } from './supabase';
import { UserRole } from '../types';

const ROLE_MAP: Record<UserRole, string> = {
  farmer: 'farmer',
  driver: 'transporter',
  'inspection-head': 'inspection_head',
  'mandi-head': 'mandi_officer',
  admin: 'admin',
};

const DEMO_MANDI_ID = '11111111-1111-1111-1111-111111111111';
const DEMO_WAVE_ID = '22222222-2222-2222-2222-222222222222';

export async function saveUserProfile(user: { name: string; phone: string; role: UserRole }) {
  let sessionResult = await supabase.auth.getSession();
  let session = sessionResult.data.session;

  if (!session) {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error('Supabase anonymous sign-in failed:', error.message);
      return null;
    }
    session = data.session;
  }

  const userId = session?.user.id;
  if (!userId) return null;

  const dbRole = ROLE_MAP[user.role];

  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({ id: userId, role: dbRole, phone: user.phone }, { onConflict: 'id' });

  if (profileError) {
    console.error('Failed to save profile:', profileError.message);
    return userId;
  }

  if (user.role === 'farmer') {
    await supabase.from('farmers').upsert({ id: userId, name: user.name }, { onConflict: 'id' });
    await ensureActiveBooking(userId);
  } else if (user.role === 'driver') {
    await supabase.from('transporters').upsert({ id: userId, name: user.name }, { onConflict: 'id' });
  }

  return userId;
}

async function ensureActiveBooking(farmerId: string) {
  const { data: existing, error: fetchError } = await supabase
    .from('bookings')
    .select('id')
    .eq('farmer_id', farmerId)
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    console.error('Failed to check existing booking:', fetchError.message);
    return;
  }

  if (existing) return;

  const tokenId = 'KQ-' + Math.floor(1000 + Math.random() * 9000);

  const { error: insertError } = await supabase.from('bookings').insert({
    token_id: tokenId,
    farmer_id: farmerId,
    mandi_id: DEMO_MANDI_ID,
    wave_id: DEMO_WAVE_ID,
    slot_date: new Date().toISOString().slice(0, 10),
    assigned_gate: 'Gate No. 3',
    weighbridge: 'Tractor Weighbridge #2',
    queue_position: 6,
    stage: 'booked',
  });

  if (insertError) {
    console.error('Failed to create booking:', insertError.message);
  }
}
