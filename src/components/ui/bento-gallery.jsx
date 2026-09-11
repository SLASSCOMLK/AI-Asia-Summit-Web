import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
}

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
        backgroundColor: 'rgba(6, 8, 20, 0.9)',
        backdropFilter: 'blur(16px)',
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
          maxWidth: '900px',
          width: '100%',
          backgroundColor: '#0B1530',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '1.5rem',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
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
            maxHeight: '70vh',
            objectFit: 'contain',
            borderRadius: '12px',
            marginBottom: '1rem'
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.35rem' }}>{item.title}</h3>
          {item.desc && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#94A3B8' }}>{item.desc}</p>}
        </div>
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
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>
      </motion.div>
    </motion.div>
  )
}

const InteractiveImageBentoGallery = ({ imageItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [dragConstraint, setDragConstraint] = useState(0)
  const containerRef = useRef(null)
  const gridRef = useRef(null)
  const targetRef = useRef(null)

  useEffect(() => {
    const calculateConstraints = () => {
      if (gridRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const gridWidth = gridRef.current.scrollWidth
        const newConstraint = Math.min(0, containerWidth - gridWidth - 32)
        setDragConstraint(newConstraint)
      }
    }

    calculateConstraints()
    window.addEventListener("resize", calculateConstraints)
    return () => window.removeEventListener("resize", calculateConstraints)
  }, [imageItems])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0])

  return (
    <section
      ref={targetRef}
      style={{ position: 'relative', width: '100%', padding: '1.5rem 0' }}
    >
      {(title || description) && (
        <motion.div
          style={{ opacity, y }}
          className="container mx-auto px-4 text-center"
        >
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </motion.div>
      )}

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          marginTop: '1.5rem',
          width: '100%',
          overflowX: 'auto',
          cursor: 'grab',
          paddingBottom: '1rem'
        }}
      >
        <motion.div
          style={{ width: 'max-content' }}
          drag="x"
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={0.05}
        >
          <motion.div
            ref={gridRef}
            style={{
              display: 'flex',
              gap: '1.25rem',
              padding: '0 1rem'
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {imageItems.map((item) => {
              const isFeatured = item.span && item.span.includes('col-span-2');
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: isFeatured ? '480px' : '300px',
                    height: '360px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backgroundColor: '#0B1530',
                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '1.35rem'
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setSelectedItem(item)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item)}
                  tabIndex={0}
                  aria-label={`View ${item.title}`}
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
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(6, 8, 20, 0.95) 0%, rgba(6, 8, 20, 0.4) 60%, transparent 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 10, color: '#FFFFFF' }}>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.35rem' }}>{item.title}</h3>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.4' }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
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
