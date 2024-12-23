'use client';
import React from 'react';
import { LockKeyhole, Phone, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordSchema,
  TForgotPasswordForm,
  TUserLoginForm,
  userLoginSchema,
} from '@/schema/login.schema';
import { createLoginSession, getSession, udpateSession } from '@/lib/lib';
import { useForgotPassword, useLoginMutation } from '@/hooks/mutations/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { H3 } from '@/components/typography';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import FormErr from '@/components/Common/FormErr';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const [seePassword, setSeePassword] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const router = useRouter();
  const { mutateAsync } = useForgotPassword();
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    handleSubmit,
  } = useForm<TForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  //TODO:Add the schemas

  const onsubmit = async (data: TForgotPasswordForm) => {
    const res = await mutateAsync({ payload: data })
      .then(async (res) => {
        toast.promise(
          Promise.resolve(res), // Resolve the promise for toast.promise
          {
            loading: 'Registering...',
            success: (res) => res.message || 'Please check your mail!',
            error: 'Failed to register', // Default error message
          }
        );
        if (res.success) {
          console.log('res k xa forgot ko', res);
          router.push('/reset-password');
          // const resss = await createLoginSession(res);
          // resss?.success && router.push('/dashboard');
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
          <H3 className="text-2xl font-semibold">Forgot your password?</H3>
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
          <div className="mt-8 space-y-2">
            <Label className="mb-2 text-lg">Email</Label>
            {/* PHONE NO */}
            <div className="flex items-center rounded-md border border-gray-300">
              <Phone className="mx-2 text-primary" />
              <Input
                type="email"
                {...register('Email')}
                placeholder="Enter your phone number"
                className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
              />
            </div>
            <FormErr>{errors.Phone?.message}</FormErr>
          </div>
          {/* PASSWORD */}

          <div className="mt-4 text-left">
            {/* <div className="mt-4 text-left">
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div> */}

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
