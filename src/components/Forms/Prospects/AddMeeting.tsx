'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { MeetingSchema, TMeetingSchema } from '@/schema/meeting.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import FormErr from '@/components/Common/FormErr';
import { useAddMeeting } from '@/hooks/mutations/prospect.mutation';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import FormSubmitBtn from '../FormSubmitBtn';

export default function AddMeeting({ setOpen }: { setOpen: any }) {
  // const [isLoading]
  const { mutateAsync, isPending } = useAddMeeting();
  const params = useParams();
  console.log('aprams  k xa', params.id);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    trigger,
  } = useForm<TMeetingSchema>({
    resolver: zodResolver(MeetingSchema),
  });

  async function onsubmit(data: TMeetingSchema) {
    console.log('meeting data', data);
    // console.log("formdara",da);

    try {
      console.log('what submitting', data);

      const res = await mutateAsync(data);
      console.log('what submitting', data);

      toast.promise(Promise.resolve(res), {
        loading: 'Adding Meeting...',
        success: (res) => res.message || 'Successfully added the meeting.',
        error: 'Failed to add the meeting!',
      });

      if (res) {
        setOpen(false);
      }
      console.log('meeting res', res);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || 'Failed to add the meeting!');
    }
  }

  useEffect(() => {
    setValue('prospectID', params?.id as string);
    trigger('prospectID');
  }, []);

  console.log('errorsss', errors);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xl overflow-auto">
        <form
          className="w-full overflow-auto"
          onSubmit={handleSubmit(onsubmit)}
        >
          {/* <CustomToast >asdadasasdsada</CustomToast> */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="date" className="text-md">
                Calendar <span className="text-red-600">*</span>
              </Label>
              <Input
                type="date"
                {...register('meetingDetail.MeetingDate')}
                placeholder="Choose date"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
              <FormErr>{errors?.meetingDetail?.MeetingDate?.message}</FormErr>
            </div>
            <div>
              <Label htmlFor="time" className="text-md">
                Time <span className="text-red-600">*</span>
              </Label>
              <Input
                {...register('meetingDetail.Time')}
                type="time"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
              <FormErr>{errors?.meetingDetail?.Time?.message}</FormErr>
            </div>
          </div>
          <div className="mt-2">
            <Label htmlFor="title" className="text-md">
              Title <span className="text-red-600">*</span>
            </Label>
            <Input
              {...register('meetingDetail.MeetingTitle')}
              type="text"
              placeholder="Enter title"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            <FormErr>{errors?.meetingDetail?.MeetingTitle?.message}</FormErr>
          </div>
          <div className="mt-2">
            <Label htmlFor="purpose" className="text-md">
              Purpose <span className="text-red-600">*</span>
            </Label>
            <Input
              {...register('meetingDetail.Purpose')}
              type="text"
              placeholder="Enter purpose"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            <FormErr>{errors?.meetingDetail?.Purpose?.message}</FormErr>
          </div>
          <div className="mt-2">
            <Label htmlFor="what" className="text-md">
              What they said: <span className="text-red-600">*</span>
            </Label>
            <Textarea
              {...register('meetingDetail.WhatTheySaid')}
              placeholder="Type your message here."
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            <FormErr>{errors?.meetingDetail?.WhatTheySaid?.message}</FormErr>
          </div>
          <div className="mt-2">
            <Label htmlFor="followUp" className="text-md">
              Follow Up/Reschedule
            </Label>
            <Input
              {...register('meetingDetail.FollowUp')}
              type="date"
              placeholder="Choose date"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            <FormErr>{errors?.meetingDetail?.FollowUp?.message}</FormErr>
          </div>
          <div className="mt-2">
            <Label htmlFor="remarks" className="text-md">
              Remarks
            </Label>
            <Textarea
              {...register('meetingDetail.Remark')}
              placeholder="Enter remarks"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            <FormErr>{errors?.meetingDetail?.Remark?.message}</FormErr>
          </div>
          <div className="mt-6 flex justify-end">
            <FormSubmitBtn isLoading={isPending}>Add</FormSubmitBtn>
          </div>
        </form>
      </div>
    </div>
  );
}
