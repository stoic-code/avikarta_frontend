'use client';
import Image from 'next/image';
import React from 'react';
import { H4, P } from '../typography';
import { CircleCheck, CircleX } from 'lucide-react';
import { useGetUserDetail } from '@/hooks/queries/User.query';
import PageLoadingUI from '../Common/PageLoadingUI';

export default function Notifications() {
  const { data, isLoading } = useGetUserDetail();
  if (isLoading) {
    return <PageLoadingUI />;
  }

  console.log('notification ko', data);

  return (
    <section className="container">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-4">
            <Image
              src="/girl.svg"
              alt="Avatar"
              width={60}
              height={60}
              className="rounded-full"
            />
            <H4 className="text-xl font-semibold text-gray-800">
              Join Request !!!
            </H4>
          </div>

          <P className="text-lg text-gray-600">
            You have a new join request from John.
          </P>
        </div>
        <div className="flex space-x-3">
          <CircleCheck
            size={35}
            className="cursor-pointer text-primary transition-colors duration-200 hover:text-secondary"
          />
          <CircleX
            size={35}
            className="cursor-pointer text-red-600 transition-colors duration-200 hover:text-red-400"
          />
        </div>
      </div>
    </section>
  );
}
