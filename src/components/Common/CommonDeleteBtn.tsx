'use client';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
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
import { deleteCloudinaryImage } from '../cloudinary/upload';
import toast from 'react-hot-toast';

export default function CommonDeleteButtonV2({
  id,
  size,
  deleteAction,
  text,
  publicId,
}: {
  size?: number;
  id: string;
  deleteAction: any;
  text?: string;
  publicId?: any;
}) {
  const [pending, setPending] = useState(false);
  const pathname = usePathname();

  const handleDeleteAction = async () => {
    setPending(true);

    try {
      toast('Please Wait! Deleting...');
      const cloudRes = await deleteCloudinaryImage(publicId);
      console.log('k xa delete ko res', cloudRes);

      const res = await deleteAction(id);
      toast.promise(Promise.resolve(res), {
        loading: 'Deleting Client...',
        success: 'Deleted Client Successfully!',
        error: 'Failed to delete client!',
      });
      console.log('deletion ko res', res);

      // if (res.success) return
      setPending(false);
    } catch (err) {
      console.log('client delete error', err);
      toast.error('Error deleetion of client');
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center text-destructive">
          <Trash size={size ? size : 16} className="text-red-500" />
          <p className="cursor-pointer text-red-500">{text || ''} </p>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              job and remove the job data from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={handleDeleteAction}
                className="bg-red-600 text-sm hover:bg-red-500"
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
