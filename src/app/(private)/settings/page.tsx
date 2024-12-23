import Title from '@/components/Title';
import { LockKeyhole, User, User2Icon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <section className="sm:py-10">
      <Title title="Settings" />
      <div className="mt-8 space-y-4 px-4">
        <Link
          href={'/settings/change-password'}
          className="flex items-center gap-3 rounded-xl border-2 p-3"
        >
          <LockKeyhole size={30} className="text-primary" />
          <div>
            <h2 className="font-semibold">Manage Password</h2>
            <p>Change your password</p>
          </div>
        </Link>
        <Link
          href={'/settings/manage-profile'}
          className="flex items-center gap-3 rounded-xl border-2 p-3"
        >
          <User2Icon size={30} className="text-primary" />
          <div>
            <h2 className="font-semibold">Manage Profile</h2>
            <p>Edit your profile</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
