"use client";

import { motion } from "framer-motion";
import { BeyondResume as BeyondResumeType } from "@/types/portfolio";
import { Scale, PenTool, Palette } from "lucide-react";

interface BeyondResumeProps {
  data: BeyondResumeType;
}

const icons = [Scale, PenTool, Palette];

export const BeyondResume = ({ data }: BeyondResumeProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-sm text-primary mb-4">
            The Story
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
            {data.title}
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {data.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                  e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
                }}
              >
                <div className="glass-card p-8 h-full transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary/30">
                  {/* Icon container */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
