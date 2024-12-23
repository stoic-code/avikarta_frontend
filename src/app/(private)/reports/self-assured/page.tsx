'use client';
import Title from '@/components/Title';
import React from 'react';
import { Filter } from 'lucide-react';
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
import { useGetSelfAssured } from '@/hooks/queries/reports.query';
import PageLoadingUI from '@/components/Common/PageLoadingUI';

export default function page() {
  const { data, isLoading } = useGetSelfAssured();

  if (isLoading) {
    return <PageLoadingUI />;
  }

  console.log('self assured', data);

  return (
    <section className="px-4 sm:container lg:py-10">
      <Title title="Self Assured" />

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
              <TableHead className="whitespace-nowrap text-black">
                Team Member Name
              </TableHead>
              <TableHead className="text-black">Phone No. </TableHead>
              <TableHead className="whitespace-nowrap text-black">
                Member Self Assured
              </TableHead>
              <TableHead className="whitespace-nowrap text-black">
                Total Assured
              </TableHead>
              <TableHead className="text-black">Premium</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {data &&
              data.clientData.map((c: any, idx: number) => (
                <TableRow
                  key={idx}
                  className="font-medium text-muted-foreground hover:bg-secondary/10"
                >
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {c.clientName}
                  </TableCell>

                  <TableCell>{c.phone}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {c.address}
                  </TableCell>
                  <TableCell>Rs.{c.sumAssured}</TableCell>
                  <TableCell>Rs.{c.premium}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter className="bg-transparent text-lg">
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="whitespace-nowrap">
                Rs.{data?.totalSelfAssuredAmt}
                {/* {data.clientData.totalPremiumAmount} */}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {/* {data.clientData.totalSelfAssuredAmt} */}
                Rs. {data?.totalPremiumAmount}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}
