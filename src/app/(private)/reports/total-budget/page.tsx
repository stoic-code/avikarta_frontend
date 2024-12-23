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
import { usePathname } from 'next/navigation';
import { useGetPrimaryMemberReport } from '@/hooks/queries/reports.query';
import PageLoadingUI from '@/components/Common/PageLoadingUI';

type TMEMBER = {
  name: string;
  phone: string;
  selfAssured: number;
};

export default function page() {
  const pathname = usePathname();
  const { data, isLoading } = useGetPrimaryMemberReport();

  if (isLoading) {
    return <PageLoadingUI />;
  }

  console.log('primary member', data);

  return (
    <section className="px-4 sm:container sm:py-10">
      <Title title="Total Budget" />

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
              <TableHead className="whitespace-nowrap text-right text-black">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {data &&
              data.primaryMembers.map((m: TMEMBER, idx: number) => (
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
                  <TableCell className="text-end">
                    <Link
                      href={`${pathname}/${m.phone}`}
                      className="flex items-center justify-end"
                    >
                      <Eye size={20} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter className="bg-transparent text-lg">
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell colSpan={1} className="whitespace-nowrap text-right">
                Rs.{' '}
                {data?.primaryMembers.reduce((total: any, m: any) => {
                  return total + Number(m.selfAssured);
                }, 0)}
              </TableCell>
              <TableCell colSpan={1}></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}
