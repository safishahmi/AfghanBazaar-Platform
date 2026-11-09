import { useContext } from 'react';
import { AdminAccessContext } from './adminAccessContext';

export function useAdminAccess() {
  const value = useContext(AdminAccessContext);
  if (!value) throw new Error('useAdminAccess must be used within AdminAccessProvider');
  return value;
}
