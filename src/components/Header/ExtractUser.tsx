import Link from 'next/link';
import React from 'react';

export default function ExtractUser({ name }: { name: string }) {
  let firstname = name.split('')[0];
  console.log('fname', firstname);

  return (
    <Link href={'/dashboard'} className="relative">
      <div className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-xl font-medium text-white">
        {firstname}
      </div>
    </Link>
  );
}
