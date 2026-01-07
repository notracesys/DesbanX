'use client';

import { useEffect, useState } from 'react';

const ConfettiPiece = ({ id, style }: { id: number, style: React.CSSProperties }) => (
  <div
    key={id}
    className="confetti-piece"
    style={style}
  />
);

export default function Confetti() {
  const [pieces, setPieces] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const confettiColors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const newPieces = [];
    const count = 50; 

    for (let i = 0; i < count; i++) {
      const style: React.CSSProperties = {
        left: `${Math.random() * 100}vw`,
        backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        animationDelay: `${Math.random() * 2}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      };
      newPieces.push(<ConfettiPiece key={i} id={i} style={style} />);
    }

    setPieces(newPieces);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
      {pieces}
    </div>
  );
}
