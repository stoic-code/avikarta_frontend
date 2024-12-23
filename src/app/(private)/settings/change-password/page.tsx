'use client';
import FormErr from '@/components/Common/FormErr';
import FormSubmitBtn from '@/components/Forms/FormSubmitBtn';
import Title from '@/components/Title';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useChangePassword } from '@/hooks/mutations/auth';
import {
  TUserChangePassword,
  userChangePassword,
} from '@/schema/changePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function page() {
  const [seeOldPassword, setSeeOldPassword] = useState(false);
  const [seeNewPassword, setSeeNewPassword] = useState(false);
  const [seeRepeatPassword, setSeeRepeatPassword] = useState(false);

  const { mutateAsync } = useChangePassword();
  const {
    setValue,
    trigger,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserChangePassword>({
    resolver: zodResolver(userChangePassword),
  });

  async function onsubmit(data: TUserChangePassword) {
    try {
      const formdata = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      const res = mutateAsync(formdata)
        .then((res) => {
          toast.promise(Promise.resolve(res), {
            loading: 'Changing Password...',
            success: (res) =>
              res.message || 'Successfully Changed the password!.',
            error: 'Failed to change the password.',
          });

          if (res) {
            reset();
          }
        })
        .catch((err) => {
          console.log('Error during mutate', err);
          toast.error(err.message || 'Failed to change the password.');
        });
      console.log('res xa?', res);
    } catch (err) {
      console.log('Form Error:', err);
      toast.error('Network Error.Try again later!');
    }
  }

  return (
    <div className="sm:py-10">
      <Title title="Manage Password" />
      <section className="mt-8 space-y-4 px-4 2xl:container">
        <h2 className="text-lg font-semibold">Change your password</h2>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-3">
          <div className="max-w-[300px]">
            <Label className="font-medium">Current Password</Label>
            <div className="flex items-center rounded-md border border-gray-300">
              <LockKeyhole className="mx-2 text-primary" />
              <Input
                {...register('currentPassword')}
                type={seeOldPassword ? 'text' : 'password'}
                placeholder="Enter your old password"
                className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
              />
              <span className="mx-2 text-gray-500">
                {seeOldPassword ? (
                  <EyeOff
                    className="cursor-pointer text-primary"
                    onClick={() => setSeeOldPassword(false)}
                  />
                ) : (
                  <Eye
                    className="cursor-pointer text-primary"
                    onClick={() => setSeeOldPassword(true)}
                  />
                )}
              </span>
            </div>
            <FormErr>{errors.currentPassword?.message}</FormErr>
          </div>
          <div className="max-w-[300px]">
            <Label className="font-medium">New Password</Label>
            <div className="flex items-center rounded-md border border-gray-300">
              <LockKeyhole className="mx-2 text-primary" />
              <Input
                {...register('newPassword')}
                type={seeNewPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
              />
              <span className="mx-2 text-gray-500">
                {seeNewPassword ? (
                  <EyeOff
                    className="cursor-pointer text-primary"
                    onClick={() => setSeeNewPassword(false)}
                  />
                ) : (
                  <Eye
                    className="cursor-pointer text-primary"
                    onClick={() => setSeeNewPassword(true)}
                  />
                )}
              </span>
            </div>{' '}
            <FormErr>{errors.newPassword?.message}</FormErr>
          </div>
          <div className="max-w-[300px]">
            <Label className="font-medium">Confirm Password</Label>
            <div className="flex items-center rounded-md border border-gray-300">
              <LockKeyhole className="mx-2 text-primary" />
              <Input
                {...register('repeatPassword')}
                type={seeRepeatPassword ? 'text' : 'password'}
                placeholder="Repeat new password"
                className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
              />
              <span className="mx-2 text-gray-500">
                {seeRepeatPassword ? (
                  <EyeOff
                    className="cursor-pointer text-primary"
                    onClick={() => setSeeRepeatPassword(false)}
                  />
                ) : (
                  <Eye
                    className="cursor-pointer text-primary"
                    onClick={() => setSeeRepeatPassword(true)}
                  />
                )}
              </span>
            </div>{' '}
            <FormErr>{errors.repeatPassword?.message}</FormErr>
          </div>
          <div>
            <FormSubmitBtn isLoading={false}>Save</FormSubmitBtn>
          </div>
        </form>
      </section>
    </div>
  );
}
