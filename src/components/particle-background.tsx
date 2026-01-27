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
        'absolute inset-0 w-full h-full object-cover -z-10',
        className
      )}
    >
      <source src="/videofundo.mp4" type="video/mp4" />
    </video>
  );
}
