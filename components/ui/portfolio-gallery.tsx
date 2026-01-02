
import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { AnimatedLayerButton } from "./button"

interface PortfolioGalleryProps {
  title?: string;
  archiveButton?: {
    text: string;
    href: string;
  };
  images?: Array<{
    src: string;
    alt: string;
    title?: string;
    link?: string;
  }>;
  className?: string;
  maxHeight?: number;
  spacing?: string;
  onImageClick?: (index: number) => void;
  /**
   * Whether to pause marquee animation on hover (mobile only)
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Number of times to repeat the content in marquee (mobile only)
   * @default 4
   */
  marqueeRepeat?: number;
}

export function PortfolioGallery({
  title = "ARCHIVE_COLLECTION",
  archiveButton = {
    text: "OPEN_FULL_GALLERY",
    href: "#projects"
  },
  images: customImages,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-48 md:-space-x-64 lg:-space-x-80",
  onImageClick,
  pauseOnHover = true,
  marqueeRepeat = 4
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const defaultImages: Array<{ src: string; alt: string; link?: string }> = [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      alt: "SaaS Dashboard Design",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      alt: "Web Development",
    },
    {
      src: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
      alt: "E-Commerce Platform",
    },
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
      alt: "Mobile App Design",
    },
    {
      src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",
      alt: "Brand Identity",
    }
  ]
  
  const images = customImages || defaultImages

  return (
    <section
      aria-label={title}
      className={cn("relative py-24 px-6", className)}
      id="archives"
    >
      <div className="max-w-7xl mx-auto rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-xl overflow-hidden">
        {/* Header Section */}
        <div className="relative z-10 text-center pt-24 pb-12 px-8 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold geist-font text-white mb-10 tracking-tighter uppercase">{title}</h2>

          <AnimatedLayerButton 
            className="w-[220px] h-[60px] mb-24"
            onClick={() => {
              const el = document.querySelector(archiveButton.href);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {archiveButton.text}
          </AnimatedLayerButton>
        </div>

        {/* Desktop 3D overlapping layout - hidden on mobile */}
        <div className="hidden md:block relative overflow-hidden h-[500px] -mb-[200px]">
          <div className={cn("flex pb-12 pt-48 items-end justify-center", spacing)}>
            {images.map((image, index) => {
              const totalImages = images.length
              const middle = Math.floor(totalImages / 2)
              const distanceFromMiddle = Math.abs(index - middle)
              const staggerOffset = maxHeight - distanceFromMiddle * 20
              const zIndex = totalImages - index
              const isHovered = hoveredIndex === index
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index
              const yOffset = isHovered ? -140 : isOtherHovered ? 0 : -staggerOffset

              return (
                <motion.div
                  key={index}
                  className="group cursor-pointer flex-shrink-0"
                  style={{
                    zIndex: zIndex,
                  }}
                  initial={{
                    transform: `perspective(5000px) rotateY(-35deg) translateY(200px)`,
                    opacity: 0,
                  }}
                  animate={{
                    transform: `perspective(5000px) rotateY(-35deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => {
                    if (image.link) window.open(image.link, '_blank');
                    onImageClick?.(index);
                  }}
                >
                  <div
                    className="relative aspect-video w-72 md:w-96 lg:w-[450px] rounded-xl overflow-hidden border border-white/10 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      boxShadow: `
                        rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
                        rgba(0, 0, 0, 0.3) 10px 0px 40px -10px,
                        rgba(59, 130, 246, 0.1) 0px 0px 40px 0px
                      `,
                    }}
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                      <div className="text-[10px] font-bold geist-font text-blue-400 tracking-widest uppercase mb-1">PROJECT_VIEW</div>
                      <div className="text-sm font-bold text-white uppercase tracking-tight">{image.alt}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile marquee layout */}
        <div className="block md:hidden relative pb-16">
          <div
            className={cn(
              "group flex overflow-hidden p-4 [--duration:60s] [--gap:1.5rem] [gap:var(--gap)]",
              "flex-row"
            )}
          >
            {Array(marqueeRepeat)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex shrink-0 justify-around [gap:var(--gap)]",
                    "animate-marquee flex-row",
                    {
                      "group-hover:[animation-play-state:paused]": pauseOnHover,
                    }
                  )}
                >
                  {images.map((image, index) => (
                    <div
                      key={`${i}-${index}`}
                      className="group cursor-pointer flex-shrink-0"
                      onClick={() => {
                         if (image.link) window.open(image.link, '_blank');
                         onImageClick?.(index);
                      }}
                    >
                      <div
                        className="relative aspect-video w-72 rounded-xl overflow-hidden border border-white/10"
                        style={{
                          boxShadow: `rgba(0, 0, 0, 0.4) 0px 20px 30px -10px`,
                        }}
                      >
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
