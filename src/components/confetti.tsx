'use client';

import { useEffect, useState } from 'react';

const ConfettiPiece = ({ id, style }: { id: number; style: React.CSSProperties }) => (
  <div
    style={style}
    className="absolute top-[-10px] h-3 w-1.5 animate-[fall_5s_linear_infinite]"
  ></div>
);

const Confetti = () => {
  const [pieces, setPieces] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 150 }).map((_, index) => {
      const colors = ['#FF8C00', '#8B0000', '#FFFFFF', '#FFD700'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return {
        id: index,
        style: {
          left: `${Math.random() * 100}%`,
          backgroundColor: randomColor,
          transform: `rotate(${Math.random() * 360}deg)`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
        },
      };
    });
    setPieces(newPieces);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map(p => (
        <ConfettiPiece key={p.id} {...p} />
      ))}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
