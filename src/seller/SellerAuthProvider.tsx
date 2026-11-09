import { useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { SellerAuthContext, type SellerAuthContextValue } from './sellerAuthContext';

export function SellerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value: SellerAuthContextValue = {
    user,
    isLoading,
    signIn: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) return 'ok';
      return error.code === 'invalid_credentials' ? 'invalidCredentials' : 'failed';
    },
    signUp: async (email, password) => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) return error.code === 'user_already_exists' ? 'alreadyRegistered' : 'failed';
      return data.session ? 'ok' : 'confirmationRequired';
    },
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };

  return <SellerAuthContext.Provider value={value}>{children}</SellerAuthContext.Provider>;
}
