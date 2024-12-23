'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { PlusCircle, User } from 'lucide-react';
import AddTeam from '../Forms/AddTeam';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useCreateTeam } from '@/hooks/mutations/team.mutation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
export default function CreateTeam() {
  const { mutateAsync } = useCreateTeam();

  const { register, handleSubmit } = useForm();

  const onsubmit = async (data: any) => {
    console.log('data k xa', data);
    try {
      const res = mutateAsync(data);
      console.log('res k xa', res);
      toast.promise(Promise.resolve(res), {
        loading: 'Adding Client...',
        success: (res) => res.message || ' Successfully created your Team!',
        error: (res) => res.message || 'Failed to create the team!',
      });
    } catch (err: any) {
      console.log('error', err);
      toast.error(err.message || 'Failed to add client');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-lg text-white">
          Create a Team
          <PlusCircle className="ml-2 cursor-pointer text-white" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Add Team</DialogTitle>
        </DialogHeader>
        <section className="">
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="mt-4 space-y-2">
              <Label className="mb-2 text-lg">Team Name</Label>
              <div className="flex items-center rounded-md border border-gray-300">
                <User className="mx-2 text-primary" />
                <Input
                  placeholder="Enter your team name"
                  {...register('TeamName')}
                  className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button type="submit" className="w-full rounded-lg py-2">
                Create
              </Button>
            </div>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
