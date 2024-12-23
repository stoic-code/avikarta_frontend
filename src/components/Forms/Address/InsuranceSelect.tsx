import { HandHeart, MapPinned } from 'lucide-react';
import React, { ReactNode } from 'react';

export default function InsuranceSelect({
  children,
  legend,
  insuranceSetter,
}: {
  children: ReactNode;
  legend: string;
  insuranceSetter: any;
}) {
  return (
    <div className="flex items-center rounded-md border border-gray-300 px-2">
      <HandHeart size={20} className="flex-shrink-0 text-primary" />
      <select
        onChange={(e) => insuranceSetter(e.target.value)}
        className="ml-2 h-10 w-[90%] bg-transparent px-2 outline-none"
      >
        <option
          value=""
          disabled
          selected
          // hidden
        >
          {legend}
        </option>
        {children}
      </select>
    </div>
  );
}
