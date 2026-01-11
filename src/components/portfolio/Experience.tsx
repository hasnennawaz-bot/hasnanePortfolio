"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Experience as ExperienceType } from "@/types/portfolio";
import { Briefcase, ChevronRight } from "lucide-react";

interface ExperienceProps {
  experiences: ExperienceType[];
}

export const Experience = ({ experiences }: ExperienceProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"],
  });
  const indicatorY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-sm text-primary mb-4">
            Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-gradient-subtle">Professional</span>{" "}
            <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <motion.div
          ref={timelineRef}
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline line with continuous glowing tracker */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2">
            <div className="relative w-px h-full bg-gradient-to-b from-primary/40 via-accent/30 to-secondary/30">
              {/* Glowing trail */}
              <motion.div
                className="pointer-events-none absolute -left-[5px] top-0 w-[10px] h-16 rounded-full bg-gradient-to-b from-primary/25 via-primary/10 to-transparent blur-sm"
                animate={{ y: ["0%", "100%"], opacity: [0.6, 0.4, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.85, 1],
                }}
              />
              {/* Glowing dot that continuously travels down the line */}
              <motion.div
                className="pointer-events-none absolute -left-2 top-0 w-6 h-6 rounded-full bg-primary/85 blur-md shadow-[0_0_50px_hsl(var(--primary)/0.75)] z-10"
                animate={{ y: ["0%", "100%"], opacity: [1, 1, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.85, 1],
                }}
              />
            </div>
          </div>

          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 top-8 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10">
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
              </div>

              {/* Content */}
              <div
                className={`flex-1 ml-16 md:ml-0 ${
                  index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                }`}
              >
                <div className="glass-card p-6 md:p-8 group transition-all duration-500 hover:border-primary/30">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 ${
                        index % 2 === 0 ? "md:order-2" : ""
                      }`}
                    >
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "md:order-1" : ""
                      }`}
                    >
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exp.duration}
                      </p>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <ul
                    className={`space-y-2 ${
                      index % 2 === 0 ? "md:text-left" : ""
                    }`}
                  >
                    {exp.responsibilities.slice(0, 4).map((resp, respIndex) => (
                      <li
                        key={respIndex}
                        className="flex items-start gap-2 text-muted-foreground text-sm"
                      >
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
