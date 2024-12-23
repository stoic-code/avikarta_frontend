'use client';
import React, { useEffect, useState } from 'react';
import { H3 } from '@/components/typography/index';
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
  FilePenLine,
  Hash,
  Loader2,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  ClientEditSchema,
  TClientSchemaEditForm,
} from '@/schema/client.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import CompulsoryLabel from '@/components/Common/CompulsoryLabel';
import FormErr from '@/components/Common/FormErr';
import Locations from '@/data/location.json';
import { ImageUpload } from '@/components/Common/ImageUpload';
import { useEditClient } from '@/hooks/mutations/client.mutation';
import { deleteCloudinaryImage } from '@/components/cloudinary/upload';
import CloudinaryUpload from '@/components/cloudinary/CloudinaryUpload';
import toast from 'react-hot-toast';
import ImageEdit from '@/components/Common/ImageEdit';

export default function EditClient({ client }: { client: any }) {
  const [phone, setPhone] = useState('');
  const [nomineePhone, setNomineePhone] = useState('');
  const [img, setImg] = useState<File | null>(null);
  const [imgPolicy, setImgPolicy] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  // const [client, setClient] = useState<any>({});
  const { id } = useParams();
  const { mutateAsync } = useEditClient(id);
  const [selectedProvince, setSelectedProvince] = useState<string>(
    client.Province ? client.Province : ''
  );
  const [district, setDistrict] = useState<string>(
    client.District ? client.District : ''
  );
  const [municipality, setMunicipality] = useState<string>(
    client.Municipality ? client.Municipality : ''
  );

  const handlePhoneChange = (e: any) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setPhone(onlyDigits);
  };
  const handleNomineePhoneChange = (e: any) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setNomineePhone(onlyDigits);
  };
  const {
    setValue,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TClientSchemaEditForm>({
    resolver: zodResolver(ClientEditSchema),
    defaultValues: {
      ...client,
      Phone: client?.Phone,
    },
  });

  useEffect(() => {
    if (client.Avatar) {
      console.log('avatar', client.Avatar);

      setValue('Avatar', {
        PublicId: client.Avatar.PublicId,
        SecureURL: client.Avatar.SecureURL,
      });
      trigger('Avatar');
    }

    if (client.ClientInsuranceInfo.PhotoOfPolicy) {
      setValue('ClientInsuranceInfo.PhotoOfPolicy', {
        PublicId: client?.ClientInsuranceInfo?.PhotoOfPolicy.PublicId,
        SecureURL: client?.ClientInsuranceInfo?.PhotoOfPolicy.SecureURL,
      });
      trigger('ClientInsuranceInfo.PhotoOfPolicy');
    }

    setValue('Phone', client.Phone);
    trigger('Phone');
    setPhone(client.Phone);
    setValue('ClientInsuranceInfo.NomineePhone', client.Phone);
    trigger('ClientInsuranceInfo.NomineePhone');
    setNomineePhone(client.ClientInsuranceInfo.NomineePhone);
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

  async function onsubmit(data: TClientSchemaEditForm) {
    console.log('formdata', data);

    try {
      setPending(true);

      console.log('imag rw policy', img, imgPolicy);

      if (img || imgPolicy) {
        const folder = 'clients';
        let avatarImg;
        let PolicyImg;
        if (img) {
          await deleteCloudinaryImage(client.Avatar.PublicId);
          avatarImg = await CloudinaryUpload({ folder, image: img });
        }
        if (imgPolicy) {
          await deleteCloudinaryImage(
            client.ClientInsuranceInfo.PhotoOfPolicy.PublicId
          );
          PolicyImg = await CloudinaryUpload({ folder, image: imgPolicy });
        }
        const formdata = {
          ...data,
        };

        //if policy img is new
        if (imgPolicy) {
          formdata.ClientInsuranceInfo.PhotoOfPolicy = {
            PublicId: PolicyImg.public_id,
            SecureURL: PolicyImg.secure_url,
          };
        }
        //if avatar img is new
        if (avatarImg) {
          formdata.Avatar = {
            PublicId: avatarImg.public_id,
            SecureURL: avatarImg.secure_url,
          };
        }

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
          router.back();
          setPending(false);
        }
      } else {
        const res = mutateAsync({
          payload: data,
        });
        toast.promise(Promise.resolve(res), {
          loading: 'Editing Client...',
          success: (res) => res.message || ' Successfully Edited the Client!',
          error: 'Failed to edit the client!',
        });
      }
    } catch (err: any) {
      console.log('Errror in edit:', err);
      toast.error(err.message || 'Failed to add client');
      setPending(false);
    }
  }

  console.log('form errors', errors);

  console.log('client usetate ko', client);
  console.log('client usetate ko province', client.Province);

  return (
    <section className="px-4 2xl:container sm:py-10">
      <div className="mx-auto max-w-5xl rounded-lg border border-black bg-white p-4 shadow-xl sm:p-8">
        <div className="text-center">
          <H3 className="text-3xl font-semibold">Edit Client</H3>
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div>
            {/* //fullname */}
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>Full Name of Client</CompulsoryLabel>
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
            {/* phone and dob */}
            <div className="grid md:grid-cols-2 md:gap-4">
              <div className="mt-4 space-y-2">
                <CompulsoryLabel>Date of Birth</CompulsoryLabel>
                <div className="flex items-center rounded-md border border-gray-300">
                  <Calendar
                    {...register('DateOfBirth')}
                    className="mx-2 text-primary"
                  />
                  <Input
                    {...register('DateOfBirth')}
                    type="date"
                    onChange={(e) => {
                      setValue('DateOfBirth', e.target.value);
                      trigger('DateOfBirth');
                    }}
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>{errors.DateOfBirth?.message}</FormErr>
              </div>
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
            </div>
            {/* province and district */}
            <div className="grid md:grid-cols-2 md:gap-4">
              {/* //PROVINCE */}
              <div className="mt-4 space-y-2">
                <CompulsoryLabel>Province</CompulsoryLabel>
                <div className="flex items-center rounded-md border border-gray-300">
                  <MapPinned className="mx-2 text-primary" />
                  <Select
                    defaultValue={selectedProvince}
                    // defaultValue={Locations.provinceList[Number(client.Province)].name || ''}
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
            {/* email and mniciplaity */}
            <div className="grid md:grid-cols-2 md:gap-4">
              {/*ADDRESS/MUNICIPLAITY  */}
              <div className="mt-4 space-y-2">
                <CompulsoryLabel>Municipality</CompulsoryLabel>
                <div className="flex items-center rounded-md border border-gray-300">
                  <MapPinned className="mx-2 text-primary" />
                  <Select
                    defaultValue={municipality}
                    onValueChange={(val) => setMunicipality(val)}
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
              <div className="mt-4 space-y-2">
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

            {/* upload photo */}
            <div className="mt-4 flex flex-col space-y-2">
              <CompulsoryLabel>Upload Profile Picture</CompulsoryLabel>
              {/* <Input
                onChange={(e: any) => {
                  setValue('Avatar', e.target.files[0]);
                  trigger('Avatar');
                }}
                type="file"
                accept="image/*"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              /> */}
              <ImageUpload
                setImg={setImg}
                img={img}
                initialImage={client.Avatar.SecureURL}
              />
              <FormErr>{errors.Avatar?.message}</FormErr>
            </div>
          </div>
          <section>
            <div className="mt-4 space-y-2">
              <Label>Nominee Name</Label>
              <div className="flex items-center rounded-md border border-gray-300">
                <User className="mx-2 text-primary" />
                <Input
                  {...register('ClientInsuranceInfo.NameOfNominee')}
                  type="text"
                  placeholder="Eg: John Doe"
                  className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                />
              </div>
              <FormErr>
                {errors?.ClientInsuranceInfo?.NameOfNominee?.message}
              </FormErr>
            </div>

            <div className="grid md:grid-cols-2 md:gap-4">
              <div className="mt-4 space-y-2">
                <Label>Phone Number</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <Phone className="mx-2 text-primary" />
                  <Input
                    {...register('ClientInsuranceInfo.NomineePhone')}
                    value={nomineePhone}
                    onChange={handleNomineePhoneChange}
                    placeholder="Eg: 98********"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.NomineePhone?.message}
                </FormErr>
              </div>
              <div className="mt-4 space-y-2">
                <Label>Relationship</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <User className="mx-2 text-primary" />
                  <Input
                    {...register('ClientInsuranceInfo.Relationship')}
                    type="text"
                    placeholder="Eg: Father"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.Relationship?.message}
                </FormErr>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-4">
              <div className="mt-4 space-y-2">
                <Label>Sum Assured</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <ReceiptIndianRupee className="mx-2 text-primary" />
                  <Input
                    {...register('ClientInsuranceInfo.SumAssured', {
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Eg: 100000"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.SumAssured?.message}
                </FormErr>
              </div>
              <div className="mt-4 space-y-2">
                <Label>Premium Amount</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <ReceiptIndianRupee className="mx-2 text-primary" />
                  <Input
                    {...register('ClientInsuranceInfo.PremiumAmount', {
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Eg: 20000"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.PremiumAmount?.message}
                </FormErr>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-4">
              <div className="mt-4 space-y-2">
                <Label>Type of Policy</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <FilePenLine className="mx-2 text-primary" />
                  <Input
                    {...register('ClientInsuranceInfo.PolicyType', {
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Enter Policy type"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.PolicyType?.message}
                </FormErr>
              </div>
              <div className="mt-4 space-y-2">
                <Label>Policy Number </Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <FilePenLine className="mx-2 text-primary" />
                  <Input
                    {...register('ClientInsuranceInfo.PolicyNo', {
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Enter Policy Number"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.PolicyNo?.message}
                </FormErr>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-4">
              <div className="mt-4 space-y-2">
                <Label>Issue Date</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <Calendar className="mx-2 text-primary" />
                  <Input
                    defaultValue={
                      client.ClientInsuranceInfo.IssueDate.split('T')[0]
                    }
                    onChange={(e) => {
                      setValue('ClientInsuranceInfo.IssueDate', e.target.value);
                      trigger('ClientInsuranceInfo.IssueDate');
                    }}
                    type="date"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.IssueDate?.message}
                </FormErr>
              </div>
              <div className="mt-4 space-y-2">
                <Label>End Date </Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <Calendar className="mx-2 text-primary" />
                  <Input
                    defaultValue={
                      client.ClientInsuranceInfo.EndDate.split('T')[0]
                    }
                    onChange={(e) => {
                      setValue('ClientInsuranceInfo.EndDate', e.target.value);
                      trigger('ClientInsuranceInfo.EndDate');
                    }}
                    type="date"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.EndDate?.message}
                </FormErr>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-4">
              <div className="mt-4 space-y-2">
                <Label>Last Payment Date</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <Calendar className="mx-2 text-primary" />
                  <Input
                    defaultValue={
                      client.ClientInsuranceInfo.LastPaymentDate.split('T')[0]
                    }
                    onChange={(e) => {
                      setValue(
                        'ClientInsuranceInfo.LastPaymentDate',
                        e.target.value
                      );
                      trigger('ClientInsuranceInfo.LastPaymentDate');
                    }}
                    type="date"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.LastPaymentDate?.message}
                </FormErr>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-4">
              <div className="mt-4 space-y-2">
                <Label>Payment Method</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <ReceiptIndianRupee className="mx-2 text-primary" />
                  <Select
                    defaultValue={client.ClientInsuranceInfo.PaymentMethod}
                    onValueChange={(val) => {
                      setValue('ClientInsuranceInfo.PaymentMethod', val);
                      trigger('ClientInsuranceInfo.PaymentMethod');
                    }}
                  >
                    <SelectTrigger className="border-none">
                      <SelectValue placeholder="Select Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Semi-Anually">Semi-Anually</SelectItem>
                      <SelectItem value="Anually">Anually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.PaymentMethod?.message}
                </FormErr>
              </div>
              <div className="mt-4 space-y-2">
                <Label>Loan Facilities</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <ReceiptIndianRupee className="mx-2 text-primary" />
                  <Select
                    defaultValue={
                      client.ClientInsuranceInfo.LoanFacilities ? 'yes' : 'no'
                    }
                    onValueChange={(val) => {
                      if (val === 'yes') {
                        setValue('ClientInsuranceInfo.LoanFacilities', true);
                        trigger('ClientInsuranceInfo.LoanFacilities');
                      } else if (val === 'no') {
                        setValue('ClientInsuranceInfo.LoanFacilities', false);
                        trigger('ClientInsuranceInfo.LoanFacilities');
                      }
                    }}
                  >
                    <SelectTrigger className="border-none">
                      <SelectValue placeholder="Select Loan facilities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'yes'}>Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.LoanFacilities?.message}
                </FormErr>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-4">
              <div className="mt-4 space-y-2">
                <Label>Policy Issue branch</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <FilePenLine className="mx-2 text-primary" />
                  <Input
                    {...register('ClientInsuranceInfo.PolicyIssueBranch')}
                    type="text"
                    placeholder="Enter Branch"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.PolicyIssueBranch?.message}
                </FormErr>
              </div>
            </div>
            {/* POLICY PHOTO */}
            <div className="mt-4 flex flex-col gap-4">
              <Label>Photo of Policy</Label>
              {/* <div className="flex items-center rounded-md border border-gray-300">
                  <Camera className="mx-2 text-primary" />
                  <Input
                    onChange={(e: any) => {
                      setValue(
                        'ClientInsuranceInfo.PhotoOfPolicy',
                        e.target.files[0]
                      );
                      trigger('ClientInsuranceInfo.PhotoOfPolicy');
                    }}
                    type="file"
                    placeholder="Upload Policy Photo"
                    accept="image/*"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div> */}
              <ImageEdit
                setImg={setImgPolicy}
                img={imgPolicy}
                initialImage={
                  client.ClientInsuranceInfo.PhotoOfPolicy.SecureURL
                }
              />
              <FormErr>
                {errors?.ClientInsuranceInfo?.PhotoOfPolicy?.message}
              </FormErr>
            </div>
            <div className="grid md:grid-cols-2 md:gap-4">
              <div className="mt-4 space-y-2">
                <Label>Policy File Received By</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <User className="mx-2 text-primary" />
                  <Input
                    {...register('ClientInsuranceInfo.PolicyFileReceivedBy')}
                    type="text"
                    placeholder="Enter Name"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.PolicyFileReceivedBy?.message}
                </FormErr>
              </div>
              <div className="mt-4 space-y-2">
                <Label>Policy File Received Date</Label>
                <div className="flex items-center rounded-md border border-gray-300">
                  <Calendar className="mx-2 text-primary" />
                  <Input
                    defaultValue={
                      client.ClientInsuranceInfo.PolicyFileReceivedDate.split(
                        'T'
                      )[0]
                    }
                    onChange={(e: any) => {
                      setValue(
                        'ClientInsuranceInfo.PolicyFileReceivedDate',
                        e.target.value
                      );
                      trigger('ClientInsuranceInfo.PolicyFileReceivedDate');
                    }}
                    type="date"
                    className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <FormErr>
                  {errors?.ClientInsuranceInfo?.PolicyFileReceivedDate?.message}
                </FormErr>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label>Agent Code</Label>
              <div className="flex items-center rounded-md border border-gray-300">
                <Hash className="mx-2 text-primary" />
                <Input
                  type="text"
                  placeholder="Eg: 123456"
                  className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <Button
                variant={'outline'}
                // onClick={() => router.push('?step=1')}
                className="w-full border-primary px-4 py-2 text-lg font-medium hover:bg-secondary"
              >
                Back
              </Button>
              <Button
                disabled={pending}
                type="submit"
                className={` ${pending ? 'cursor-not-allowed' : 'cursor-pointer'} w-full px-4 py-2 text-lg font-medium`}
              >
                {pending ? (
                  <div>
                    <Loader2 className="animate-spin text-white" />
                  </div>
                ) : (
                  'Edit Client'
                )}
              </Button>
            </div>
          </section>
        </form>
      </div>
    </section>
  );
}
