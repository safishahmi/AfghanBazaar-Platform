import { createContext } from 'react';
import type { User } from '@supabase/supabase-js';

export type SignInOutcome = 'ok' | 'invalidCredentials' | 'failed';
export type SignUpOutcome = 'ok' | 'alreadyRegistered' | 'confirmationRequired' | 'failed';

export interface SellerAuthContextValue {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<SignInOutcome>;
  signUp: (email: string, password: string) => Promise<SignUpOutcome>;
  signOut: () => Promise<void>;
}

export const SellerAuthContext = createContext<SellerAuthContextValue | null>(null);
