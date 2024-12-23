'use client';
import React from 'react';
import Link from 'next/link';
import MobileNav from '../Navbar/MobileNav';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Notifications from '../Pages/Notifications';
import { Button } from '../ui/button';
import { useSession } from '@/providers/SessionProvider';
import ExtractUser from './ExtractUser';
import { CircleCheck, CircleX } from 'lucide-react';
import NotificationFormat from './NotificationFormat';
import MeetingAlertFormat from './MeetingAlertFormat';
import { useGetUserDetail } from '@/hooks/queries/User.query';

const Header = () => {
  const { session } = useSession();
  const { data, isLoading } = useGetUserDetail();

  const userDetail = session?.userDetail || null;
  console.log('user ko notification', data?.user?.MyRequests);
  const AllNotifications = data?.user?.MyRequests;

  return (
    <header className="relative z-50">
      <div className="bg-primary text-white">
        <div className="mx-4 flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="logo"
              width={12}
              height={12}
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
            <h2 className="text-2xl font-semibold sm:text-4xl">Avikarta</h2>
          </Link>
          <div className="flex items-center gap-4">
            {userDetail && (
              <DropdownMenu>
                <DropdownMenuTrigger className="relative outline-none">
                  <Image
                    src="/notificationbell.svg"
                    alt="search"
                    className="h-8 w-8"
                    width={12}
                    height={10}
                  />
                  <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-semibold text-primary">
                    {AllNotifications?.length}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-[300px]">
                  <DropdownMenuLabel>My Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {AllNotifications &&
                    AllNotifications.map((noti: any, idx: number) => {
                      return (
                        <DropdownMenuItem key={idx}>
                          {/* notification */}
                          <NotificationFormat noti={noti} />
                        </DropdownMenuItem>
                      );
                    })}

                  {/* <DropdownMenuItem>
                    <NotificationFormat />
                  </DropdownMenuItem> */}
                  <DropdownMenuItem>
                    {/* meeting */}
                    <MeetingAlertFormat />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {userDetail ? (
              <div>
                <ExtractUser name={userDetail.FullName} />
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant={'outline'}
                  className="border border-white bg-transparent"
                >
                  Login
                </Button>
              </Link>
            )}
            {userDetail && <MobileNav />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
