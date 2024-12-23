'use client';
import React, { useEffect, useState } from 'react';
import { H3 } from '../typography';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  LockKeyhole,
  Phone,
  Eye,
  EyeOff,
  User,
  Mail,
  MapPinned,
  HandHeart,
  Hash,
  Calendar,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
// import Locations from '@/data/locations.json';
import Locations from '@/data/location.json';
import Insurances from '@/data/insurances.json';
import CompulsoryLabel from '../Common/CompulsoryLabel';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  TUserRegisterForm,
  userRegisterSchema,
} from '@/schema/register.schema';
import FormErr from '../Common/FormErr';
import { useRegisterMutation } from '@/hooks/mutations/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createLoginSession } from '@/lib/lib';
import AddressSelect from './Address/AddressSelect';
import InsuranceSelect from './Address/InsuranceSelect';
import FormSubmitBtn from './FormSubmitBtn';

export default function RegisterForm() {
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [municipality, setMunicipality] = useState<string>('');

  const [insuranceCategory, setInsuranceCategory] = useState<string>('');
  const [insuranceCompany, setInsuranceCompany] = useState('');

  const handlePhoneChange = (e: any) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setPhone(onlyDigits);
  };
  const router = useRouter();
  const { mutateAsync, isSuccess, error } = useRegisterMutation();
  const {
    setValue,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserRegisterForm>({
    resolver: zodResolver(userRegisterSchema),
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

  //INSURANCE CATEGORY HANDLE
  useEffect(() => {
    if (insuranceCategory) {
      setValue(
        'InsuranceCompanyCategory',
        String(
          Insurances.insuranceCategories.find(
            (i) => i.category === insuranceCategory
          )?.category
        )
      );
      trigger('InsuranceCompanyCategory');
    }
  }, [insuranceCategory]);

  //INSURANCE COMPANY
  useEffect(() => {
    if (insuranceCategory) {
      setValue(
        'NameOfInsuranceCompany',
        String(
          Insurances.insuranceCategories
            .find((i) => i.category === insuranceCategory || '')
            ?.companies.find((c) => c.name === insuranceCompany)?.name
        )
      );
      trigger('NameOfInsuranceCompany');
    }
  }, [insuranceCategory]);

  console.log(selectedProvince, district, municipality);

  const onsubmit = async (data: TUserRegisterForm) => {
    setIsLoading(true);
    try {
      const ress = mutateAsync(data)
        .then((res) => {
          toast.promise(
            Promise.resolve(res), // Resolve the promise for toast.promise
            {
              loading: 'Registering...',
              success: 'Successfully Registered!',
              error: 'Failed to register', // Default error message
            }
          );
          if (res.success) {
            setIsLoading(false);
            router.push('/login');
          }
        })
        .catch((err) => {
          console.log('error haii form ko', err.message);
          toast.error(err.message || 'Failed to register.');
        });
    } catch (err) {
      setIsLoading(false);
      console.log('Network Error', err);
      toast.error('Something Went Wrong.');
    }
  };

  console.log(
    'selected muniiiiiiii',
    Locations.provinceList
      .find((p) => p.name === selectedProvince)
      ?.districtList.find((d) => d.name === district)
  );

  return (
    <section className="px-4 py-10 2xl:container sm:py-20">
      <div className="mx-auto max-w-5xl rounded-lg border border-black bg-white p-8 shadow-xl">
        <div className="text-center">
          <H3 className="text-3xl font-semibold">Register</H3>
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mt-4 space-y-2">
            <CompulsoryLabel>Full Name</CompulsoryLabel>
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
              <CompulsoryLabel>Email</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <Mail className="mx-2 text-primary" />
                <Input
                  type="email"
                  {...register('Email')}
                  placeholder="Eg: email@gmail.com"
                  className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                />
              </div>
              <FormErr>{errors.Email?.message}</FormErr>
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

            {/* ALTERNATIVE PHONES */}
            {/* <div className="mt-4 space-y-2">
              <CompulsoryLabel>Alternate Phone </CompulsoryLabel>
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
              <CompulsoryLabel>Alternate Phone</CompulsoryLabel>
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
            </div> */}
          </div>

          <div className="grid md:grid-cols-2 md:gap-4">
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>Password</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <LockKeyhole className="mx-2 text-primary" />
                <Input
                  {...register('Password')}
                  type={seePassword ? 'text' : 'password'}
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
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>Confirm Password</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300">
                <LockKeyhole className="mx-2 text-primary" />
                <Input
                  type={seeConfirmPassword ? 'text' : 'password'}
                  {...register('ConfirmPassword')}
                  placeholder="Enter password"
                  className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                />
                <span className="mx-2 text-gray-500">
                  {seeConfirmPassword ? (
                    <EyeOff
                      className="cursor-pointer text-primary"
                      onClick={() => setSeeConfirmPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="cursor-pointer text-primary"
                      onClick={() => setSeeConfirmPassword(true)}
                    />
                  )}
                </span>
              </div>
              <FormErr>{errors.ConfirmPassword?.message}</FormErr>
            </div>
          </div>

          <div className="grid md:grid-cols-3 md:gap-4">
            {/* //PROVINCE */}
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>Province</CompulsoryLabel>
              <AddressSelect
                legend="Select Province"
                addressSetter={setSelectedProvince}
              >
                {Locations.provinceList.map((p, idx) => (
                  <option className="bg-white" key={idx} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </AddressSelect>
              {/* <div className="flex items-center rounded-md border border-gray-300 px-2">
                <MapPinned size={20} className="flex-shrink-0 text-primary" />
                <select className="ml-2 h-10 w-[90%] bg-transparent px-2 outline-none">
                  <option
                    value=""
                    disabled
                    selected
                    // hidden
                  >
                    Select Province
                  </option>

                  {Locations.provinceList.map((p, idx) => (
                    <option className="bg-white" key={idx} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {/* <Select onValueChange={(val) => setSelectedProvince(val)}>
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
                </Select> */}
              {/* </div>  */}
              <FormErr>{errors.Province?.message}</FormErr>
            </div>
            {/* DISTRICT */}
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>District</CompulsoryLabel>
              {/* <div className="flex items-center rounded-md border border-gray-300">
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
              </div> */}
              <AddressSelect
                legend="Select District"
                addressSetter={setDistrict}
              >
                {/* {Locations.provinceList.map((p, idx) => (
                  <option className="bg-white" key={idx} value={p.name}>
                    {p.name}
                  </option>
                ))} */}
                {selectedProvince
                  ? Locations.provinceList
                      .find((p) => p.name === selectedProvince)
                      ?.districtList.map((d, idx) => (
                        <option className="bg-white" key={idx} value={d.name}>
                          {d.name}
                        </option>
                      ))
                  : null}
              </AddressSelect>
              <FormErr>{errors.District?.message}</FormErr>
            </div>
            {/*ADDRESS/MUNICIPLAITY  */}
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>Municipality</CompulsoryLabel>
              {/* <div className="flex items-center rounded-md border border-gray-300">
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
              </div> */}
              <AddressSelect
                legend="Select Municipality"
                addressSetter={setMunicipality}
              >
                {/* {Locations.provinceList.map((p, idx) => (
                  <option className="bg-white" key={idx} value={p.name}>
                    {p.name}
                  </option>
                ))} */}
                {district
                  ? Locations.provinceList
                      .find((p) => p.name === selectedProvince)
                      ?.districtList.find((d) => d.name === district)
                      ?.municipalityList.map((d, idx) => (
                        <option className="bg-white" key={idx} value={d.name}>
                          {d.name}
                        </option>
                      ))
                  : null}
              </AddressSelect>
              <FormErr>{errors.Municipality?.message}</FormErr>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-4">
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>Insurance Company Category</CompulsoryLabel>
              {/* <div className="flex items-center rounded-md border border-gray-300">
                <HandHeart className="mx-2 text-primary" />
                <Select onValueChange={(val) => setInsuranceCategory(val)}>
                  <SelectTrigger className="border-none">
                    <SelectValue placeholder="Select Insurance Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Insurances.insuranceCategories.map((i, idx) => (
                      <SelectItem key={idx} value={i.category}>
                        {i.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
              <InsuranceSelect
                insuranceSetter={setInsuranceCategory}
                legend="Select Insurance Category"
              >
                {Insurances.insuranceCategories.map((i, idx) => (
                  <option className="bg-white" key={idx} value={i.category}>
                    {i.category}
                  </option>
                ))}
              </InsuranceSelect>
              <FormErr>{errors.InsuranceCompanyCategory?.message}</FormErr>
            </div>
            <div className="mt-4 space-y-2">
              <CompulsoryLabel>Name of Insurance Company</CompulsoryLabel>
              {/* <div className="flex items-center rounded-md border border-gray-300">
                <HandHeart className="mx-2 text-primary" />
                <Select
                  disabled={!insuranceCategory}
                  onValueChange={(val) => setInsuranceCompany(val)}
                >
                  <SelectTrigger className="border-none">
                    <SelectValue placeholder="Select An Insurance Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {insuranceCategory
                      ? Insurances.insuranceCategories
                          .find((i) => i.category === insuranceCategory)
                          ?.companies.map((c, idx) => (
                            <SelectItem key={c.id} value={c.name}>
                              {c.name}
                            </SelectItem>
                          ))
                      : null}
                  </SelectContent>
                </Select>
              </div> */}
              <InsuranceSelect
                insuranceSetter={setInsuranceCompany}
                legend="Select Insurance Category"
              >
                {insuranceCategory
                  ? Insurances.insuranceCategories
                      .find((i) => i.category === insuranceCategory)
                      ?.companies.map((c, idx) => (
                        <option className="bg-white" key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))
                  : null}
              </InsuranceSelect>
              <FormErr>{errors.NameOfInsuranceCompany?.message}</FormErr>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <CompulsoryLabel>Agent Code</CompulsoryLabel>
            <div className="flex items-center rounded-md border border-gray-300">
              <Hash className="mx-2 text-primary" />
              <Input
                {...register('AgentCode')}
                type="text"
                placeholder="Eg: 123456"
                className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
              />
            </div>
            <FormErr>{errors.AgentCode?.message}</FormErr>
          </div>

          <div className="mt-4 text-center">
            <FormSubmitBtn
              isLoading={isLoading}
              classname="w-full px-4 py-2 text-lg font-medium"
            >
              Register
            </FormSubmitBtn>
          </div>
          <div className="mt-4 text-center">
            <span className="font-medium">Already have an account?</span>
            <a href="/login" className="font-medium text-blue-600 underline">
              {' '}
              Login
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
