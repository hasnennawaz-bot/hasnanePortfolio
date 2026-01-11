"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Metric } from "@/types/portfolio";

interface ImpactMetricsProps {
  metrics: Metric[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

// Check for reduced motion preference
const useReducedMotionPreference = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Generate random particles for dust effect
const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: 100 + Math.random() * 20,
    size: 2 + Math.random() * 3,
    opacity: 0.3 + Math.random() * 0.4,
    duration: 1.5 + Math.random() * 1,
    delay: Math.random() * 0.5,
  }));
};

// Parse number and suffix to get increment strategy
const getIncrementStrategy = (value: number, suffix: string) => {
  // Large numbers (50,000+) - jump increments
  if (value >= 10000) {
    return {
      type: "jump" as const,
      steps: [500, 2000, 12000, Math.floor(value * 0.76), value],
      duration: 2.5,
    };
  }

  // Percentage (67.5%) - elastic easing
  if (suffix === "%") {
    return {
      type: "elastic" as const,
      duration: 2.2,
      overshoot: 0.15,
    };
  }

  // Medium numbers (30+) - quick bounce
  if (value >= 10 && value < 100) {
    return {
      type: "bounce" as const,
      duration: 1.8,
    };
  }

  // Decimal numbers (2.5) - precision steps
  if (value % 1 !== 0) {
    return {
      type: "decimal" as const,
      steps: [Math.floor(value), Math.floor(value) + (value % 1) * 0.6, value],
      duration: 2.0,
    };
  }

  // Default smooth increment
  return {
    type: "smooth" as const,
    duration: 2.0,
  };
};

const AnimatedNumber = ({
  value,
  suffix,
  label,
  index,
}: Metric & { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotionPreference();

  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  const y = useMotionValue(30);
  const opacity = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 60, damping: 15 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

  // Generate particles on mount - reduced count for performance
  useEffect(() => {
    setParticles(generateParticles(8));
  }, []);

  useEffect(() => {
    if (!isInView || hasAnimated || prefersReducedMotion) {
      if (prefersReducedMotion) {
        setDisplayValue(value);
        opacity.set(1);
        y.set(0);
        setGlowIntensity(1);
      }
      return;
    }

    setIsAnimating(true);

    // Start with scattered fragments floating upward
    opacity.set(0.2);
    y.set(30);

    // Animate fragments floating up
    animate(opacity, 0.4, {
      duration: 0.3,
      ease: "easeOut",
    });

    animate(y, 5, {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1],
      onComplete: () => {
        // Now start number increment
        const strategy = getIncrementStrategy(value, suffix);

        if (strategy.type === "jump") {
          // Jump increments for large numbers
          const steps = strategy.steps || [];
          let stepIndex = 0;

          const increment = () => {
            if (stepIndex < steps.length) {
              setDisplayValue(steps[stepIndex]);
              stepIndex++;

              if (stepIndex < steps.length) {
                setTimeout(
                  increment,
                  (strategy.duration * 1000) / steps.length
                );
              } else {
                // Final value reached - add overshoot
                setTimeout(() => {
                  const overshoot = value * 1.02;
                  setDisplayValue(overshoot);
                  setTimeout(() => {
                    setDisplayValue(value);
                    finalizeAnimation();
                  }, 150);
                }, 100);
              }
            }
          };

          increment();
        } else if (strategy.type === "decimal") {
          // Decimal precision steps
          const steps = strategy.steps || [0, value];
          steps.forEach((step, i) => {
            setTimeout(() => {
              setDisplayValue(step);
              if (i === steps.length - 1) {
                finalizeAnimation();
              }
            }, ((strategy.duration * 1000) / steps.length) * i);
          });
        } else if (strategy.type === "elastic") {
          // Elastic easing for percentages
          animate(0, value * 1.15, {
            duration: strategy.duration,
            ease: [0.34, 1.56, 0.64, 1], // Elastic out
            onUpdate: (latest) => {
              if (latest > value) {
                // Overshoot phase
                setDisplayValue(latest);
              } else {
                // Settle phase
                setDisplayValue(value);
              }
            },
            onComplete: () => {
              setDisplayValue(value);
              finalizeAnimation();
            },
          });
        } else if (strategy.type === "bounce") {
          // Bounce for medium numbers
          animate(0, value * 1.1, {
            duration: strategy.duration,
            ease: [0.68, -0.55, 0.265, 1.55], // Bounce out
            onUpdate: (latest) => {
              setDisplayValue(Math.max(0, Math.min(latest, value * 1.1)));
            },
            onComplete: () => {
              setDisplayValue(value);
              finalizeAnimation();
            },
          });
        } else {
          // Smooth increment with slight overshoot
          animate(0, value * 1.03, {
            duration: strategy.duration,
            ease: [0.34, 1.56, 0.64, 1],
            onUpdate: (latest) => {
              if (latest < value) {
                setDisplayValue(latest);
              } else {
                setDisplayValue(value);
              }
            },
            onComplete: () => {
              setDisplayValue(value);
              finalizeAnimation();
            },
          });
        }

        // Animate Y position while counting (floating effect)
        animate(y, -2, {
          duration: strategy.duration * 0.8,
          ease: [0.25, 0.4, 0.25, 1],
        });

        // Fade in opacity
        animate(opacity, 0.9, {
          duration: strategy.duration * 0.6,
          ease: "easeOut",
        });

        // Gradually increase glow as number approaches final value
        animate(0, 0.7, {
          duration: strategy.duration * 0.9,
          ease: "easeOut",
          onUpdate: (latest) => setGlowIntensity(latest),
        });
      },
    });

    function finalizeAnimation() {
      // Micro vibration before settling
      setTimeout(() => {
        animate(y, [0, -1, 0.5, 0], {
          duration: 0.3,
          ease: "easeOut",
        });

        // Final glow pulse
        animate(0, 1, {
          duration: 0.4,
          ease: "easeOut",
          onUpdate: (latest) => setGlowIntensity(latest),
        });

        // Full opacity
        opacity.set(1);
        y.set(0);

        setIsAnimating(false);
        setHasAnimated(true);
      }, 100);
    }
  }, [isInView, value, suffix, hasAnimated, prefersReducedMotion, y, opacity]);

  // Format display value
  const formatValue = (val: number): string => {
    if (val >= 1000) {
      return Math.floor(val).toLocaleString();
    }
    if (val % 1 !== 0) {
      return val.toFixed(1);
    }
    return Math.floor(val).toString();
  };

  const yTransform = useTransform(springY, (latest) => `${latest}px`);
  const opacityTransform = useTransform(springOpacity, (latest) => latest);

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="glass-card p-6 md:p-8 text-center h-full transition-all duration-500 group-hover:scale-105 group-hover:border-primary/30 relative overflow-hidden">
        {/* Particle dust effect */}
        {isAnimating && particles.length > 0 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-primary/40"
                style={{
                  left: `${particle.x}%`,
                  bottom: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
                initial={{
                  y: 0,
                  opacity: particle.opacity,
                  scale: 0,
                }}
                animate={{
                  y: -150,
                  opacity: [particle.opacity, particle.opacity * 0.5, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              />
            ))}
          </div>
        )}

        {/* Glow effect that increases as number stabilizes */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, hsl(var(--primary) / ${
              glowIntensity * 0.3
            }), transparent 70%)`,
            filter: `blur(${20 * glowIntensity}px)`,
          }}
          animate={{
            opacity: glowIntensity * 0.6,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Number display with anti-gravity effect */}
        <div className="relative z-10">
          <motion.div
            style={{
              y: yTransform,
              opacity: opacityTransform,
              transformOrigin: "center",
            }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
          >
            <span
              className="gradient-text inline-block"
              style={{
                filter: `drop-shadow(0 0 ${
                  8 * glowIntensity
                }px hsl(var(--primary) / ${glowIntensity * 0.8}))`,
                transition: "filter 0.3s ease-out",
              }}
            >
              {formatValue(displayValue)}
            </span>
            <span
              className="gradient-text"
              style={{
                filter: `drop-shadow(0 0 ${
                  8 * glowIntensity
                }px hsl(var(--primary) / ${glowIntensity * 0.8}))`,
                transition: "filter 0.3s ease-out",
              }}
            >
              {suffix}
            </span>
          </motion.div>

          <motion.p
            className="text-muted-foreground mt-3 text-xs sm:text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{
              opacity: hasAnimated || prefersReducedMotion ? 1 : 0,
            }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {label}
          </motion.p>
        </div>

        {/* Decorative line */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{
            width: hasAnimated || prefersReducedMotion ? "50%" : 0,
          }}
          transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export const ImpactMetrics = ({ metrics }: ImpactMetricsProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-sm text-primary mb-4">
            Impact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-gradient-subtle">Numbers That</span>{" "}
            <span className="gradient-text">Speak</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {metrics.map((metric, index) => (
            <AnimatedNumber key={metric.label} {...metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
