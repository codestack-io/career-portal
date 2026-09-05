'use client';

import { motion } from 'framer-motion';

export default function ScrollAnimate({ children, direction = 'left', delay = 0 }) {
  const xOffset = direction === 'left' ? -60 : 60;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}