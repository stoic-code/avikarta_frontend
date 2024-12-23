'use client';
import { motion, useInView } from 'framer-motion';
import React, { ReactNode, useRef } from 'react';

export default function FadeUp({
  children,
  delay = 0.1,
  height = 10,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  height?: number;
  duration?: number;
}) {
  const ref = useRef(null);

  const inView = useInView(ref, { once: true });

  return (
    <div className={`h-auto overflow-hidden`}>
      <motion.div
        className=" "
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay, duration }}
      >
        {children}
      </motion.div>
    </div>
  );
}
