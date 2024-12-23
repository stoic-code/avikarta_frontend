'use client';
import { motion, useInView } from 'framer-motion';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function SlideFromLeft({
  children,
  delay = 0.1,
  height,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  height?: number;
  duration?: number;
}) {
  const isSmallDevice = useMediaQuery({ query: '(max-width: 450px)' });
  //   const isSmallDevice = useMediaQuery('only screen and (max-width: 400px)');
  const ref = useRef(null);

  const inView = useInView(ref, { once: true });
  console.log('isSmallDevice:', isSmallDevice);
  console.log('inView:', inView);

  return (
    <div className={``}>
      <motion.div
        className=" "
        ref={ref}
        initial={{ opacity: 0, x: isSmallDevice ? -40 : -400 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay, duration }}
      >
        {children}
      </motion.div>
    </div>
  );
}
