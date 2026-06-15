'use client';

import React from 'react';
import { motion } from 'motion/react';

export const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

type FadeInSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section';
  id?: string;
};

export function FadeInSection({
  children,
  className = '',
  delay = 0,
  as = 'div',
  id,
}: FadeInSectionProps) {
  const shared = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.6, delay, ease: PREMIUM_EASE },
    className,
    id,
  };

  if (as === 'section') {
    return <motion.section {...shared}>{children}</motion.section>;
  }

  return <motion.div {...shared}>{children}</motion.div>;
}

type FadeInItemProps = {
  children: React.ReactNode;
  className?: string;
  index?: number;
};

export function FadeInItem({ children, className = '', index = 0 }: FadeInItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.5, delay: index * 0.055, ease: PREMIUM_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
