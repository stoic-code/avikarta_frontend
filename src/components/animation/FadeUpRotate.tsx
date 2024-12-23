'use client';
import { motion, useInView } from 'framer-motion';
import React, { ReactNode, useRef } from 'react';

export default function FadeUpRotate({
  children,
  height,
  delay,
}: {
  children: ReactNode;
  height?: number;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className={`h-auto w-fit overflow-hidden`}>
      <motion.div
        initial={{
          opacity: 0,
          // translateY: 40,
          y: 40,
          rotate: 20,
          transformOrigin: 'left center',
        }}
        animate={{
          opacity: inView ? 1 : 0,
          rotate: inView ? 0 : 20,
          // translateY: inView ? 0 : 40,
          y: inView ? 0 : 40,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
