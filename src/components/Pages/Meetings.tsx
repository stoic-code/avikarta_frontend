'use client';
import React, { useState } from 'react';
import { H3, H5, P } from '../typography';
import { Button } from '../ui/button';
import {
  Calendar,
  Clock,
  Filter,
  PlusCircle,
  Trash,
  Trash2,
} from 'lucide-react';
import { Card } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import AddMeeting from '../Forms/Prospects/AddMeeting';
import { useParams } from 'next/navigation';
import { useDeleteMeeting } from '@/hooks/mutations/prospect.mutation';
import toast from 'react-hot-toast';

export default function Meetings({ meetings }: { meetings: any }) {
  const [open, setOpen] = useState(false);

  console.log('meetings xa?', meetings);
  const { mutateAsync } = useDeleteMeeting();
  const params = useParams();
  console.log('pramassss', params);

  console.log();

  function handleDeleteMeeting(id: string) {
    try {
      console.log('meeating isd', id);

      const payload = {
        prospect_id: params.id as string,
        meeting_id: id,
      };
      console.log('payload k xa delete', payload);

      const res = mutateAsync(payload);
      toast.promise(Promise.resolve(res), {
        loading: 'Deleting...',
        success: (res) => res.message || 'Deleted Successfully!',
        error: 'Error during deletion',
      });
      console.log('delete ko res', res);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || 'Failed to delete Meeting!');
    }
  }

  function meetingDeadlineCheck(followUp: any) {
    const f = new Date(followUp).toLocaleDateString();
    console.log('follow up date:', followUp);
    // const today = new Date();
    // today.setHours(0, 0, 0, 0);
    const today = new Date().toLocaleDateString();
    const [month, day, year] = today.split('/').map(Number);
    // console.log(splittted);
    const t = new Date(year, month - 1, day);
    console.log('toaday adate', t);
    if (f < today) {
      console.log('The follow-up date has passed.');
      return false;
    } else if (f > today) {
      console.log('The follow-up date is in the future.');
      return true;
    } else {
      console.log('Today is the follow-up date.');
      return true;
    }
  }
  return (
    <section className="">
      <H3 className="mb-4">Meeting Details:</H3>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex space-x-4">
          <Button className="px-4 py-2">Recent</Button>
          <Button className="flex items-center space-x-2 px-4 py-2">
            <Filter />
            <span>Filter</span>
          </Button>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2 px-4 py-2">
              <PlusCircle />
              <span>Add Meeting</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add Meeting</DialogTitle>
            </DialogHeader>
            <AddMeeting setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="my-10 flex w-full flex-col gap-10">
        {meetings.length > 0 &&
          meetings
            .sort((a: any, b: any) => {
              if (meetingDeadlineCheck(a.FollowUp)) {
                return -1;
              } else {
                return 1;
              }
            })
            .map((meeting: any, _: number) => (
              <div
                onClick={() => meetingDeadlineCheck(meeting.FollowUp)}
                key={meeting._id}
                className={`mt-4 w-full cursor-pointer space-y-1 border-none shadow-none ${meetingDeadlineCheck(meeting.FollowUp) ? 'self-start' : 'self-end'}`}
              >
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <h5>
                      {String(new Date(meeting.MeetingDate).toDateString())}
                    </h5>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <h5>{meeting.Time}</h5>
                  </div>
                </div>
                <div
                  className={`w-full ${meetingDeadlineCheck(meeting.FollowUp) ? 'self-start' : 'bg-red-50'} rounded-lg border p-4 shadow-[5px_5px_20px_rgba(0,0,0,0.05)]`}
                >
                  <div className="flex justify-between">
                    <H5>
                      <span className="font-bold">Title:</span>
                      <span className="ml-1">{meeting.MeetingTitle}</span>
                    </H5>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-red-400">
                          <Trash2 size={20} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="text-base"
                            onClick={() => handleDeleteMeeting(meeting._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <H5>
                    <span className="font-bold">Purpose:</span>
                    <span className="ml-1">{meeting.Purpose}</span>
                  </H5>
                  <H5>
                    <span className="font-bold">What they said:</span>
                    <span className="ml-1">{meeting.WhatTheySaid}</span>
                  </H5>
                  <H5 className="text-red-600">
                    <span className="font-bold">Follow Up:</span>
                    <span className="ml-1">{meeting.FollowUp}</span>
                  </H5>
                  <P>
                    <span>Remark:</span>
                    <span className="ml-1">{meeting.Remark}</span>
                  </P>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
