'use client';
import Title from '@/components/Title';
import React from 'react';
import { PlusCircle, Search, Trash, User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useGetAllClients } from '@/hooks/queries/client.query';
import PageLoadingUI from '@/components/Common/PageLoadingUI';
import { deleteCloudinaryImage } from '@/components/cloudinary/upload';
import CommonDeleteButtonV2 from '@/components/Common/CommonDeleteBtn';
import { useDeleteClient } from '@/hooks/mutations/client.mutation';

export default function page() {
  const { data, isLoading } = useGetAllClients(1);
  const { mutateAsync } = useDeleteClient();
  console.log('data aayo tw?');
  if (isLoading) {
    return <PageLoadingUI />;
  }

  console.log('all clients', data);

  return (
    <section className="px-4 2xl:container lg:py-10">
      <Title title="My Clients" />

      <div className="mt-10 flex flex-col justify-between gap-4 sm:flex-row">
        <div className="relative">
          <Input
            placeholder="Search"
            className="rounded-xl border-primary pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-primary" />
        </div>
        <Link href={`/my-clients/add`} className="self-end">
          <Button className="bg-primary text-lg text-white">
            Add Client
            <PlusCircle className="ml-2 cursor-pointer text-white" size={20} />
          </Button>
        </Link>
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
              data.data?.map((c: any, idx: number) => (
                <TableRow
                  key={c._id}
                  className="font-medium text-muted-foreground hover:bg-secondary/10"
                >
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {c.FullName}
                  </TableCell>
                  <TableCell>{c.Phone}</TableCell>
                  <TableCell className="whitespace-nowrap capitalize">
                    {c.District}
                  </TableCell>
                  <TableCell>{c.Email}</TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/my-clients/${c._id}`}
                        className="flex items-center"
                      >
                        <div className="bg-transparent text-lg text-primary">
                          <User size={20} />
                        </div>
                      </Link>

                      <CommonDeleteButtonV2
                        deleteAction={mutateAsync}
                        id={c._id}
                        publicId={c?.Avatar?.PublicId || ''}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
