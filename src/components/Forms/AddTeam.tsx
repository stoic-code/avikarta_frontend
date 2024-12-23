'use client';
import React from 'react';
import { H3 } from '../typography';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LockKeyhole, Phone, Eye, EyeOff, User, Pencil } from 'lucide-react';
import { useAddTeamMember } from '@/hooks/mutations/team.mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { teamMemberSchema, TTeamMemberSchemaForm } from '@/schema/team.schema';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function AddTeam() {
  const [phone, setPhone] = React.useState('');
  const { mutateAsync } = useAddTeamMember();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTeamMemberSchemaForm>({
    resolver: zodResolver(teamMemberSchema),
  });

  const handlePhoneChange = (e: any) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setPhone(onlyDigits);
  };

  const onsubmit = async (data: any) => {
    console.log('data k xa', data);
    try {
      const res = mutateAsync(data);
      console.log('res k xa', res);
      toast.promise(Promise.resolve(res), {
        loading: 'Adding To The Team...',
        success: (res) => res.message || ' Successfully created your Team!',
        error: (res) => res.message || 'Failed to create the team!',
      });
      if (await res) {
        setPhone('');
      }
    } catch (err: any) {
      console.log('error', err);
      toast.error(err.message || 'Failed to create the Team');
    }
  };

  return (
    <section className="">
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="mt-4 space-y-2">
          <Label className="mb-2 text-lg">Phone Number</Label>
          <div className="flex items-center rounded-md border border-gray-300">
            <Phone className="mx-2 text-primary" />
            <Input
              type="tel"
              {...register('Phone')}
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
              className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button type="submit" className="w-full rounded-lg py-2">
            Sent Request
          </Button>
        </div>
      </form>
    </section>
  );
}
