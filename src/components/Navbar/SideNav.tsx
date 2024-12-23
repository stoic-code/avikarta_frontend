'use client';
import React from 'react';
import SideNavContent from './SideNavContent';

export default function SideNav() {
  return (
    <div className="sticky left-0 top-0 z-50 hidden h-screen pb-10 lg:block">
      <SideNavContent />
    </div>
  );
}
