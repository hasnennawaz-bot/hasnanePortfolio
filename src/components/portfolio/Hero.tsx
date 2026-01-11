"use client";

import { motion } from "framer-motion";
import { PersonalInfo } from "@/types/portfolio";
import { ArrowDown, Mail, MapPin, Sparkles } from "lucide-react";

interface HeroProps {
  personalInfo: PersonalInfo;
  profileSummary: string;
}

export const Hero = ({ personalInfo, profileSummary }: HeroProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.2, 0.4, 0.2],
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background glows - more subtle */}
      <motion.div
        className="hero-glow w-[800px] h-[800px] bg-primary/10 -top-60 -left-60 blur-3xl"
        variants={glowVariants}
        animate="animate"
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-glow w-[700px] h-[700px] bg-accent/10 -bottom-60 -right-60 blur-3xl"
        variants={glowVariants}
        animate="animate"
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="hero-glow w-[600px] h-[600px] bg-secondary/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"
        variants={glowVariants}
        animate="animate"
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Grid pattern overlay - more subtle */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          className="relative z-20 flex flex-col items-center text-center space-y-5 sm:space-y-6 lg:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Location badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-modern text-sm text-muted-foreground backdrop-blur-xl border border-border/50">
              <MapPin className="w-4 h-4 text-primary" />
              {personalInfo.location}
            </span>
          </motion.div>

          {/* Name - Large and prominent */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
          >
            <span className="block text-gradient-subtle mb-1 sm:mb-2">
              {personalInfo.name.split(" ")[0]}
            </span>
            <span className="block gradient-text-modern">
              {personalInfo.name.split(" ")[1]}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light">
              {personalInfo.title}
            </p>
          </motion.div>

          {/* Summary */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-muted-foreground/90 max-w-2xl leading-relaxed"
          >
            {profileSummary}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4 justify-center"
          >
            <a
              href={`mailto:${personalInfo.contact.email}?subject=Let's Work Together`}
              className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
              <span className="relative z-10">Get in Touch</span>
            </a>
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4  glass-card-modern font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-xl border border-border/50 gradient-border"
            >
              View My Work
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground/60"
        >
          <span className="text-xs uppercase tracking-widest font-medium">
            Scroll
          </span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
