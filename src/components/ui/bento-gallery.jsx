import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const ImageModal = ({ item, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(6, 8, 20, 0.92)',
        backdropFilter: 'blur(18px)',
        padding: '1.5rem'
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '960px',
          width: '100%',
          backgroundColor: '#0B1530',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          padding: '1.25rem',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img
          src={item.url}
          alt={item.title}
          style={{
            width: '100%',
            maxHeight: '78vh',
            objectFit: 'contain',
            borderRadius: '12px',
          }}
        />
        <button
          onClick={onClose}
          aria-label="Close image view"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <X size={20} />
        </button>
      </motion.div>
    </motion.div>
  )
}

const InteractiveImageBentoGallery = ({ imageItems }) => {
  const [selectedItem, setSelectedItem] = useState(null)
  const trackRef = useRef(null)
  const animFrameRef = useRef(null)
  const scrollXRef = useRef(0)
  const isPausedRef = useRef(false)
  const SPEED = 0.6 // px per frame — gentle auto-scroll speed

  // Duplicate items for seamless infinite scroll
  const doubled = [...imageItems, ...imageItems]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const animate = () => {
      if (!isPausedRef.current && track) {
        scrollXRef.current += SPEED
        // Reset once half scrolled (seamless loop)
        const halfWidth = track.scrollWidth / 2
        if (scrollXRef.current >= halfWidth) {
          scrollXRef.current = 0
        }
        track.style.transform = `translateX(-${scrollXRef.current}px)`
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  const handleMouseEnter = () => { isPausedRef.current = true }
  const handleMouseLeave = () => { isPausedRef.current = false }

  return (
    <section style={{ position: 'relative', width: '100%', padding: '1.5rem 0', overflow: 'hidden' }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: '80px',
        background: 'linear-gradient(to right, #060814, transparent)',
        zIndex: 10,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        right: 0, top: 0, bottom: 0,
        width: '80px',
        background: 'linear-gradient(to left, #060814, transparent)',
        zIndex: 10,
        pointerEvents: 'none'
      }} />

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ width: '100%', overflow: 'hidden', cursor: 'pointer' }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '1.25rem',
            padding: '0.5rem 1rem',
            width: 'max-content',
            willChange: 'transform'
          }}
        >
          {doubled.map((item, index) => {
            const isFeatured = item.span && item.span.includes('col-span-2')
            return (
              <motion.div
                key={`${item.id}-${index}`}
                whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 24px rgba(46,99,255,0.3)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => setSelectedItem(item)}
                tabIndex={0}
                aria-label={`View image ${item.title}`}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  width: isFeatured ? '480px' : '300px',
                  height: '340px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: '#0B1530',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {/* Subtle hover glow overlay only */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(6, 8, 20, 0.35) 0%, transparent 60%)',
                  pointerEvents: 'none'
                }} />
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default InteractiveImageBentoGallery
