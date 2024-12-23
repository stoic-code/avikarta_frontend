'use client';
import {
  ChevronDownCircle,
  ChevronLeftCircle,
  ChevronRightCircle,
  MoveLeft,
  MoveRight,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@uidotdev/usehooks';
const data = [
  {
    id: 1,
    title: 'Step 1:',
    desc: 'Register and Create Your Profile',
    photo: '/home/how/step1.svg',
  },
  {
    id: 2,
    title: 'Step 2:',
    desc: 'Add Your Team Members',
    photo: '/home/how/step2.svg',
  },
  {
    id: 3,
    title: 'Step 3:',
    desc: 'Manage Clients and Prospects',
    photo: '/home/how/step3.svg',
  },
  {
    id: 4,
    title: 'Step 4:',
    desc: 'Track Performance and Set Reminders',
    photo: '/home/how/step4.svg',
  },
  {
    id: 5,
    title: 'Step 5:',
    desc: 'Generate Comprehensive Reports',
    photo: '/home/how/step5.svg',
  },
];

export default function HowItWorks() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isSmallDevice = useMediaQuery('only screen and (max-width : 720px)');
  console.log('is sjamall', isSmallDevice);

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % 5);
  }
  function handlePrev() {
    setCurrentIndex((prev) => (prev - 1 + 5) % 5);
  }
  return (
    <div>
      <section className="relative mx-auto mt-10 flex h-[400px] max-w-6xl flex-col items-center justify-center gap-8 rounded-2xl border bg-white p-4 text-center shadow-md sm:h-[500px] sm:p-8">
        <div
          onClick={handleNext}
          className="absolute right-4 top-[50%] flex cursor-pointer items-center gap-2 text-xl font-semibold text-muted-foreground"
        >
          <span className={`${isSmallDevice ? 'hidden' : 'block'}`}>
            Next Step{' '}
          </span>
          <ChevronRightCircle
            size={30}
            className={`text-primary ${isSmallDevice ? 'block' : 'hidden'}`}
          />
          <MoveRight
            className={`${isSmallDevice ? 'hidden' : 'block'}`}
            size={16}
          />
        </div>
        <div
          onClick={handlePrev}
          className="absolute left-4 top-[50%] flex cursor-pointer items-center gap-2 text-xl font-semibold text-muted-foreground"
        >
          <ChevronLeftCircle
            size={30}
            className={`text-primary ${isSmallDevice ? 'block' : 'hidden'}`}
          />
          <MoveLeft
            className={`${isSmallDevice ? 'hidden' : 'block'}`}
            size={16}
          />{' '}
          <span className={`${isSmallDevice ? 'hidden' : 'block'}`}>
            Prev Step
          </span>
        </div>
        <AnimatePresence mode="wait">
          {data.map((d, idx) => {
            if (currentIndex === idx) {
              return (
                <motion.div
                  key={idx}
                  className="flex h-full flex-col justify-between gap-8"
                >
                  <div className="">
                    <h2 className="text-3xl font-semibold">{d.title}</h2>
                    <p className="text-lg">&quot;{d.desc}&quot;</p>
                  </div>
                  <motion.div
                    key={idx}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    className="flex-1"
                  >
                    <img
                      src={d.photo}
                      alt="step1"
                      width={400}
                      height={400}
                      className="w-[90%]"
                    />
                  </motion.div>
                </motion.div>
              );
            }
          })}
        </AnimatePresence>
      </section>
    </div>
  );
}
