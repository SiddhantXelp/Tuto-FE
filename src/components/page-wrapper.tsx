import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col  space-y-2 bg-[#ECECEC] flex-grow pb-4">
      {children}
    </div>
  );
}
