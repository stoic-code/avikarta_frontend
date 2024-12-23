'use client';
import React, { useEffect, useState } from 'react';
import { H3 } from '@/components/typography/index';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Phone, User, Mail, MapPinned, Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import Locations from '@/data/location.json';
import FormErr from '@/components/Common/FormErr';
import CompulsoryLabel from '@/components/Common/CompulsoryLabel';

export default function AddClient1({
  errors,
  trigger,
  setValue,
  register,
}: {
  errors: any;
  trigger: any;
  setValue: any;
  register: any;
}) {
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [municipality, setMunicipality] = useState<string>('');
  const [phone, setPhone] = useState('');
  const [step1FormFilled, setStep1FormFilled] = useState(false);

  console.log('errorssss', errors);

  const handlePhoneChange = (e: any) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setPhone(onlyDigits);
  };

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

  const validateFields = async () => {
    const result = await trigger([
      'FullName',
      'DateOfBirth',
      'Phone',
      'Province',
      'District',
      'Municipality',
      'Email',
      'Avatar',
    ]);
    if (result) {
      router.push('?step=2');
    }
  };

  return (
    <section className="px-4 2xl:container sm:py-10">
      <div className="mx-auto max-w-5xl rounded-lg border border-black bg-white p-4 shadow-xl sm:p-8">
        <div className="text-center">
          <H3 className="text-3xl font-semibold">Add Client</H3>
        </div>
        <section>
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

          <div className="grid md:grid-cols-2 md:gap-4">
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>Date of Birth</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <Calendar className="mx-2 text-primary" />
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

          <div className="grid md:grid-cols-2 md:gap-4">
            {/* //PROVINCE */}
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>Province</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <MapPinned className="mx-2 text-primary" />
                <Select onValueChange={(val) => setSelectedProvince(val)}>
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
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>Municipality</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <MapPinned className="mx-2 text-primary" />
                <Select
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

          <div className="mt-4 space-y-2">
            <CompulsoryLabel>Upload Profile Picture</CompulsoryLabel>
            <Input
              onChange={(e: any) => {
                setValue('Avatar', e.target.files[0]);
                trigger('Avatar');
              }}
              type="file"
              accept="image/*"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FormErr>{errors.Avatar?.message}</FormErr>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <Button
              variant={'outline'}
              onClick={() => router.push('/my-clients')}
              className="w-full border-primary px-4 py-2 text-lg font-medium hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button type="button" onClick={validateFields}>
              Next
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
}
