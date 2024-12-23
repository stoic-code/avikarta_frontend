'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function SingleUmbrellaAnimation() {
  const isSmallDevice = useMediaQuery({ query: '(max-width: 450px)' });
  const [isClient, setIsClient] = useState(false);

  return (
    <div>
      <div className="relative z-40 mx-auto">
        <motion.div
          initial={{
            y: isSmallDevice ? -200 : -500,
          }}
          whileInView={{
            y: 0,
          }}
          transition={{ duration: 0.4, delay: 0.4, ease: 'circInOut' }}
          className="flex flex-col items-center justify-center"
        >
          <img alt="umbrella" src="/bigUmbrella.svg" width={900} />
          <h2 className="absolute top-[35%] text-2xl font-semibold text-white sm:text-4xl md:top-60">
            Features
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
