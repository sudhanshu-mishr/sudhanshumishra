
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

const testimonials = [
  {
    quote: "Precision-engineered VLSI architectures that pushed our silicon performance beyond expectations.",
    author: "Dr. Aris Thorne",
    role: "Senior Lead Architect",
    company: "Silicon Dynamics",
  },
  {
    quote: "Sudhanshu's AI synthesis nodes are pure craftsmanship. A rare bridge between hardware and intelligence.",
    author: "Marcus Webb",
    role: "Founding Engineer",
    company: "Neuralis Labs",
  },
  {
    quote: "The Aura Smart Pen prototype is a masterclass in embedded systems and human-centric design.",
    author: "Elena Frost",
    role: "Product Strategy",
    company: "Xynova Systems",
  },
]

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Transform for parallax on the large number
  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(goNext, 8000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonials[activeIndex]

  return (
    <div className="flex items-center justify-center py-40 bg-[var(--bg)] overflow-hidden transition-colors duration-500">
      <div ref={containerRef} className="relative w-full max-w-5xl px-8" onMouseMove={handleMouseMove}>
        {/* Oversized index number - positioned to bleed off left edge */}
        <motion.div
          className="absolute -left-12 top-1/2 -translate-y-1/2 text-[24rem] font-bold text-[var(--text)] opacity-[0.03] select-none pointer-events-none leading-none tracking-tighter font-syncopate"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content - asymmetric layout */}
        <div className="relative flex">
          {/* Left column - vertical text */}
          <div className="hidden md:flex flex-col items-center justify-center pr-16 border-r border-[var(--border)]">
            <motion.span
              className="text-[10px] font-syncopate text-[var(--sub-text)] opacity-40 tracking-[0.5em] uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ENDORSEMENTS
            </motion.span>

            {/* Vertical progress line */}
            <div className="relative h-32 w-px bg-[var(--border)] mt-8">
              <motion.div
                className="absolute top-0 left-0 w-full bg-blue-500 origin-top"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center - main content */}
          <div className="flex-1 md:pl-16 py-12">
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-3 text-[10px] font-syncopate text-[var(--sub-text)] border border-[var(--border)] rounded-sm px-4 py-1.5 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with character reveal */}
            <div className="relative mb-12 min-h-[180px] md:min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="text-3xl md:text-5xl font-light text-[var(--text)] leading-[1.2] tracking-tight font-inter"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em]"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  {/* Animated line before name */}
                  <motion.div
                    className="w-12 h-px bg-blue-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-lg font-bold text-[var(--text)] font-syncopate uppercase tracking-tighter">{current.author}</p>
                    <p className="text-xs text-[var(--sub-text)] font-syncopate uppercase tracking-[0.2em] opacity-60 mt-1">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={goPrev}
                  className="group relative w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center overflow-hidden bg-transparent"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-blue-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <ChevronLeft className="relative z-10 text-[var(--text)] group-hover:text-white transition-colors" size={20} />
                </motion.button>

                <motion.button
                  onClick={goNext}
                  className="group relative w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center overflow-hidden bg-transparent"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-blue-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <ChevronRight className="relative z-10 text-[var(--text)] group-hover:text-white transition-colors" size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker - subtle repeating company names */}
        <div className="absolute -bottom-16 left-0 right-0 overflow-hidden opacity-[0.05] pointer-events-none">
          <motion.div
            className="flex whitespace-nowrap text-5xl font-bold tracking-tighter font-syncopate uppercase"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-12">
                {testimonials.map((t) => t.company).join(" // ")} //
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
