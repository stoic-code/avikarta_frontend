'use client';
import Title from '@/components/Title';
import React from 'react';
import { Eye, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useGetSecondaryMemberReport } from '@/hooks/queries/reports.query';
import PageLoadingUI from '@/components/Common/PageLoadingUI';

type TMEMBER = {
  name: string;
  phone: string;
  selfAssured: number;
};

export default function page() {
  const params = useParams();
  console.log('id xa', params.id);

  const { data, isLoading } = useGetSecondaryMemberReport(params?.id);

  console.log('secondary hai', data);

  if (isLoading) {
    return <PageLoadingUI />;
  }

  return (
    <section className="px-4 sm:container sm:py-10">
      <Title title="John's Team Budget" />

      <div className="mt-10 flex justify-end gap-4">
        <Button className="flex items-center space-x-2 px-4 py-2">
          <Filter />
          <span>Filter</span>
        </Button>
      </div>

      <div className="mt-8 overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/60 text-black">
            <TableRow>
              <TableHead className="text-black">S.N</TableHead>
              <TableHead className="whitespace-nowrap text-center text-black">
                Team Member Name
              </TableHead>
              <TableHead className="text-center text-black">
                Phone No.
              </TableHead>
              <TableHead className="whitespace-nowrap text-right text-black">
                Total Sum Assured
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {data.memberTeamMember.map((m: TMEMBER, idx: number) => (
              <TableRow
                key={idx}
                className="font-medium text-muted-foreground hover:bg-secondary/10"
              >
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="whitespace-nowrap text-center">
                  {m.name}
                </TableCell>

                <TableCell className="text-center">{m.phone}</TableCell>

                <TableCell className="text-right">
                  Rs. {m.selfAssured}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-transparent text-lg">
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="whitespace-nowrap text-right">
                Rs.{' '}
                {data.memberTeamMember.reduce(
                  (total: number, m: TMEMBER) => total + Number(m.selfAssured),
                  0
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}
