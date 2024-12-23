'use client';
import React, { useState } from 'react';
import AddClient1 from '@/components/Forms/AddClient/AddClient1';
import AddClient2 from '@/components/Forms/AddClient/AddClient2';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ClientSchema, TClientSchemaForm } from '@/schema/client.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import CloudinaryUpload from '@/components/cloudinary/CloudinaryUpload';
import { useAddClient } from '@/hooks/mutations/client.mutation';
import { useSession } from '@/providers/SessionProvider';
import toast from 'react-hot-toast';

export default function AddClient() {
  const searchParams = useSearchParams();
  const stepNo = searchParams.get('step');
  const isStep2 = stepNo === '2';
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const { session } = useSession();
  console.log('session', session);

  const { mutateAsync, isPending, isSuccess } = useAddClient();
  const {
    setValue,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TClientSchemaForm>({
    resolver: zodResolver(ClientSchema),
  });
  console.log('is pending', isPending);
  console.log('is success', isSuccess);

  async function onsubmit(data: TClientSchemaForm) {
    try {
      setPending(true);
      if (pending) {
        toast.success('Adding...');
      }
      const folder = 'clients';
      const avatar = await CloudinaryUpload({ folder, image: data?.Avatar });
      const policyPhoto = await CloudinaryUpload({
        folder,
        image: data?.ClientInsuranceInfo.PhotoOfPolicy,
      });

      const formdata = {
        ...data,
        Avatar: {
          PublicId: avatar.public_id,
          SecureURL: avatar.secure_url,
        },
        ClientInsuranceInfo: {
          ...data.ClientInsuranceInfo,
          PhotoOfPolicy: {
            PublicId: policyPhoto.public_id,
            SecureURL: policyPhoto.secure_url,
          },
        },
      };
      const res = mutateAsync({
        payload: formdata,
        token: session?.userDetail?.token,
      });
      toast.promise(Promise.resolve(res), {
        loading: 'Adding Client...',
        success: (res) => res.message || ' Successfully Added New Client!',
        error: 'Failed to add new client!',
      });
      if (res) {
        console.log('res ma kkkk', await res);
        setPending(false);
        router.push('/my-clients');
      }
    } catch (err: any) {
      console.log('Error while submitting:', err);
      toast.error(err.message || 'Failed to add client');
      setPending(false);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onsubmit)} className="">
        {isStep2 ? (
          <AddClient2
            errors={errors}
            pending={pending}
            register={register}
            setValue={setValue}
            trigger={trigger}
          />
        ) : (
          <AddClient1
            errors={errors}
            register={register}
            setValue={setValue}
            trigger={trigger}
          />
        )}
      </form>
    </section>
  );
}
