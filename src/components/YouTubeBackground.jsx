import React, { useEffect, useRef } from 'react';

export default function YouTubeBackground({ isVideoActive, isMuted }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isMuted ? 'mute' : 'unMute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
    }
  }, [isMuted]);

  return (
    <div
      className="hero-video-bg"
      style={{
        opacity: isVideoActive ? 1 : 0,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* High-Resolution HD YouTube Video Iframe */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '56.25vw',
          minHeight: '100%',
          minWidth: '177.77vh',
          transform: 'translate(-50%, -50%) scale(1.08)',
          filter: 'brightness(0.6) contrast(1.05) saturate(1.05) blur(1px)'
        }}
      >
        <iframe
          ref={iframeRef}
          src="https://www.youtube.com/embed/QH-0oS0-kD4?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=QH-0oS0-kD4&controls=0&showinfo=0&rel=0&iv_load_policy=3&cc_load_policy=0&modestbranding=1&disablekb=1&playsinline=1&vq=hd1080&hd=1"
          title="AI Asia Summit 2026 HD Video Background"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            pointerEvents: 'none'
          }}
          allow="autoplay; encrypted-media"
        />
      </div>

      {/* Gradient Vignette Overlay — mutes embedded footage text/logos and keeps hero content readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(6, 9, 21, 0.55) 0%, rgba(6, 9, 21, 0.82) 70%, rgba(6, 9, 21, 0.96) 100%)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(6, 9, 21, 0.35) 0%, rgba(6, 9, 21, 0.35) 45%, rgba(6, 9, 21, 0.9) 85%, #060815 100%)'
        }}
      />
    </div>
  );
}
