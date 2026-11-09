import { useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import {
  AdminAccessContext,
  type AdminAccessContextValue,
  type AdminAccessStatus,
} from './adminAccessContext';

async function isStaffMember(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('admin_staff')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle();
  return !error && data !== null;
}

export function AdminAccessProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AdminAccessStatus>('loading');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const applySession = async (session: Session | null) => {
      if (!active) return;
      if (!session) {
        setEmail(null);
        setStatus('signedOut');
        return;
      }
      const staff = await isStaffMember(session.user.id);
      if (!active) return;
      setEmail(session.user.email ?? null);
      setStatus(staff ? 'authorized' : 'denied');
    };

    supabase.auth.getSession().then(({ data }) => applySession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        await applySession(session);
      })();
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value: AdminAccessContextValue = {
    status,
    email,
    signIn: async (emailAddress, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email: emailAddress, password });
      if (!error) return 'ok';
      return error.code === 'invalid_credentials' ? 'invalidCredentials' : 'failed';
    },
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };

  return <AdminAccessContext.Provider value={value}>{children}</AdminAccessContext.Provider>;
}
