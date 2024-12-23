import SideNav from '@/components/Navbar/SideNav';
import Progressbar from '@/components/ProgressBar';
import React, { ReactNode, Suspense } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense>
        <Progressbar />
        <div className="flex">
          <SideNav />
          <div className="mt-8 flex-1 overflow-hidden lg:mt-0">{children}</div>
        </div>
      </Suspense>
    </div>
  );
}
