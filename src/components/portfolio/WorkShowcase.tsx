"use client";

import { motion } from "framer-motion";
import { WorkShowcaseItem } from "@/types/portfolio";
import { ExternalLink } from "lucide-react";

interface WorkShowcaseProps {
  works: WorkShowcaseItem[];
}

export const WorkShowcase = ({ works }: WorkShowcaseProps) => {
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

        {/* Horizontal scroll container */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory -mx-6 px-6">
            {works.map((work, index) => (
              <motion.a
                key={work.title}
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex-shrink-0 w-[300px] md:w-[400px] snap-start"
              >
                <div className="glass-card overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary/40">
                  {/* Preview area */}
                  <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                    <img
                      src={`/images/s${index + 1}.jpeg`}
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
              </motion.a>
            ))}
          </div>

          {/* Scroll hint gradient */}
          <div className="absolute right-0 top-0 bottom-8 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
