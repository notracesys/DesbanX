'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ParticleBackgroundProps {
  className?: string;
  particleColor?: string;
  particleCount?: number;
}

export default function ParticleBackground({
  className,
  particleColor = 'rgba(220, 38, 38, 0.7)',
  particleCount = 150,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    if (!container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const setCanvasDimensions = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 200; // Start below the screen
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = Math.random() * 1 + 0.2;
        this.opacity = Math.random() * 0.6 + 0.1;
      }

      update() {
        this.y -= this.speedY;
        if (this.y < -this.size) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        const colorParts = particleColor.match(/(\d+)/g);
        if (colorParts && colorParts.length >= 3) {
            const [r, g, b] = colorParts;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        } else {
            ctx.fillStyle = particleColor;
        }
        
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setCanvasDimensions();
      init();
    };

    setCanvasDimensions();
    init();
    animate();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.unobserve(container);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleColor, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute top-0 left-0 w-full h-full', className)}
    />
  );
}
