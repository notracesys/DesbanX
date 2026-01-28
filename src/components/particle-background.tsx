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
    <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={cn(
            'absolute left-0 h-screen w-full object-cover top-[-270px] md:top-[-270px]',
            className
          )}
        >
          <source src="/videofundo.mp4" type="video/mp4" />
        </video>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}
