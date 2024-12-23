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
  Camera,
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
import { useRouter } from 'next/navigation';
import FormErr from '@/components/Common/FormErr';
import { Form } from 'react-hook-form';

export default function AddAClient2({
  errors,
  pending,
  trigger,
  setValue,
  register,
}: {
  errors: any;
  trigger: any;
  pending: boolean;
  setValue: any;
  register: any;
}) {
  const router = useRouter();

  const [phone, setPhone] = useState('');
  console.log('fom 2 ko', errors);
  const { ClientInsuranceInfo } = errors;
  console.log('fom 2 clieninsirance ko', ClientInsuranceInfo);

  const handlePhoneChange = (e: any) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setPhone(onlyDigits);
  };

  //THIS IS IF USER REFRESHS THE PAGE
  useEffect(() => {
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
      if (!result) {
        router.push('?step=1');
      }
    };

    validateFields();
  }, []);

  return (
    <section className="px-4 2xl:container sm:py-10">
      <div className="mx-auto max-w-5xl rounded-lg border border-black bg-white p-4 shadow-xl sm:p-8">
        <div className="text-center">
          <H3 className="text-3xl font-semibold">Add Client</H3>
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
                  value={phone}
                  onChange={handlePhoneChange}
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
                  onChange={(e) => {
                    setValue('ClientInsuranceInfo.EndDate', e.target.value);
                    trigger('ClientInsuranceInfo.EndDate');
                  }}
                  type="date"
                  className="w-full border-none p-2 placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                />
              </div>
              <FormErr>{errors?.ClientInsuranceInfo?.EndDate?.message}</FormErr>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-4">
            <div className="mt-4 space-y-2">
              <Label>Last Payment Date</Label>
              <div className="flex items-center rounded-md border border-gray-300">
                <Calendar className="mx-2 text-primary" />
                <Input
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
            <div className="mt-4 space-y-2">
              <Label>Photo of Policy</Label>
              <div className="flex items-center rounded-md border border-gray-300">
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
              </div>
              <FormErr>
                {errors?.ClientInsuranceInfo?.PhotoOfPolicy?.message}
              </FormErr>
            </div>
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
              onClick={() => router.push('?step=1')}
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
                ' Add Client'
              )}
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
}
