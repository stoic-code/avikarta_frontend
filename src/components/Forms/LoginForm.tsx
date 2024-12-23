'use client';
import React from 'react';
import { H3 } from '../typography';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LockKeyhole, Phone, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TUserLoginForm, userLoginSchema } from '@/schema/login.schema';
import { createLoginSession, getSession, udpateSession } from '@/lib/lib';
import { useLoginMutation } from '@/hooks/mutations/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import FormErr from '../Common/FormErr';

export default function LoginForm() {
  const [seePassword, setSeePassword] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const router = useRouter();
  const { mutateAsync } = useLoginMutation();
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    handleSubmit,
  } = useForm<TUserLoginForm>({
    resolver: zodResolver(userLoginSchema),
  });

  //TODO:Add the schemas

  const onsubmit = async (data: TUserLoginForm) => {
    const res = await mutateAsync(data)
      .then(async (res) => {
        toast.promise(
          Promise.resolve(res), // Resolve the promise for toast.promise
          {
            loading: 'Registering...',
            success: 'Successfully Logged In!',
            error: 'Failed to register', // Default error message
          }
        );
        if (res.success) {
          const resss = await createLoginSession(res);
          resss?.success && router.push('/dashboard');
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
          <H3 className="text-2xl font-semibold">Login</H3>
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
            {/* PASSWORD */}
            <div className="mt-4 space-y-2">
              <Label className="mb-2 text-lg">Password</Label>
              <div className="flex items-center rounded-md border border-gray-300">
                <LockKeyhole className="mx-2 text-primary" />
                <input
                  type={seePassword ? 'text' : 'password'}
                  {...register('Password')}
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
              <FormErr>{errors.Password?.message}</FormErr>
            </div>
            <div className="mt-4 text-left">
              <div className="mt-4 text-left">
                <a
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <div className="mt-6 text-center">
                <Button type="submit" className="w-full rounded-lg py-2">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center">
                <span className="font-medium">Don t have an account?</span>
                <a
                  href="/register"
                  className="font-medium text-blue-600 underline"
                >
                  {' '}
                  Register
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
