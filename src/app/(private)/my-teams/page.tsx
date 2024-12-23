'use client';
import React, { useState } from 'react';
import Title from '@/components/Title';
import { Eye, PlusCircle, Search, User, Users } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddTeam from '@/components/Forms/AddTeam';
import CreateTeam from '@/components/my-teams/CreateTeam';
import { useGetAllTeamMember } from '@/hooks/queries/team.query';
import PageLoadingUI from '@/components/Common/PageLoadingUI';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface TeamMember {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
}

interface MemberDetail {
  name: string;
  phone: string;
  address: string;
  email: string;
}

const membersDetails: Record<number, MemberDetail[]> = {
  1: [
    {
      name: 'Team Member 1',
      phone: '9841000001',
      address: 'Address 1',
      email: 'member1@example.com',
    },
    {
      name: 'Team Member 2',
      phone: '9841000002',
      address: 'Address 2',
      email: 'member2@example.com',
    },
  ],
};

export default function Page() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const pathname = usePathname();
  const { data, isLoading } = useGetAllTeamMember();

  const toggleRowExpansion = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Sunjan Man',
      phone: '9841488444',
      address: 'Sankhamul, New Baneshwor',
      email: 'sujan123@gmail.com',
    },
    {
      id: 1,
      name: 'Sunjan Man',
      phone: '9841488444',
      address: 'Sankhamul, New Baneshwor',
      email: 'sujan123@gmail.com',
    },
    {
      id: 1,
      name: 'Sunjan Man',
      phone: '9841488444',
      address: 'Sankhamul, New Baneshwor',
      email: 'sujan123@gmail.com',
    },
    {
      id: 1,
      name: 'Sunjan Man',
      phone: '9841488444',
      address: 'Sankhamul, New Baneshwor',
      email: 'sujan123@gmail.com',
    },
  ];

  function getMyStatus(status: string) {
    if (status === 'pending') {
      return 'bg-orange-100 hover:bg-orange-200';
    } else if (status === 'confirmed') {
      return ' bg-white';
    } else {
      return 'bg-black';
    }
  }

  if (isLoading) {
    return <PageLoadingUI />;
  }
  console.log('team ko data', data);

  function handlePendingReq() {
    toast.error('Cannot View The Pending Members');
  }

  const pendingMembers = data.data?.TeamMembers.filter(
    (m: any) => m.MembershipStatus === 'pending'
  );
  const confirmedMembers = data.data?.TeamMembers.filter(
    (m: any) => m.MembershipStatus === 'confirmed'
  );
  console.log('pending memebr', pendingMembers);
  console.log('confirmed memebr', confirmedMembers);

  return (
    <section className="px-4 2xl:container lg:py-10">
      <Title title="My Teams" />

      <div className="mt-10 flex flex-col justify-between gap-4 sm:flex-row">
        <div className="relative">
          <Input
            placeholder="Search"
            className="rounded-xl border-primary pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-primary" />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className={`${data ? 'flex' : 'hidden'} self-end bg-primary text-lg text-white`}
            >
              Add Member
              <PlusCircle
                className="ml-2 cursor-pointer text-white"
                size={20}
              />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Add Member</DialogTitle>
            </DialogHeader>
            <AddTeam />
          </DialogContent>
        </Dialog>
      </div>

      {data ? (
        <div className="mt-8 overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/60 text-black">
              <TableRow>
                <TableHead className="text-black">S.N</TableHead>
                <TableHead className="text-left text-black">Name</TableHead>
                <TableHead className="text-left text-black">Phone</TableHead>
                <TableHead className="text-left text-black">Address</TableHead>
                <TableHead className="text-left text-black">Email</TableHead>
                <TableHead className="text-right text-black">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data.data?.TeamMembers.sort((a: any, b: any) => {
                  //we are taking 'a' side a agadi ki pachadi only we concerned abt if confirmed then -1 i.e a comes 1st
                  if (
                    a.MembershipStatus === 'confirmed' &&
                    b.MembershipStatus === 'pending'
                  ) {
                    return -1;
                  } else if (
                    a.MembershipStatus === 'pending' &&
                    b.MembershipStatus === 'confirmed'
                  ) {
                    return 1;
                  } else {
                    return 0;
                  }
                }).map((member: any, idx: number) => (
                  <React.Fragment key={member.id}>
                    <TableRow
                      className={cn(
                        'font-medium text-muted-foreground hover:bg-secondary/10',
                        // member.MembershipStatus
                        getMyStatus(member.MembershipStatus)
                      )}
                    >
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell className="whitespace-nowrap text-left">
                        {member.FullName}
                      </TableCell>
                      <TableCell className="text-left">
                        {member.Phone}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-left">
                        {member.Address}
                      </TableCell>
                      <TableCell className="text-left">
                        {member.Email}
                      </TableCell>
                      <TableCell className="flex items-center justify-end gap-2">
                        {member.MembershipStatus === 'pending' ? (
                          <button
                            onClick={() => handlePendingReq()}
                            // href={`${pathname}/${member.Phone}/leader`}
                            className="bg-transparent text-lg text-primary"
                          >
                            <Eye size={20} />
                          </button>
                        ) : (
                          <Link
                            href={`${pathname}/${member.Phone}/leader`}
                            className="bg-transparent text-lg text-primary"
                          >
                            <Eye size={20} />
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex h-96 w-full items-center justify-center">
          <CreateTeam />
        </div>
      )}
    </section>
  );
}
