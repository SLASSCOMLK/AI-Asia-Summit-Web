import React from 'react';

export default function LoadingScreen({ fadeOut }) {
  return (
    <div className={`loading-screen${fadeOut ? ' loading-screen-hidden' : ''}`} role="status" aria-live="polite">
      <div className="loading-content">
        <img
          src="/logo-white.png"
          alt="AI Asia Summit 2026"
          className="loading-logo"
          style={{ height: '120px', width: 'auto', opacity: 0.97 }}
        />

        <div className="honeycomb">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
