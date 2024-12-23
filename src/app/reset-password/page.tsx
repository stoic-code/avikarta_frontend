'use client';
import React, { useEffect, useRef, useState } from 'react';
import { LockKeyhole, Phone, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  TForgotPasswordForm,
  TResetPasswordForm,
  TUserLoginForm,
  userLoginSchema,
} from '@/schema/login.schema';
import { createLoginSession, getSession, udpateSession } from '@/lib/lib';
import { useLoginMutation, useResetPassword } from '@/hooks/mutations/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { H3 } from '@/components/typography';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import FormErr from '@/components/Common/FormErr';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';

export default function LoginForm() {
  const [seePassword, setSeePassword] = useState(false);
  const [phone, setPhone] = useState('');
  const router = useRouter();
  const { mutateAsync } = useResetPassword();
  const [otp, setOtp] = useState('');

  console.log('otp k ca', otp);

  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    handleSubmit,
  } = useForm<TResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  //TODO:Add the schemas

  const onsubmit = async (data: TResetPasswordForm) => {
    const res = await mutateAsync(data)
      .then(async (res) => {
        toast.promise(
          Promise.resolve(res), // Resolve the promise for toast.promise
          {
            loading: 'Registering...',
            success: (res) => res.message || 'Successfully Password Changed!',
            error: 'Failed to register', // Default error message
          }
        );
        if (res) {
          console.log('res hai', res);

          router.push('/login');
          // const resss = await createLoginSession(res);
        }
      })
      .catch((err) => {
        console.log('vitra koe rrrere', err);
        if (err) {
          toast.error(err.message || 'Failed to register.');
        } else {
          toast.error('Network Issue.');
        }
      });
  };

  useEffect(() => {
    setValue('OTP', Number(otp));
    trigger('OTP');
    console.log('otp  k xa', otp);
    console.log('otp  k xa', typeof otp);
    console.log('otp  k xa', typeof Number(otp));
  }, [otp]);

  const handlePhoneChange = (e: any) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setPhone(onlyDigits);
    setValue('Phone', onlyDigits);
    trigger('Phone');
  };
  return (
    <section className="container py-32">
      <div className="mx-auto max-w-md rounded-lg border border-black bg-white p-8 shadow-xl">
        <div className="text-center">
          <H3 className="text-2xl font-semibold">Reset your password</H3>
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mt-8 space-y-2">
            <Label className="mb-2 text-lg">Phone Number</Label>
            {/* PHONE NO */}
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
            <FormErr>{errors.Phone?.message}</FormErr>
          </div>
          {/* PASSWORD */}
          <div className="mt-4 space-y-2">
            <Label className="mb-2 text-lg">New Password</Label>
            <div className="flex items-center rounded-md border border-gray-300">
              <LockKeyhole className="mx-2 text-primary" />
              <input
                type={seePassword ? 'text' : 'password'}
                {...register('newPassword')}
                placeholder="Enter password"
                className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
              />

              <span className="mx-2 text-gray-500">
                {seePassword ? (
                  <EyeOff
                    className="cursor-pointer text-primary"
                    onClick={() => setSeePassword(false)}
                  />
                ) : (
                  <Eye
                    className="cursor-pointer text-primary"
                    onClick={() => setSeePassword(true)}
                  />
                )}
              </span>
            </div>
            <FormErr>{errors.newPassword?.message}</FormErr>
          </div>
          {/* PASSWORD */}
          <div className="mt-4 space-y-2">
            <Label className="mb-2 text-lg">OTP</Label>
            <div className="flex h-10 items-center gap-1">
              <InputOTP
                value={otp}
                onChange={(val) => setOtp(val)}
                maxLength={6}
              >
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTP>
            </div>
            <FormErr>{errors.OTP?.message}</FormErr>
          </div>
          {/* PASSWORD */}

          <div className="mt-4 text-left">
            <div className="mt-6 text-center">
              <Button type="submit" className="w-full rounded-lg py-2">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
