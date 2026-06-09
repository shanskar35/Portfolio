import React, { useEffect, useRef } from 'react';

interface MatrixBgProps {
  performanceMode: boolean;
}

export const MatrixBg: React.FC<MatrixBgProps> = ({ performanceMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Characters config
    const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*+-/=<>?'.split('');
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);

    // Drop indices
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // randomize start heights to avoid synchrony
    }

    const draw = () => {
      // Semi-transparent overlay to create trails
      ctx.fillStyle = 'rgba(3, 5, 8, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#22c55e'; // Green glow matrix text
      ctx.font = `${fontSize}px var(--font-mono)`;

      for (let i = 0; i < drops.length; i++) {
        // Performance reduction: skip half the columns if performance mode is on
        if (performanceMode && i % 2 === 0) continue;

        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw character
        ctx.fillText(text, x, y);

        // Reset drops when they reach the bottom
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment drop height
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [performanceMode]);

  return <canvas ref={canvasRef} className="matrix-bg" />;
};
