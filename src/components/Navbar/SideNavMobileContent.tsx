'use client';
import { cn } from '@/lib/utils';
import {
  LogOut,
  PieChart,
  Settings,
  UserPlus,
  FileDown,
  User,
  Users2,
  ClipboardEdit,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { deleteSession } from '@/lib/lib';

const menu = [
  {
    title: 'Dashboard',
    to: '/dashboard',
    icon: <PieChart />,
  },
  {
    title: 'My Clients',
    to: '/my-clients',
    icon: <User />,
  },
  {
    title: 'Prospects',
    to: '/prospects',
    icon: <UserPlus />,
  },
  {
    title: 'My Team',
    to: '/my-teams',
    icon: <Users2 />,
  },
  {
    title: 'Reports',
    to: '/reports',
    icon: <ClipboardEdit />,
  },
  {
    title: 'Settings',
    to: '/settings',
    icon: <Settings />,
  },
  {
    title: 'Download',
    to: '/download',
    icon: <FileDown />,
  },
  // {
  //   title: 'Settings',
  //   to: '/settings',
  //   icon: <Settings />,
  // },
];

export default function SideNavMobileContent({
  setOpenFun,
}: {
  setOpenFun?: any;
}) {
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const currentIndex = menu.findIndex((m) => pathname.includes(m.to));
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex);
    }
  }, [pathname]);

  return (
    <div className="">
      <section className="flex h-screen w-full flex-col items-center gap-8 py-2 text-primary transition-all duration-300 lg:border-r-2 lg:border-primary">
        <ul className="flex w-full flex-col justify-center gap-8 px-2">
          {menu.map((m, idx) => {
            const isActive = pathname.includes(m.to);
            return (
              <motion.li
                className={cn('')}
                key={idx}
                onClick={setOpenFun ? () => setOpenFun(false) : () => null}
              >
                <Link
                  href={m.to}
                  className={`${isActive && 'ml-4 rounded-lg bg-secondary p-2 px-4'} flex w-full items-center gap-4`}
                >
                  <div
                    className={cn(
                      'relative z-30 flex items-center justify-center rounded bg-secondary p-2 text-white transition-all duration-300',
                      isActive ? 'bg-secondary text-white' : ''
                    )}
                  >
                    {m.icon}
                  </div>
                  <span
                    className={`whitespace-nowrap text-lg font-medium ${isActive ? 'text-white' : 'text-black'} text-black`}
                  >
                    {m.title}
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
        <motion.div className="flex w-full items-center gap-4 rounded-lg px-2 py-2 transition-all duration-300 hover:bg-secondary/30">
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="flex w-full items-center gap-4">
                <div className="relative z-30 flex items-center justify-center rounded bg-secondary p-2 text-white">
                  <LogOut />
                </div>
                <span className="font-medium text-black">Logout</span>
              </div>{' '}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteSession()}
                  className="text-sm"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>
      </section>
    </div>
  );
}
