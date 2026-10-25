import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Video, ChevronLeft, ChevronRight } from 'lucide-react';
import './VideosSection.css';

// ─── Swap in your own links / IDs here ─────────────────────────────────────────
const VIDEOS = [
  {
    id: 'qXswo2cR8RU',
    url: 'https://www.youtube.com/watch?v=qXswo2cR8RU&t=87s',
    start: 87,
    title: 'AI The Multiplier: Enterprise ROI',
  },
  {
    id: 'mnlbIQmNfYQ',
    url: 'https://www.youtube.com/live/mnlbIQmNfYQ?si=F41PGjHHlt7OCqfI',
    title: 'AI in Action: Industry Transformation',
    speaker: 'Executive Interview • Newsfirst',
  },
  {
    id: 'QH-0oS0-kD4',
    url: 'https://youtu.be/QH-0oS0-kD4?si=nynTCQPGne-PXgxv',
    title: 'Summit Highlights & Retrospective',
  },
];

/**
 * Loads the YouTube IFrame API script safely once
 */
function loadYouTubeApi() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return;
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }
    const existing = document.querySelector('script[src*="youtube.com/iframe_api"]');
    if (!existing) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.head.appendChild(tag);
    }
    const previousHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousHandler === 'function') previousHandler();
      resolve(window.YT);
    };
    const pollInterval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(pollInterval);
        resolve(window.YT);
      }
    }, 100);
  });
}

export default function VideosSection() {
  const [centeredIndex, setCenteredIndex] = useState(0);
  const centeredIndexRef = useRef(0);

  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);

  const playersRef = useRef([]);
  const isSectionVisibleRef = useRef(false);

  // Mouse Drag state
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollLeftRef = useRef(0);
  const dragMovedRef = useRef(false);

  centeredIndexRef.current = centeredIndex;

  // Sync playback across players: play centered (muted), pause all others
  const syncPlayback = useCallback((activeIndex) => {
    if (!isSectionVisibleRef.current) return;
    playersRef.current.forEach((player, i) => {
      if (!player || typeof player.playVideo !== 'function') return;
      try {
        if (i === activeIndex) {
          player.mute();
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      } catch {
        // Player might be re-initializing or buffering
      }
    });
  }, []);

  // Detect which card is closest to the carousel container's center (for mobile swipe)
  const checkCenter = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;

    // In desktop grid mode where cards fit without scrolling, do not auto-override centeredIndex
    if (container.scrollWidth <= container.clientWidth + 20) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    if (closestIdx !== centeredIndexRef.current) {
      setCenteredIndex(closestIdx);
      centeredIndexRef.current = closestIdx;
      syncPlayback(closestIdx);
    }
  }, [syncPlayback]);

  // Scroll / select a specific card
  const scrollToIndex = useCallback((index) => {
    setCenteredIndex(index);
    centeredIndexRef.current = index;
    syncPlayback(index);

    const container = carouselRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    // Only scroll if container is actually scrollable (i.e. mobile / tablet carousel mode)
    if (container.scrollWidth > container.clientWidth + 20) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const targetScrollLeft =
        container.scrollLeft +
        (cardRect.left + cardRect.width / 2) -
        (containerRect.left + containerRect.width / 2);

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  }, [syncPlayback]);

  // Handle card click
  const handleCardClick = (index) => {
    if (dragMovedRef.current) return;
    scrollToIndex(index);
  };

  // Initialize YouTube Players when API is ready
  useEffect(() => {
    let isCancelled = false;

    loadYouTubeApi().then((YT) => {
      if (isCancelled || !YT) return;

      VIDEOS.forEach((video, idx) => {
        const playerId = `vc-yt-iframe-${idx}`;
        const container = document.getElementById(playerId);
        if (!container) return;

        try {
          new YT.Player(playerId, {
            videoId: video.id,
            playerVars: {
              autoplay: 0,
              mute: 1,
              playsinline: 1,
              controls: 1,
              rel: 0,
              modestbranding: 1,
              enablejsapi: 1,
              ...(video.start ? { start: video.start } : {}),
              origin: typeof window !== 'undefined' ? window.location.origin : undefined,
            },
            events: {
              onReady: (event) => {
                if (isCancelled) return;
                playersRef.current[idx] = event.target;
                try {
                  event.target.mute();
                } catch {
                  // Ignore
                }

                if (centeredIndexRef.current === idx && isSectionVisibleRef.current) {
                  try {
                    event.target.playVideo();
                  } catch {
                    // Ignore
                  }
                }
              },
            },
          });
        } catch {
          // Ignore
        }
      });
    });

    return () => {
      isCancelled = true;
      playersRef.current.forEach((player) => {
        try {
          if (player && typeof player.destroy === 'function') {
            player.destroy();
          }
        } catch {
          // Ignore
        }
      });
      playersRef.current = [];
    };
  }, []);

  // Section visibility observer: only play when section is in viewport
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        isSectionVisibleRef.current = isVisible;
        if (isVisible) {
          syncPlayback(centeredIndexRef.current);
        } else {
          playersRef.current.forEach((p) => {
            try {
              if (p && typeof p.pauseVideo === 'function') p.pauseVideo();
            } catch {
              // Ignore
            }
          });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [syncPlayback]);

  // Scroll & Resize listener for center detection
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return undefined;

    let rafId = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        checkCenter();
      });
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Initial check after layout renders
    const initialTimer = setTimeout(() => {
      checkCenter();
    }, 200);

    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(initialTimer);
    };
  }, [checkCenter]);

  // Click-and-drag mouse support
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return undefined;

    const handleMouseDown = (e) => {
      if (e.target.closest('.vc-youtube-btn') || e.target.closest('.vc-nav-btn') || e.target.closest('.vc-dot')) {
        return;
      }
      isDraggingRef.current = true;
      dragStartXRef.current = e.pageX;
      dragScrollLeftRef.current = container.scrollLeft;
      dragMovedRef.current = false;
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.pageX - dragStartXRef.current;
      if (Math.abs(dx) > 4) {
        if (!dragMovedRef.current) {
          dragMovedRef.current = true;
          container.classList.add('vc-is-dragging');
        }
        e.preventDefault();
        container.scrollLeft = dragScrollLeftRef.current - dx;
      }
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      container.classList.remove('vc-is-dragging');
      setTimeout(() => {
        dragMovedRef.current = false;
      }, 60);
      checkCenter();
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [checkCenter]);

  return (
    <section className="vc-section" id="videos" ref={sectionRef}>
      <div className="container">
        <div className="vc-header">
          <div className="vc-badge">
            <Video size={14} style={{ color: '#E8B84B' }} />
            <span>FEATURED SESSIONS • VIDEO HIGHLIGHTS</span>
          </div>
          <h2 className="vc-title">
            <span className="hero-gradient-text">The AI Spotlight</span>
          </h2>
          <p className="vc-subtitle">
            Explore inspiring insights and perspectives from across the AI ecosystem.
          </p>
        </div>
      </div>

      <div className="vc-carousel-wrapper">
        <div className="vc-carousel" ref={carouselRef}>
          {VIDEOS.map((video, idx) => {
            const isCentered = idx === centeredIndex;
            return (
              <div
                key={video.id + '-' + idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`vc-card ${isCentered ? 'vc-card-centered' : 'vc-card-side'}`}
                tabIndex={0}
                role="group"
                aria-label={`Video ${idx + 1} of ${VIDEOS.length}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(idx);
                  }
                }}
              >
                {/* Top-Left Session Pill Badge */}
                <div className="vc-session-badge">
                  <span className="vc-session-dot" />
                  <span>{video.tag}</span>
                </div>

                {/* Top-Right YouTube External Link Button */}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vc-youtube-btn"
                  aria-label={`Open YouTube video in new tab (ID: ${video.id})`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    className="vc-youtube-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YouTube</span>
                </a>

                {/* Side Card Click-Catcher with hover play prompt */}
                {!isCentered && (
                  <button
                    type="button"
                    className="vc-card-click-catcher"
                    onClick={() => handleCardClick(idx)}
                    aria-label={`Play ${video.tag}: ${video.title}`}
                  >
                    <div className="vc-play-hover-indicator">
                      <div className="vc-play-icon-circle">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="vc-play-hover-text">Click to Play</span>
                    </div>
                  </button>
                )}

                {/* YouTube iframe container with instant poster preview */}
                <div
                  className="vc-player-frame-wrapper"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${video.id}/hqdefault.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div id={`vc-yt-iframe-${idx}`} />
                </div>

                {/* Bottom Overlay Session Information */}
                <div className="vc-card-overlay-info">
                  <span className="vc-card-speaker-label">{video.speaker}</span>
                  <h3 className="vc-card-title-label">{video.title}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls (Prev / Next & Dots) */}
        <div className="vc-controls-bar">
          <button
            type="button"
            className="vc-nav-btn"
            onClick={() => scrollToIndex(Math.max(0, centeredIndex - 1))}
            disabled={centeredIndex === 0}
            aria-label="Previous video"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="vc-dots-wrapper">
            {VIDEOS.map((_, dotIdx) => (
              <button
                key={'dot-' + dotIdx}
                type="button"
                className={`vc-dot ${dotIdx === centeredIndex ? 'vc-dot-active' : ''}`}
                onClick={() => scrollToIndex(dotIdx)}
                aria-label={`Go to video ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="vc-nav-btn"
            onClick={() => scrollToIndex(Math.min(VIDEOS.length - 1, centeredIndex + 1))}
            disabled={centeredIndex === VIDEOS.length - 1}
            aria-label="Next video"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
