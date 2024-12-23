'use client';
import React from 'react';
import Image from 'next/image';
import { Calendar, Mail, MapPin, Phone, User, Edit } from 'lucide-react';
import { H2, H4 } from '@/components/typography';
import Title from '@/components/Title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useGetSingleClients } from '@/hooks/queries/client.query';
import PageLoadingUI from '@/components/Common/PageLoadingUI';
import { formatDateString } from '@/components/Common/DateFormatter';

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isLoading } = useGetSingleClients(id);

  if (isLoading) {
    return <PageLoadingUI />;
  }

  const { data: c } = data;
  const {
    data: { ClientInsuranceInfo: cii },
  } = data;
  console.log('singl clinet', c);
  console.log('singl clinet', cii);

  return (
    <section className="px-4 2xl:container sm:py-10">
      <Title title="Client Details" />
      <div className="mt-10 flex justify-end lg:mt-[-40px]">
        <Link href={`/my-clients/${id}/edit`}>
          <Button className="flex items-center gap-2 text-lg">
            <Edit />
            Edit Details
          </Button>
        </Link>
      </div>

      <div className="mt-20 flex flex-col items-center justify-center gap-6 2xl:container lg:mx-20 lg:flex-row lg:gap-20">
        <div className="flex-shrink-0">
          <Image
            src={c.Avatar.SecureURL}
            alt="My Photo"
            width={200}
            height={200}
            className="h-[200px] w-[200px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col space-y-2 lg:w-full">
          <H4 className="flex items-center gap-2">
            <User className="text-primary" />
            <div className="flex w-full">
              <span className="font-bold lg:w-44">Name:</span>
              <span>{c.FullName}</span>
            </div>
          </H4>
          <H4 className="flex items-center gap-2">
            <MapPin className="text-primary" />
            <div className="flex w-full">
              <span className="font-bold lg:w-44">Address:</span>
              <span>
                {c.District},{c.Municipality}
              </span>
            </div>
          </H4>
          <H4 className="flex items-center gap-2">
            <Calendar className="text-primary" />
            <div className="flex w-full">
              <span className="font-bold lg:w-44">Date of Birth:</span>
              <span>{c.DateOfBirth}</span>
            </div>
          </H4>
          <H4 className="flex items-center gap-2">
            <Phone className="text-primary" />
            <div className="flex w-full">
              <span className="font-bold lg:w-44">Phone:</span>
              <span>{c.Phone}</span>
            </div>
          </H4>
          <H4 className="flex items-center gap-2">
            <Mail className="text-primary" />
            <div className="flex w-full">
              <span className="font-bold lg:w-44">Email:</span>
              <span>{c.Email}</span>
            </div>
          </H4>
        </div>
      </div>
      <div className="mt-10 border-t-4 border-primary" />
      <div className="mt-8">
        <H2>Clients Insurance Informations</H2>
        <div className="mt-8 flex flex-col justify-center justify-between gap-2 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex flex-col space-y-2 lg:w-full">
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Nominee:</span>
                <span>{cii.NameOfNominee}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Phone:</span>
                <span>{cii.NomineePhone}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Relationship:</span>
                <span>{cii.Relationship}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Sum Assured:</span>
                <span>NPR {cii.SumAssured}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Premium Amount:</span>
                <span>NPR {cii.PremiumAmount}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Type of Policy:</span>
                <span>{cii.PolicyType}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Policy No.:</span>
                <span>{cii.PolicyNo}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Issued Date:</span>
                <span>{formatDateString(cii.IssueDate)}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">End Date:</span>
                <span>{formatDateString(cii.EndDate)}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Last Payment Date:</span>
                <span>{formatDateString(cii.LastPaymentDate)}</span>
              </div>
            </H4>
          </div>

          <div className="flex flex-col space-y-2 lg:w-full">
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Payment Method:</span>
                <span>{cii.PaymentMethod}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Loan Facilities:</span>
                <span>{cii.LoanFacilities ? 'Yes' : 'No'}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Policy Issue Branch:</span>
                <span>{cii.PolicyIssueBranch}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Photo of Policy:</span>
                <a
                  href={cii?.PhotoOfPolicy?.SecureURL}
                  target="_blank"
                  className="text-primary underline"
                >
                  View Photo
                </a>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">
                  Policy File Received By:
                </span>
                <span>{cii.PolicyFileReceivedBy}</span>
              </div>
            </H4>

            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">
                  Policy File Received Date:
                </span>
                <span>{formatDateString(cii.PolicyFileReceivedDate)}</span>
              </div>
            </H4>
            <H4 className="flex items-center gap-2">
              <div className="flex w-full">
                <span className="font-bold lg:w-64">Agent Code:</span>
                <span>A1234</span>
              </div>
            </H4>
          </div>
        </div>
      </div>
    </section>
  );
}
