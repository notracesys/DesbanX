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
        'absolute top-0 left-0 w-full h-full object-cover',
        className
      )}
    >
      <source src="/background-video.mp4" type="video/mp4" />
    </video>
  );
}
