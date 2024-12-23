'use client';
import { useMediaQuery } from 'react-responsive';
import { motion, useInView } from 'framer-motion';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

export default function SlideFromRight({
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
  const ref = useRef(null);

  const inView = useInView(ref, { once: true });

  return (
    <div className={``}>
      <motion.div
        className=" "
        ref={ref}
        initial={{ opacity: 0, x: isSmallDevice ? 40 : 400 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay, duration }}
      >
        {children}
      </motion.div>
    </div>
  );
}
