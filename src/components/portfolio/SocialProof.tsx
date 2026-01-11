"use client";

import { motion } from "framer-motion";
import { SocialMediaPage } from "@/types/portfolio";
import { Instagram, ExternalLink, Users } from "lucide-react";

interface SocialProofProps {
  pages: SocialMediaPage[];
}

export const SocialProof = ({ pages }: SocialProofProps) => {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-sm text-primary mb-4">
            Social Presence
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-gradient-subtle">Pages I</span>{" "}
            <span className="gradient-text">Manage</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Building and growing engaged communities across social platforms
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {pages.map((page, index) => (
            <motion.a
              key={page.pageName}
              href={page.profileLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="glass-card p-6 md:p-8 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center gap-4">
                  {/* Instagram icon */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Instagram className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Users className="w-3 h-3 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {page.pageName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Instagram Page
                    </p>
                  </div>

                  {/* Arrow */}
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                {/* Decorative gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
