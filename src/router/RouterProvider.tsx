import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { RouterContext, type RouterContextValue } from './routerContext';

interface Location {
  path: string;
  search: string;
}

function readLocation(): Location {
  return { path: window.location.pathname, search: window.location.search };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>(readLocation);

  useEffect(() => {
    const handlePopState = () => setLocation(readLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;
    window.history.pushState(null, '', `${url.pathname}${url.search}`);
    setLocation(readLocation());
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const value = useMemo<RouterContextValue>(
    () => ({ path: location.path, search: location.search, navigate }),
    [location, navigate],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}
