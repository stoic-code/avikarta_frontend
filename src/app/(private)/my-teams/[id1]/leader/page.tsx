'use client';
import Title from '@/components/Title';
import { H3, H4 } from '@/components/typography';
import { Calendar, Mail, MapPin, Phone, SquareUser, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { useGetTwoLevelMembers } from '@/hooks/mutations/team.mutation';
const p = {
  FullName: 'Milan Praz',
  District: 'Bhaktapur',
  Municipality: 'Madhyapur thimi',
  DateOfBirth: '2020-02-02',
  Phone: '9898989898',
  Email: 'milan@gmail.com',
  teamName: 'Milan ko Team',
};

const teamMembers = [
  {
    id: 1,
    FullName: 'Sunjan Man',
    Phone: '9841488444',
    Address: 'Sankhamul, New Baneshwor',
    Email: 'sujan123@gmail.com',
  },
  {
    id: 1,
    FullName: 'Sunjan Man',
    Phone: '9841488444',
    Address: 'Sankhamul, New Baneshwor',
    Email: 'sujan123@gmail.com',
  },
  {
    id: 1,
    FullName: 'Sunjan Man',
    Phone: '9841488444',
    Address: 'Sankhamul, New Baneshwor',
    Email: 'sujan123@gmail.com',
  },
  {
    id: 1,
    FullName: 'Sunjan Man',
    Phone: '9841488444',
    Address: 'Sankhamul, New Baneshwor',
    Email: 'sujan123@gmail.com',
  },
];

type TMemberDetail = {
  fullName: string;
  address: string;
  contact: string;
  dob: string;
  email: string;
  myLeader: string;
  teamName: string;
};

type TSingleMember = {
  Email: string;
  Address: string;
  Phone: string;
  MembershipStatus: string;
  _id: string;
  FullName: string;
};
export default function page({ params }: { params: { id1: string } }) {
  const { id1: id } = params;
  const [memberDetail, setMemberDetail] = useState<TMemberDetail | undefined>(
    undefined
  );
  const [membersArray, setMemberArray] = useState<TSingleMember[]>([]);
  console.log('leader ko id', id);
  const { mutateAsync, isPending } = useGetTwoLevelMembers();

  async function fetchData(phone: string) {
    try {
      const data = {
        MemberPhone: id,
      };
      const res = await mutateAsync(data);
      console.log('data hai 2 level', await res);
      return await res;
    } catch (err) {
      console.log('Errrorrrr haiaiaiaai', err);
    }
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      const r = await fetchData(id);
      console.log('responseeeeeeeee', r);
      setMemberDetail(r?.memberDetail);
      setMemberArray(r?.memberTeamMember);
    };

    fetchDataAsync();
  }, [id]);
  console.log('mmeberererer', memberDetail);
  console.log('singleee mmeberererer', membersArray);

  return (
    <div className="sm:sspy-10 px-4 2xl:container">
      <Title title="Agent Details" />

      {/* AGENT PERSONAL DETAIL    */}
      <div className="mt-20 flex flex-col items-start gap-6 pb-10 lg:mx-20 lg:flex-row lg:justify-center lg:gap-20">
        <div className="flex-shrink-0">
          <img
            src="/avatar.jpg"
            // src={p?.Avatar?.SecureURL}
            alt="My Photo"
            width={200}
            height={200}
            className="h-[200px] w-[200px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col space-y-2 lg:w-full">
          <H4 className="flex items-center gap-2">
            <User size={22} className="text-primary" />
            <div className="flex w-full">
              <span className="font-bold lg:w-44">Name:</span>
              <span>{memberDetail?.fullName}</span>
            </div>
          </H4>
          <H4 className="flex items-center gap-2">
            <MapPin size={22} className="text-primary" />
            <div className="flex w-full whitespace-nowrap">
              <span className="font-bold lg:w-44">Address:</span>
              <span>{memberDetail?.address}</span>
            </div>
          </H4>
          <H4 className="flex items-center gap-2">
            <Calendar size={22} className="text-primary" />
            <div className="flex w-full">
              <span className="font-bold lg:w-44">Date of Birth:</span>
              <span>{memberDetail?.dob}</span>
            </div>
          </H4>
          <H4 className="flex items-center gap-2">
            <Phone size={22} className="text-primary" />
            <div className="flex w-full">
              <span className="font-bold lg:w-44">Phone:</span>
              <span>{memberDetail?.contact}</span>
            </div>
          </H4>
          <H4 className="flex items-center gap-2">
            <Mail size={22} className="text-primary" />
            <div className="flex w-full">
              <span className="font-bold lg:w-44">Email:</span>
              <span>{memberDetail?.email}</span>
            </div>
          </H4>
        </div>
        <div className="flex flex-col items-start space-y-2 lg:w-full">
          <H4>
            Team Name :{' '}
            <span className="font-semibold">{memberDetail?.teamName}</span>
          </H4>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <SquareUser size={22} className="text-primary" />
            <div className="flex w-full">
              <span className="font-bold lg:w-44">My Leader:</span>
              <span>{memberDetail?.myLeader}</span>
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL ROW GREEN SEPARATOR */}
      <hr className="h-1 w-full bg-primary" />
      <div className="mx-auto mt-8 max-w-4xl">
        <H4 className="font-semibold">Milan&apos;s Team Members</H4>
        <div className="mt-4 overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/60 text-black">
              <TableRow>
                <TableHead className="text-black">S.N</TableHead>
                <TableHead className="text-left text-black">Name</TableHead>
                <TableHead className="text-left text-black">Phone</TableHead>
                <TableHead className="text-left text-black">Address</TableHead>
                <TableHead className="text-left text-black">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {membersArray?.length > 0
                ? membersArray.map((member: any, idx: number) => (
                    <React.Fragment key={member.id}>
                      <TableRow className="font-medium text-muted-foreground hover:bg-secondary/10">
                        <TableCell className="font-medium">{idx + 1}</TableCell>
                        <TableCell className="text-left">
                          {member.FullName}
                        </TableCell>
                        <TableCell className="text-left">
                          {member.Phone}
                        </TableCell>
                        <TableCell className="text-left">
                          {member.Address}
                        </TableCell>
                        <TableCell className="text-left">
                          {member.Email}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))
                : ''}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
