'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';

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

export default function HomeCarousel() {
  return (
    <div className="mx-auto mt-8 flex max-w-6xl items-center justify-center rounded-2xl bg-white shadow-lg">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{ loop: true }}
        className="mx-auto w-full max-w-xl"
      >
        <CarouselContent>
          {data.map((d, idx) => {
            return (
              <CarouselItem key={idx}>
                <div
                  key={idx}
                  className="flex h-full flex-col items-center justify-between gap-8 py-8"
                >
                  <div className="w-full px-4">
                    <h2 className="text-3xl font-semibold">{d.title}</h2>
                    <p className="text-lg">&quot;{d.desc}&quot;</p>
                  </div>
                  <div key={idx} className="flex-1">
                    <img
                      src={d.photo}
                      alt="step1"
                      width={400}
                      height={400}
                      className="w-[90%]"
                    />
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
