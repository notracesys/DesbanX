'use client';

import React, { useState, useEffect } from 'react';

const NUM_PARTICLES = 100;

export default function ParticleBackground() {
  const [particles, setParticles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: NUM_PARTICLES }).map(() => ({
      position: 'absolute',
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      width: `${Math.random() * 2 + 0.5}px`,
      height: `${Math.random() * 2 + 0.5}px`,
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
      borderRadius: '50%',
      animation: `rise ${Math.random() * 5 + 5}s linear infinite`,
      animationDelay: `-${Math.random() * 10}s`,
    }));
    setParticles(newParticles as React.CSSProperties[]);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-background">
        {particles.map((style, index) => (
          <div key={index} style={style} />
        ))}
    </div>
  );
}
