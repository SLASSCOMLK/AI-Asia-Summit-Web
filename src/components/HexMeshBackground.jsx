import React, { useEffect, useRef } from 'react';

export default function HexMeshBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for parallax glow
    let mouse = { x: width / 2, y: height / 2 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Hexagon parameters
    const hexRadius = 45;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;
    let time = 0;

    const drawHexagon = (x, y, radius, alpha, isHighlighted) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + radius * Math.cos(angle);
        const hy = y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();

      if (isHighlighted) {
        ctx.strokeStyle = `rgba(46, 99, 255, ${alpha * 0.9})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(46, 99, 255, 0.8)';
        ctx.shadowBlur = 10;
      } else {
        ctx.strokeStyle = `rgba(30, 58, 138, ${alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
    };

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep dark background gradient
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, Math.max(width, height)
      );
      bgGradient.addColorStop(0, '#0E1738');
      bgGradient.addColorStop(0.5, '#070C1E');
      bgGradient.addColorStop(1, '#04060F');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Ambient glowing core
      const glowGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 450
      );
      glowGrad.addColorStop(0, 'rgba(46, 99, 255, 0.18)');
      glowGrad.addColorStop(0.5, 'rgba(147, 197, 253, 0.05)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Hexagonal Grid Loop
      const columns = Math.ceil(width / hexWidth) + 2;
      const rows = Math.ceil(height / (hexHeight * 0.75)) + 2;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < columns; c++) {
          let x = c * hexWidth;
          let y = r * hexHeight * 0.75;

          if (r % 2 !== 0) {
            x += hexWidth / 2;
          }

          // Distance to mouse for interactive highlight
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const wave = Math.sin(time + (x * 0.005) + (y * 0.005));
          const alpha = Math.max(0.1, 0.25 + wave * 0.15);
          const isHighlighted = dist < 220;

          drawHexagon(x, y, hexRadius, isHighlighted ? Math.min(1, alpha + 0.5) : alpha, isHighlighted);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
