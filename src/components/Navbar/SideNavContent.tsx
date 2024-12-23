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

const transition = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
};

const hoverTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
};

const variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition },
  exit: { opacity: 0, x: 10, transition },
  hover: { scale: 1.1, transition: hoverTransition },
};

export default function SideNavContent({ setOpenFun }: { setOpenFun?: any }) {
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const currentIndex = menu.findIndex((m) => pathname.includes(m.to));
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex);
    }
  }, [pathname]);

  return (
    <div className="group">
      <section className="flex h-screen w-20 flex-col items-center justify-between gap-8 bg-white py-2 text-primary transition-all duration-300 group-hover:w-64 lg:border-r-2 lg:border-primary">
        <div className="w-full gap-8 space-y-8">
          <ul className="flex w-full flex-col gap-4 px-2">
            <AnimatePresence initial={false}>
              {menu.map((m, idx) => {
                const isActive = pathname.includes(m.to);
                return (
                  <motion.li
                    className={cn(
                      'flex items-center gap-4 rounded-lg px-4 py-2 transition-all duration-300 hover:bg-secondary/30',
                      isActive ? 'rounded-lg bg-secondary' : ''
                    )}
                    key={idx}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    onClick={setOpenFun ? () => setOpenFun(false) : () => null}
                    whileHover={!isActive ? 'hover' : ''}
                  >
                    <Link
                      href={m.to}
                      className="flex w-full items-center gap-4"
                    >
                      <div className="">
                        <div
                          className={cn(
                            'relative z-30 flex items-center justify-center rounded bg-secondary p-2 text-white transition-all duration-300',
                            isActive ? 'bg-white text-primary' : ''
                          )}
                        >
                          {m.icon}
                        </div>
                      </div>
                      <span className="-translate-x-14 whitespace-nowrap font-medium text-black opacity-0 transition-all duration-300 group-hover:block group-hover:-translate-x-0 group-hover:opacity-100">
                        {m.title}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
          <div className="px-2">
            <motion.div
              className="flex items-center gap-4 rounded-lg px-4 py-2 transition-all duration-300 hover:bg-secondary/30"
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
            >
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="flex w-full items-center gap-4">
                    <div className="relative z-30 flex items-center justify-center rounded bg-secondary p-2 text-white">
                      <LogOut />
                    </div>
                    <span className="-translate-x-14 font-medium text-black opacity-0 transition-all duration-300 group-hover:-translate-x-0 group-hover:opacity-100">
                      Logout
                    </span>
                  </div>{' '}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
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
          </div>
        </div>
        <div></div>
      </section>
    </div>
  );
}
