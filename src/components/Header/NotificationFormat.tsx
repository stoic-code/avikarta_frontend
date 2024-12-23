'use client';
import { useCancelTeam, useJoinTeam } from '@/hooks/mutations/team.mutation';
import { CircleCheck, CircleX } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';

export default function NotificationFormat({ noti }: { noti: any }) {
  const { mutateAsync, isPending } = useJoinTeam();
  const { mutateAsync: mutateDelteAsync } = useCancelTeam();

  async function handleJoinTeam() {
    try {
      console.log('team name', noti?.teamName);

      const data = {
        TeamName: noti?.teamName,
      };
      const res = mutateAsync(data);
      toast.promise(Promise.resolve(res), {
        loading: 'Joining the team...',
        success: (res) => res.message || ' Successfully joined the Team!',
        error: (res) => res.message || 'Failed to join the team!',
      });
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || 'Failed to join the Team');
    }
  }
  async function handleCancelTeam() {
    try {
      console.log('team name', noti?.teamName);

      const data = {
        TeamName: noti?.teamName,
      };
      const res = mutateDelteAsync(data);

      toast.promise(Promise.resolve(res), {
        loading: 'Cancelling the team request...',
        success: (res) => res.message || 'You Rejected the Team Request!',
        error: (res) => res.message || 'Failed to cancel the team request!',
      });
    } catch (err: any) {
      console.log('delete req error', err);
      toast.error(err.message || 'Failed to cancel the Team Request!');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-400"></div>
          <h2 className="text-base font-semibold">Team Membership Request</h2>
        </div>
        <div className="flex space-x-3">
          <CircleCheck
            onClick={() => handleJoinTeam()}
            size={20}
            className="cursor-pointer text-primary transition-colors duration-200 hover:text-secondary"
          />
          <CircleX
            onClick={() => handleCancelTeam()}
            size={20}
            className="cursor-pointer text-red-600 transition-colors duration-200 hover:text-red-400"
          />
        </div>
      </div>
      <div>
        <p className="text-sm">
          {noti.Requestedby} has sent a request to join your team.
        </p>
      </div>
    </div>
  );
}
