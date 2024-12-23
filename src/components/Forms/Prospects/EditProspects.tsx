'use client';
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Phone,
  User,
  Mail,
  MapPinned,
  Calendar,
  ReceiptIndianRupee,
  Camera,
  Loader2,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  PropspectEditSchema,
  PropspectSchema,
  TProspectEditSchemaForm,
  TProspectSchemaForm,
} from '@/schema/prospect.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import CompulsoryLabel from '@/components/Common/CompulsoryLabel';
import FormErr from '@/components/Common/FormErr';
import Locations from '@/data/location.json';
import { ImageUpload } from '@/components/Common/ImageUpload';
import CloudinaryUpload from '@/components/cloudinary/CloudinaryUpload';
import { deleteCloudinaryImage } from '@/components/cloudinary/upload';
import toast from 'react-hot-toast';
import { useEditProspect } from '@/hooks/mutations/prospect.mutation';
import PageLoadingUI from '@/components/Common/PageLoadingUI';

export default function EditProspects({
  p,
  setOpen,
}: {
  p: any;
  setOpen: any;
}) {
  const router = useRouter();
  console.log('p k xa', p);
  const [pending, setPending] = useState(false);
  const [img, setImg] = useState<File | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string>(
    p.Province ? p.Province : ''
  );
  const [district, setDistrict] = useState<string>(
    p.District ? p.District : ''
  );
  const [municipality, setMunicipality] = useState<string>(
    p.Municipality ? p.Municipality : ''
  );

  const { mutateAsync } = useEditProspect(p._id);

  const [phone, setPhone] = useState('');
  const {
    setValue,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProspectEditSchemaForm>({
    resolver: zodResolver(PropspectEditSchema),
    defaultValues: {
      ...p,
    },
  });

  // DISTRICT HANDLE
  useEffect(() => {
    if (selectedProvince !== '') {
      setValue(
        'District',
        Locations.provinceList
          .find((p) => p.name === selectedProvince)
          ?.districtList.find((d) => d.name === district)?.name || ''
      );
      trigger('District');
    }
  }, [district]);

  // PROVINCE HANDLE
  useEffect(() => {
    if (selectedProvince !== '') {
      setValue(
        'Province',
        String(
          Locations.provinceList.find((p) => p.name === selectedProvince)
            ?.name || ''
        )
      );
      trigger('Province');
    }
  }, [selectedProvince]);

  // ADDRESS/municipality HANDLE
  useEffect(() => {
    if (selectedProvince !== '') {
      console.log('why trigger');

      setValue(
        'Municipality',
        String(
          Locations.provinceList
            .find((p) => p.name === selectedProvince)
            ?.districtList.find((d) => d.name === district)
            ?.municipalityList.find((m) => m.name === municipality)?.name || ''
        )
      );
      trigger('Municipality');
    }
  }, [municipality]);

  const handlePhoneChange = (e: any) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setPhone(onlyDigits);
  };

  async function onsubmit(data: TProspectEditSchemaForm) {
    console.log('formdata', data);
    {
      try {
        if (img) {
          setPending(true);
          const folder = 'prospects';
          await deleteCloudinaryImage(p.Avatar.PublicId);
          const avatarImg = await CloudinaryUpload({ folder, image: img });
          const formdata = {
            ...data,
            Avatar: {
              PublicId: avatarImg.public_id,
              SecureURL: avatarImg.secure_url,
            },
          };

          const res = await mutateAsync({
            payload: formdata,
          });
          toast.promise(Promise.resolve(res), {
            loading: 'Editing Client...',
            success: (res) => res.message || ' Successfully Edited the Client!',
            error: 'Failed to edit the client!',
          });
          console.log('edit ko res kasto xa?', res);
          if (res) {
            // router.back();
            setOpen(false);
            setPending(false);
          }
        } else {
          const formdata = {
            ...data,
          };
          const res = await mutateAsync({
            payload: formdata,
          });
          toast.promise(Promise.resolve(res), {
            loading: 'Editing Client...',
            success: (res) => res.message || ' Successfully Edited the Client!',
            error: 'Failed to edit the client!',
          });
          console.log('edit ko res kasto xa?', res);
          if (res) {
            // router.back();
            setOpen(false);

            setPending(false);
          }
        }
      } catch (err: any) {
        console.log('Error:', err);
        toast.error(err.message || 'Failed to add client');
        setPending(false);
      }
    }
  }

  useEffect(() => {
    setValue('Phone', p.Phone);
    trigger('Phone');
    setPhone(p.Phone);
  }, []);

  if (!p) {
    return <PageLoadingUI />;
  }

  return (
    <section className="px-4 2xl:container">
      <div className="">
        <form onSubmit={handleSubmit(onsubmit)}>
          {/* upload photo */}
          <div className="mt-2 flex flex-col gap-2">
            <CompulsoryLabel>Upload Profile Picture</CompulsoryLabel>
            <ImageUpload
              setImg={setImg}
              img={img}
              initialImage={p?.Avatar.SecureURL}
            />
            <FormErr>{errors.Avatar?.message}</FormErr>
          </div>
          <div className="mt-2">
            <Label>Full Name of Client</Label>
            <div className="flex items-center rounded-md border border-gray-300">
              <User className="mx-2 text-primary" />
              <Input
                type="text"
                {...register('FullName')}
                placeholder="Eg: John Doe"
                className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
              />
            </div>
            <FormErr>{errors.FullName?.message}</FormErr>
          </div>

          <div className="grid md:grid-cols-2 md:gap-4">
            <div className="mt-2">
              <CompulsoryLabel>Date of Birth</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <Calendar className="mx-2 text-primary" />
                <Input
                  {...register('DateOfBirth')}
                  onChange={(e) => {
                    setValue('DateOfBirth', e.target.value);
                    trigger('DateOfBirth');
                  }}
                  type="date"
                  className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                />
              </div>
              <FormErr>{errors.DateOfBirth?.message}</FormErr>
            </div>
            <div className="mt-2">
              <CompulsoryLabel>Phone Number</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <Phone className="mx-2 text-primary" />
                <Input
                  type="tel"
                  {...register('Phone')}
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Eg: 98********"
                  className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                />
              </div>
              <FormErr>{errors.Phone?.message}</FormErr>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-4">
            {/* //PROVINCE */}
            <div className="mt-2">
              <CompulsoryLabel>Province</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <MapPinned className="mx-2 text-primary" />
                <Select
                  defaultValue={selectedProvince}
                  onValueChange={(val) => setSelectedProvince(val)}
                >
                  <SelectTrigger className="border-none">
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    {Locations.provinceList.map((p, idx) => (
                      <SelectItem key={idx} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormErr>{errors.Province?.message}</FormErr>
            </div>
            {/* DISTRICT */}
            <div className="mt-2">
              <CompulsoryLabel>District</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <MapPinned className="mx-2 text-primary" />
                <Select
                  defaultValue={district}
                  onValueChange={(val) => setDistrict(val)}
                  disabled={!selectedProvince}
                >
                  <SelectTrigger className="border-none">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProvince
                      ? Locations.provinceList
                          .find((p) => p.name === selectedProvince)
                          ?.districtList.map((d, idx) => (
                            <SelectItem key={idx} value={d.name}>
                              {d.name}
                            </SelectItem>
                          ))
                      : null}
                  </SelectContent>
                </Select>
              </div>
              <FormErr>{errors.District?.message}</FormErr>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-4">
            {/*ADDRESS/MUNICIPLAITY  */}
            <div className="mt-2">
              <CompulsoryLabel>Municipality</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <MapPinned className="mx-2 text-primary" />
                <Select
                  defaultValue={municipality}
                  onValueChange={(val) => setMunicipality(val)}
                  disabled={!district}
                >
                  <SelectTrigger className="border-none">
                    <SelectValue placeholder="Select municipality" />
                  </SelectTrigger>
                  <SelectContent>
                    {district
                      ? Locations.provinceList
                          .find((p) => p.name === selectedProvince)
                          ?.districtList.find((d) => d.name === district)
                          ?.municipalityList.map((d, idx) => (
                            <SelectItem key={idx} value={d.name}>
                              {d.name}
                            </SelectItem>
                          ))
                      : null}
                  </SelectContent>
                </Select>
              </div>
              <FormErr>{errors.Municipality?.message}</FormErr>
            </div>
            <div className="mt-2">
              <CompulsoryLabel>Email</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <Mail className="mx-2 text-primary" />
                <Input
                  {...register('Email')}
                  id="email"
                  placeholder="Eg: email@gmail.com"
                  className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                />
              </div>
              <FormErr>{errors.Email?.message}</FormErr>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-4">
            <div className="mt-2">
              <CompulsoryLabel>Offered Premium</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <ReceiptIndianRupee className="mx-2 text-primary" />
                <Input
                  {...register('SumExpected', {
                    valueAsNumber: true,
                  })}
                  step={0.00001}
                  type="number"
                  placeholder="Eg: 20000"
                  className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                />
              </div>
              <FormErr>{errors?.SumExpected?.message}</FormErr>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              disabled={pending}
              type="submit"
              className="w-full px-4 py-2 text-lg font-medium"
            >
              {pending ? (
                <div>
                  <Loader2 className="animate-spin text-white" />
                </div>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
