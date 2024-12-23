'use client';
import Title from '@/components/Title';
import React, { useState } from 'react';
import { PlusCircle, Search, Trash, User } from 'lucide-react';
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
import AddProspects from '@/components/Forms/Prospects/AddProspects';
import { useGetAllProspects } from '@/hooks/queries/prospect.query';
import PageLoadingUI from '@/components/Common/PageLoadingUI';
import CommonDeleteButtonV2 from '@/components/Common/CommonDeleteBtn';
import { useDeleteProspect } from '@/hooks/mutations/prospect.mutation';

export default function page() {
  const { data, isLoading } = useGetAllProspects(1);
  console.log('propsec', data);
  const { mutateAsync } = useDeleteProspect();
  const [open, setOpen] = useState(false);
  if (isLoading) {
    return <PageLoadingUI />;
  }
  // const { data: allProspects } = data;

  console.log('All prospectsss', data.data);

  return (
    <section className="px-4 2xl:container sm:py-10">
      <Title title=" Prospects" />

      <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* INPUT FIELD */}
        <div className="relative w-full sm:w-[300px]">
          <Input
            placeholder="Search"
            className="rounded-xl border-primary pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-primary" />
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="self-end bg-primary text-lg text-white">
              Add Prospect
              <PlusCircle
                className="ml-2 cursor-pointer text-white"
                size={20}
              />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-auto sm:h-auto sm:max-h-max sm:max-w-[600px]">
            <DialogHeader className="">
              <DialogTitle>Add Prospects</DialogTitle>
            </DialogHeader>
            <AddProspects setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8 overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/60 text-black">
            <TableRow>
              <TableHead className="text-black">S.N</TableHead>
              <TableHead className="text-black">Name</TableHead>
              <TableHead className="text-black">Phone</TableHead>
              <TableHead className="text-black">Address</TableHead>
              <TableHead className="text-black">Email</TableHead>
              <TableHead className="text-right text-black">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {data &&
              data.data?.map((p: any, idx: number) => (
                <TableRow
                  key={idx}
                  className="font-medium text-muted-foreground hover:bg-secondary/10"
                >
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {p.FullName}
                  </TableCell>

                  <TableCell>{p.Phone}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {p.Address}
                  </TableCell>
                  <TableCell>{p.Email}</TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <Link
                      href={`/prospects/${p._id}`}
                      className="flex items-center"
                    >
                      <div className="bg-transparent text-lg text-primary">
                        <User size={20} />
                      </div>
                    </Link>
                    <CommonDeleteButtonV2
                      deleteAction={mutateAsync}
                      id={p._id}
                      publicId={p?.Avatar.PublicId || 's'}
                    />
                    {/* <Button className="bg-transparent text-lg text-red-600">
                    <Trash size={20} />
                  </Button> */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
