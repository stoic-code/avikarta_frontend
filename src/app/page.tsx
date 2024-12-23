'use client';
import { Button } from '@/components/ui/button';
import { FaViber, FaWhatsapp } from 'react-icons/fa6';
import {
  LucideFacebook,
  Mail,
  MapPin,
  MoveRightIcon,
  Phone,
} from 'lucide-react';
// import HowItWorks from '@/components/home/HowItWorks';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import HomeCarousel from '@/components/home/HomeCarousel';
import { motion } from 'framer-motion';
import FadeUpRotate from '@/components/animation/FadeUpRotate';
import FadeUp from '@/components/animation/FadeUp';
import SlideFromLeft from '@/components/animation/SlideFromLeft';
import SlideFromRight from '@/components/animation/SlideFromRight';
const SingleUmbrellaAnimation = dynamic(
  () => import('@/components/animation/SingleUmbrellaAnimation'),
  { ssr: false }
);

//dynamically imported coz it uses hoooks in the component
const HowItWorks = dynamic(() => import('@/components/home/HowItWorks'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-20">
      {/* 1ST PART */}
      <section className="flex min-h-screen">
        <div className="relative flex w-full flex-col items-center justify-between gap-8 pt-20 lg:flex-row lg:pt-0">
          {/* rounded ball */}
          <div className="absolute -left-[30%] top-4 z-20 h-80 w-80 rounded-full bg-gradient-to-t from-white to-gray-100 shadow-2xl md:-left-[20%] lg:-left-[20%] lg:top-[50%] lg:h-[600px] lg:w-[600px] lg:-translate-y-[57%]"></div>

          <div className="relative z-40 px-4 md:px-8">
            <FadeUpRotate>
              <div className="text-2xl font-bold tracking-wide md:text-5xl">
                Empower Your Insurance Team with{' '}
                <span className="inline-block text-primary sm:hidden">
                  Avikarta
                </span>
              </div>
            </FadeUpRotate>

            {/* this one is for big screen */}
            <FadeUpRotate delay={0.2}>
              <h2 className="hidden py-2 text-2xl font-bold tracking-wide text-primary sm:block md:text-5xl">
                Avikarta
              </h2>
            </FadeUpRotate>
            <FadeUpRotate delay={0.4}>
              <p className="mt-4 text-sm tracking-wide md:text-lg">
                Track, manage, and grow your insurance business effortlessly.
              </p>
            </FadeUpRotate>
            <FadeUpRotate delay={0.6}>
              <Button asChild>
                <Link
                  href={'/register'}
                  className="mt-10 flex items-center gap-2 lg:mt-20"
                >
                  Get Started Today <MoveRightIcon />{' '}
                </Link>
              </Button>
            </FadeUpRotate>
          </div>

          <div className="relative -translate-y-10 sm:-translate-y-0">
            <FadeUp>
              <div>
                <img
                  width={500}
                  src="/peopleUnderUmbrella.svg"
                  alt="umbrella"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2ND PART FEATURES */}
      <div className="relative overflow-hidden px-4">
        {/* rounded ball */}
        <div className="absolute -right-[30%] top-4 z-10 h-80 w-80 rounded-full bg-gradient-to-t from-white to-gray-100 shadow-2xl md:-right-[20%] lg:-right-[20%] lg:top-[30%] lg:h-[600px] lg:w-[600px] lg:-translate-y-[57%]"></div>

        {/* SINGLE UMBRELLA */}
        <SingleUmbrellaAnimation />
        <section className="relative z-20 mt-20 2xl:container">
          {/* 1ST ROW */}
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between sm:flex-row">
            {/* 1st */}
            <SlideFromLeft>
              <div className="flex max-w-[400px] flex-col items-center gap-2 p-4 text-center">
                <img src="/home/team.svg" alt="team" width={80} />
                <h2 className="text-xl font-semibold">Team Management</h2>
                <p className="text-sm text-muted-foreground">
                  Easily add and manage your team members. View your team’s
                  performance at a glance.
                </p>
              </div>
            </SlideFromLeft>
            {/* 2nd */}
            <SlideFromRight>
              <div className="flex max-w-[400px] flex-col items-center gap-2 p-4 text-center">
                <img src="/home/client.svg" alt="team" width={80} />
                <h2 className="text-xl font-semibold">
                  Client and Prospect Management
                </h2>
                <p className="text-sm text-muted-foreground">
                  Keep detailed records of clients and prospects. Track
                  insurance details and potential leads.
                </p>
              </div>
            </SlideFromRight>
          </div>
          {/* 2ND ROW */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between sm:flex-row">
            {/* 3rd */}
            <SlideFromLeft delay={0.2}>
              <div className="flex max-w-[400px] flex-col items-center gap-2 p-4 text-center">
                <img src="/home/report.svg" alt="team" width={80} />
                <h2 className="text-xl font-semibold">Report Generation</h2>
                <p className="text-sm text-muted-foreground">
                  Easily add and manage your team members. View your team’s
                  performance at a glance.
                </p>
              </div>
            </SlideFromLeft>

            {/* 4th */}
            <SlideFromRight delay={0.2}>
              <div className="flex max-w-[400px] flex-col items-center gap-2 p-4 text-center">
                <img src="/home/reminder.svg" alt="team" width={80} />
                <h2 className="text-xl font-semibold">Reminders</h2>
                <p className="text-sm text-muted-foreground">
                  Easily add and manage your team members. View your team’s
                  performance at a glance.
                </p>
              </div>
            </SlideFromRight>
          </div>
        </section>
      </div>

      {/* 3RD PART Animation */}
      <div className="relative">
        {/* rounded ball */}
        <div className="absolute -left-[30%] top-4 z-10 hidden h-80 w-80 rounded-full bg-gradient-to-b from-white to-gray-100 shadow-2xl md:-left-[20%] md:block lg:-left-[20%] lg:top-[20%] lg:h-[600px] lg:w-[600px] lg:-translate-y-[57%]"></div>
        <h2 className="text-center text-2xl font-semibold sm:text-4xl">
          How It Works
        </h2>
        <div className="relative z-20 px-4">
          <HomeCarousel />
        </div>
      </div>
      {/* 4th PART  */}
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 px-2 text-center">
        <FadeUpRotate delay={0.2}>
          <h2 className="text-center text-2xl font-semibold sm:text-4xl">
            Embrace the future of Insurance Solutions
          </h2>
        </FadeUpRotate>
        <FadeUpRotate delay={0.4}>
          <p className="text-sm text-muted-foreground">
            Experience seamless client and prospect management with Avikarta!
            Join us today and revolutionize how you handle your insurance
            operations. With Avikarta, you’re not just adapting to industry
            standards – you’re setting them.
          </p>
        </FadeUpRotate>
        <FadeUpRotate delay={0.6}>
          <Button asChild className="flex items-center gap-2">
            <Link href={'/register'}>
              Get Started Today <MoveRightIcon size={16} />{' '}
            </Link>
          </Button>
        </FadeUpRotate>
      </div>

      <footer className="bg-primary py-12">
        <section className="mx-auto grid w-full grid-cols-2 gap-6 p-4 px-4 text-white 2xl:container lg:grid-cols-4 lg:place-items-center">
          {/* COMPANY INFO CONTANCT */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold sm:text-2xl">Avikarta</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm sm:text-base">
                <MapPin className="flex-shrink-0" size={16} />
                Imadol, Lalitpur
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base">
                <Phone className="flex-shrink-0" size={16} />
                9898989898
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base">
                <Mail className="flex-shrink-0" size={16} />
                avikarta@gmail.com
              </li>
            </ul>
          </div>
          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold sm:text-2xl">Quick Links</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-1 text-sm sm:text-base">
                Anout Us
              </li>
              <li className="flex items-center gap-1 text-sm sm:text-base">
                Contact Us
              </li>
            </ul>
          </div>
          {/* TERMS AND CONDITIONS */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold sm:text-2xl">
              Terms & Conditions
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-1 text-sm sm:text-base">
                Privacy & Policy{' '}
              </li>
              <li className="flex items-center gap-1 text-sm sm:text-base">
                Terms & Services
              </li>
            </ul>
          </div>

          {/* SOCIAL MEDIA */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold sm:text-2xl">Follow Us</h2>
            <ul className="flex items-center gap-4">
              <li>
                <a
                  href="https://www.facebook.com/metalogicsoftware"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LucideFacebook size={25} />
                </a>
              </li>
              <li>
                <a href="whatsapp://send?phone=9851353599">
                  <FaWhatsapp size={25} />
                </a>
              </li>
              <li>
                <a href="viber://contact?number=9851353599">
                  <FaViber size={25} />
                </a>
              </li>
            </ul>
          </div>
        </section>
        <div className="mt-8 2xl:container">
          <hr className="h-[1px] w-full bg-white" />
          <p className="mt-8 text-center text-white">
            © Copyright 2023 MetaLogic Software Pvt. Ltd All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
