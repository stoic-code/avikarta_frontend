'use client';
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { MenuIcon } from 'lucide-react';
import SideNavContent from './SideNavContent';
import SideNavMobileContent from './SideNavMobileContent';

export default function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="" asChild>
        <button className="inline lg:hidden">
          <MenuIcon size={30} strokeWidth={2} />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[290px] justify-center overflow-hidden bg-white py-10"
      >
        <SideNavMobileContent setOpenFun={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
