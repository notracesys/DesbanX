'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ParticleBackgroundProps {
  className?: string;
}

export default function ParticleBackground({
  className,
}: ParticleBackgroundProps) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className={cn(
        'absolute left-0 h-screen w-full object-cover top-auto md:-top-[300px]',
        className
      )}
    >
      <source src="/videofundo.mp4" type="video/mp4" />
    </video>
  );
}
