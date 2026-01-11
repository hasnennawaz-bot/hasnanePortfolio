"use client";

import { motion } from "framer-motion";
import { WorkShowcaseItem } from "@/types/portfolio";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface WorkShowcaseProps {
  works: WorkShowcaseItem[];
}

export const WorkShowcase = ({ works }: WorkShowcaseProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollPositionRef = useRef(0);

  // Triple duplicate for truly seamless infinite loop
  const duplicatedWorks = [...works, ...works, ...works];

  // Calculate speed based on screen size (faster on mobile)
  const getSpeed = () => {
    if (typeof window === "undefined") return 0.5;
    return window.innerWidth < 768 ? 0.8 : 0.5; // Faster on mobile
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const getItemWidth = () => {
      // Check if we're on mobile (item width is 300px) or desktop (400px)
      if (typeof window === "undefined") return 324; // 300 + 24 gap
      return window.innerWidth < 768 ? 324 : 424; // 300/400 + 24 gap
    };

    const animate = () => {
      if (!isPaused && carousel) {
        const itemWidth = getItemWidth();
        const singleSetWidth = works.length * itemWidth;
        const speed = getSpeed();

        scrollPositionRef.current += speed;

        // Reset position seamlessly when we've scrolled one full set
        if (scrollPositionRef.current >= singleSetWidth) {
          scrollPositionRef.current =
            scrollPositionRef.current - singleSetWidth;
        }

        carousel.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [works.length, isPaused]);

  const scrollLeft = () => {
    if (!carouselRef.current) return;
    setIsPaused(true);
    const getItemWidth = () => {
      if (typeof window === "undefined") return 324;
      return window.innerWidth < 768 ? 324 : 424;
    };
    const itemWidth = getItemWidth();
    const singleSetWidth = works.length * itemWidth;

    scrollPositionRef.current -= itemWidth;
    // If we go negative, wrap to the end of the visible set
    if (scrollPositionRef.current < 0) {
      scrollPositionRef.current = singleSetWidth - itemWidth;
    }

    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`;
    }
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsPaused(false), 3000);
  };

  const scrollRight = () => {
    if (!carouselRef.current) return;
    setIsPaused(true);
    const getItemWidth = () => {
      if (typeof window === "undefined") return 324;
      return window.innerWidth < 768 ? 324 : 424;
    };
    const itemWidth = getItemWidth();
    const singleSetWidth = works.length * itemWidth;

    scrollPositionRef.current += itemWidth;
    // Wrap seamlessly when we exceed one set
    if (scrollPositionRef.current >= singleSetWidth) {
      scrollPositionRef.current = scrollPositionRef.current - singleSetWidth;
    }

    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`;
    }
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <section id="work" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-sm text-primary mb-4">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-gradient-subtle">Creative</span>{" "}
            <span className="gradient-text">Showcase</span>
          </h2>
        </motion.div>

        {/* Continuous Carousel Container */}
        <div className="relative overflow-hidden -mx-6 px-6">
          {/* Arrow Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 border border-border/50 backdrop-blur-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 border border-border/50 backdrop-blur-sm"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex gap-6"
              style={{
                willChange: "transform",
                transition: isPaused ? "transform 0.3s ease-out" : "none",
              }}
            >
              {duplicatedWorks.map((work, index) => (
                <a
                  key={`${work.title}-${index}`}
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-shrink-0 w-[300px] md:w-[400px]"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="glass-card overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary/40">
                    {/* Preview area */}
                    <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                      <img
                        src={`/images/s${(index % works.length) + 1}.jpeg`}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.1)_0%,_transparent_70%)]" />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1.05 }}
                          className="relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold text-sm shadow-2xl shadow-primary/40 border border-primary/30 hover:shadow-primary/60 hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden group/btn"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                          <span className="relative z-10 flex items-center gap-2.5 group-hover/btn:translate-x-0.5 transition-transform duration-300">
                            <ExternalLink className="w-4 h-4 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300" />
                            <span>View My Work</span>
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {work.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {work.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
