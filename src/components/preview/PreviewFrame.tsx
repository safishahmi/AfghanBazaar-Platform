import type { ReactNode } from 'react';
import PreviewBar from './PreviewBar';

export default function PreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <PreviewBar />
      {children}
    </div>
  );
}
