"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SkillsProps {
  skills: string[];
}

// Check for reduced motion preference
const useReducedMotionPreference = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const Skills = ({ skills }: SkillsProps) => {
  const containerRef = useRef(null);
  // Only trigger animation when section is visible in viewport
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-50px",
    amount: 0.15, // Trigger when at least 15% of the section is visible
  });
  const prefersReducedMotion = useReducedMotionPreference();

  // Size classes for visual variety
  const getSizeClass = (index: number) => {
    const sizes = [
      "text-lg md:text-xl px-6 py-3",
      "text-base md:text-lg px-5 py-2.5",
      "text-sm md:text-base px-4 py-2",
    ];
    return sizes[index % 3];
  };

  // Gradient classes for visual variety
  const getGradientClass = (index: number) => {
    const gradients = [
      "from-primary/30 via-primary/20 to-primary/10 hover:from-primary/40 hover:via-primary/30 hover:to-primary/20",
      "from-accent/30 via-accent/20 to-accent/10 hover:from-accent/40 hover:via-accent/30 hover:to-accent/20",
      "from-secondary/30 via-secondary/20 to-secondary/10 hover:from-secondary/40 hover:via-secondary/30 hover:to-secondary/20",
    ];
    return gradients[index % 3];
  };

  // Determine direction for each skill (alternate between left and right)
  const getDirection = (index: number): "left" | "right" => {
    return index % 2 === 0 ? "left" : "right";
  };

  // Variants for slide-in animation from left and right
  const itemVariants = {
    hiddenLeft: {
      x: -150,
      opacity: 0,
      scale: 0.85,
    },
    hiddenRight: {
      x: 150,
      opacity: 0,
      scale: 0.85,
    },
    visible: (i: number) => {
      const direction = getDirection(i);
      return {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.8,
          delay: i * 0.08,
          ease: [0.22, 1, 0.36, 1], // Smoother cubic-bezier easing
          opacity: { duration: 0.6 },
          scale: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
        },
      };
    },
  };

  // Reduced motion variants
  const itemVariantsReduced = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: i * 0.04,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full glass-card text-sm text-primary mb-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 150,
              damping: 12,
              delay: 0.1,
            }}
          >
            Expertise
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-gradient-subtle">Skills &</span>{" "}
            <span className="gradient-text">Superpowers</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => {
            const direction = getDirection(index);
            const initialVariant = prefersReducedMotion
              ? "hidden"
              : direction === "left"
              ? "hiddenLeft"
              : "hiddenRight";

            return (
              <motion.div
                key={skill}
                custom={index}
                variants={
                  prefersReducedMotion ? itemVariantsReduced : itemVariants
                }
                initial={initialVariant}
                animate={isInView ? "visible" : initialVariant}
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  transition: {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                transition={{
                  layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }}
                className={`
                  relative rounded-full bg-gradient-to-br ${getGradientClass(
                    index
                  )}
                  ${getSizeClass(index)}
                  font-medium text-foreground cursor-default
                  border border-border/50 hover:border-primary/50
                  backdrop-blur-md
                  shadow-lg
                  overflow-hidden
                  group
                `}
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{
                      x: isInView ? "200%" : "-100%",
                    }}
                    transition={{
                      duration: 2.5,
                      delay: index * 0.08 + 0.8,
                      repeat: Infinity,
                      repeatDelay: 5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>

                {/* Content */}
                <span className="relative z-10 block">{skill}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
