import React, { useState, useEffect } from 'react';

export default function TransparentLogo({ src = "/logo.png", alt = "AI ASIA SUMMIT 2026", className = "", style = {} }) {
  const [processedSrc, setProcessedSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Loop through all pixels and convert white/light grey background to 100% transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // If pixel is near white/light grey, make it transparent
        if (r > 215 && g > 215 && b > 215) {
          data[i + 3] = 0; // Alpha = 0
        } else {
          // If dark text (like dark navy SLASSCOM text), brighten slightly for dark background pop
          if (r < 60 && g < 80 && b < 120) {
            data[i] = Math.min(255, r + 160);
            data[i + 1] = Math.min(255, g + 180);
            data[i + 2] = 255; // Crisp glowing blue/white highlight on dark background
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedSrc(canvas.toDataURL("image/png"));
    };

    img.onerror = () => {
      setProcessedSrc(src);
    };
  }, [src]);

  return (
    <img 
      src={processedSrc || src} 
      alt={alt} 
      className={className}
      style={{
        display: 'inline-block',
        objectFit: 'contain',
        filter: 'drop-shadow(0 4px 16px rgba(0, 163, 224, 0.4))',
        ...style
      }} 
    />
  );
}
