'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Mail, MapPin, Phone, User, Edit } from 'lucide-react';
import { H2, H3, H4 } from '@/components/typography';
import Title from '@/components/Title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EditProspects from '@/components/Forms/Prospects/EditProspects';
import Meetings from '@/components/Pages/Meetings';
import { useGetSingleProspect } from '@/hooks/queries/prospect.query';
import PageLoadingUI from '@/components/Common/PageLoadingUI';

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useGetSingleProspect(id);

  useEffect(() => {
    refetch();
  }, [id]);

  if (isLoading) {
    return <PageLoadingUI />;
  }

  console.log('single prospect', data);

  return (
    <section className="px-4 pb-10 2xl:container sm:py-10">
      <Title title="Prospects Details" />
      <div className="mt-4 flex justify-end lg:mt-[-40px]">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 text-lg">
              <Edit />
              Edit Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-auto sm:h-auto sm:max-h-max sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Prospects</DialogTitle>
            </DialogHeader>
            <EditProspects p={data.data} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-20 flex flex-col items-center gap-6 px-4 2xl:container lg:mx-20 lg:flex-row lg:justify-center lg:gap-20">
        <div className="flex-shrink-0">
          <Image
            src={data?.data?.Avatar?.SecureURL}
            alt="My Photo"
            width={200}
            height={200}
            className="h-[200px] w-[200px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col space-y-2 lg:w-full">
          <div className="flex items-center gap-2">
            <div className="flex flex-shrink-0 items-center gap-1">
              <User size={20} className="text-primary" />
              <span className="font-bold lg:w-44">Name:</span>
            </div>
            <span>{data?.data.FullName}</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex flex-shrink-0 items-center gap-1">
              <MapPin size={20} className="text-primary" />
              <span className="font-bold lg:w-44">Address:</span>
            </div>
            <span>
              {data?.data.District},&nbsp;{data.data.Municipality}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-shrink-0 items-center gap-1">
              <Calendar size={20} className="text-primary" />
              <span className="font-bold lg:w-44">Date of Birth:</span>
            </div>
            <span>{data.data.DateOfBirth}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-shrink-0 items-center gap-1">
              <Phone size={20} className="text-primary" />
              <span className="font-bold lg:w-44">Phone:</span>
            </div>
            <span>{data.data.Phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-shrink-0 items-center gap-1">
              <Mail size={20} className="text-primary" />
              <span className="font-bold lg:w-44">Email:</span>
            </div>
            <span>{data.data.Email}</span>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t-4 border-primary" />

      <div className="mt-8">
        <H3>Offer Premium: {data.data.SumExpected}</H3>
      </div>
      <div className="mt-8">
        <Meetings meetings={data.data.Meeting} />
      </div>
    </section>
  );
}
