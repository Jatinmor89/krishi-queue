import { supabase } from './supabase';
import { UserRole } from '../types';

const ROLE_MAP: Record<UserRole, string> = {
  farmer: 'farmer',
  driver: 'transporter',
  'inspection-head': 'inspection_head',
  'mandi-head': 'mandi_officer',
  admin: 'admin',
};

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
  } else if (user.role === 'driver') {
    await supabase.from('transporters').upsert({ id: userId, name: user.name }, { onConflict: 'id' });
  }

  return userId;
}
