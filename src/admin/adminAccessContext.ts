import { createContext } from 'react';

export type AdminSignInResult = 'ok' | 'invalidCredentials' | 'failed';
export type AdminAccessStatus = 'loading' | 'signedOut' | 'denied' | 'authorized';

export interface AdminAccessContextValue {
  status: AdminAccessStatus;
  email: string | null;
  signIn: (emailAddress: string, password: string) => Promise<AdminSignInResult>;
  signOut: () => Promise<void>;
}

export const AdminAccessContext = createContext<AdminAccessContextValue | null>(null);
