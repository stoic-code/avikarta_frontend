'use client';
import CompulsoryLabel from '@/components/Common/CompulsoryLabel';
import FormErr from '@/components/Common/FormErr';
import FormSubmitBtn from '@/components/Forms/FormSubmitBtn';
import Title from '@/components/Title';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, MapPinned, Phone, User2, Users2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Locations from '@/data/location.json';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUpload } from '@/components/Common/ImageUpload';
import { useGetUserDetail } from '@/hooks/queries/User.query';
import { TUserEditForm, userEditSchema } from '@/schema/editUser';
import PageLoadingUI from '@/components/Common/PageLoadingUI';
import { formatDateString } from '@/components/Common/DateFormatter';
import { useEditUserDetail } from '@/hooks/mutations/user.mutation';
import { deleteCloudinaryImage } from '@/components/cloudinary/upload';
import CloudinaryUpload from '@/components/cloudinary/CloudinaryUpload';
import toast from 'react-hot-toast';

export default function EditProfile({ user }: { user: any }) {
  const [phone, setPhone] = useState('');
  console.log('single user:', user);
  const [isPending, SetIsPending] = useState(false);

  const { mutateAsync } = useEditUserDetail();
  const [imgFile, setImgFile] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState<string>(
    user.Province ? user.Province : ''
  );
  const [district, setDistrict] = useState<string>(
    user.District ? user.District : ''
  );
  const [municipality, setMunicipality] = useState<string>(
    user.Municipality ? user.Municipality : ''
  );

  const {
    setValue,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserEditForm>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      ...user,
      DateOfBirth: user.DateOfBirth.slice(0, 10),
      //   MyTeam: data?.user.MyTeam,
      //   FullName: data?.user.FullName,
    },
  });
  //HeroHonda
  console.log('formData', user.DateOfBirth.slice(0, 10));

  useEffect(() => {
    if (user.Avatar) {
      console.log('avatar', user.Avatar);

      setValue('Avatar', {
        PublicId: user.Avatar.PublicId,
        SecureURL: user.Avatar.SecureURL,
      });
      trigger('Avatar');
    }

    // if (client.ClientInsuranceInfo.PhotoOfPolicy) {
    //   setValue('ClientInsuranceInfo.PhotoOfPolicy', {
    //     PublicId: client?.ClientInsuranceInfo?.PhotoOfPolicy.PublicId,
    //     SecureURL: client?.ClientInsuranceInfo?.PhotoOfPolicy.SecureURL,
    //   });
    //   trigger('ClientInsuranceInfo.PhotoOfPolicy');
    // }

    setValue('Phone', user.Phone);
    trigger('Phone');
    setPhone(user.Phone);
  }, []);
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

  async function onsubmit(data: TUserEditForm) {
    console.log('formData', data);
    SetIsPending(true);
    try {
      if (imgFile) {
        const folder = 'user';
        await deleteCloudinaryImage(user.Avatar.PublicId);
        const newAvatar = await CloudinaryUpload({ folder, image: imgFile });

        const formdata = {
          ...data,
        };
        if (!newAvatar) {
          throw new Error('Failed to upload image.');
        }
        formdata.Avatar = {
          PublicId: newAvatar.public_id,
          SecureURL: newAvatar.secure_url,
        };

        const res = await mutateAsync({
          payload: formdata,
        });
        toast.promise(Promise.resolve(res), {
          loading: 'Editing Profile...',
          success: (res) => res.message || 'Successfully Updated your profile!',
          error: 'Failed to update your profile',
        });
        if (res) {
          SetIsPending(false);
          console.log('sucesssss');
        }
      } else {
        const ress = await mutateAsync({
          payload: data,
        });
        toast.promise(Promise.resolve(ress), {
          loading: 'Editing Profile...',
          success: (res) => res.message || 'Successfully Updated your profile!',
          error: 'Failed to update your profile',
        });
        if (ress) {
          SetIsPending(false);
        }
      }
    } catch (err: any) {
      SetIsPending(false);

      console.log('Form Edit:', err);
      toast.error(err.message || 'Failed to update your profile!');
    }
  }
  // useEffect(() => {}, []);
  return (
    <div className="pb-10 sm:py-10">
      <Title title="Manage Password" />
      <section className="mt-8 space-y-4 px-4 2xl:container">
        <h2 className="text-lg font-semibold">Edit your Profile</h2>

        <form onSubmit={handleSubmit(onsubmit)} className="max-w-4xl space-y-3">
          <div className="flex flex-col gap-3">
            <CompulsoryLabel>Change Profile Picture</CompulsoryLabel>
            <ImageUpload
              img={imgFile}
              setImg={setImgFile}
              initialImage={user.Avatar.SecureURL || '/avatar.jpg'}
            />
          </div>

          {/* teamName */}
          <div className="mt-4 space-y-2">
            <CompulsoryLabel>Team Name</CompulsoryLabel>
            <div className="flex items-center rounded-md border border-gray-300">
              <Users2 className="mx-2 text-primary" />
              <Input
                type="text"
                {...register('MyTeam')}
                placeholder="Eg: Ram's Team"
                className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
              />
            </div>
            <FormErr>{errors.MyTeam?.message}</FormErr>
          </div>
          {/* fullname */}
          <div className="mt-4 space-y-2">
            <CompulsoryLabel>Full Name</CompulsoryLabel>
            <div className="flex items-center rounded-md border border-gray-300">
              <User2 className="mx-2 text-primary" />
              <Input
                type="text"
                {...register('FullName')}
                placeholder="Eg: John Doe"
                className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
              />
            </div>
            <FormErr>{errors.FullName?.message}</FormErr>
          </div>
          {/* alternate phones */}
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="mt-4 space-y-2">
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
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>Date of Birth</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <Calendar className="mx-2 text-primary" />
                <Input
                  {...register('DateOfBirth')}
                  type="date"
                  className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                />
              </div>
              <FormErr>{errors.DateOfBirth?.message}</FormErr>
            </div>
          </div>

          <div className="grid md:grid-cols-3 md:gap-4">
            {/* //PROVINCE */}
            <div className="mt-4 space-y-2">
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
            <div className="mt-4 space-y-2">
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
            {/*ADDRESS/MUNICIPLAITY  */}
            <div className="mt-4 space-y-2">
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
          </div>

          <div className="w-full pt-8">
            <FormSubmitBtn
              classname={'sm:w-[50%]  w-full'}
              isLoading={isPending}
            >
              Save
            </FormSubmitBtn>
          </div>
        </form>
      </section>
    </div>
  );
}
