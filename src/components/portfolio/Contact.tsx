"use client";

import { motion } from "framer-motion";
import { Contact as ContactType } from "@/types/portfolio";
import { Mail, Phone, Globe, ArrowRight, Sparkles } from "lucide-react";

interface ContactProps {
  contact: ContactType;
  name: string;
}

export const Contact = ({ contact, name }: ContactProps) => {
  return (
    <>
      <section className="section-padding relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sm text-primary mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Let's Connect
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient-subtle">Ready to</span>
              <br />
              <span className="gradient-text">Work Together?</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">
              Let's create something extraordinary. Whether you need growth
              strategy, community building, or creative content — I'm here to
              help.
            </p>

            {/* Main CTA */}
            <motion.a
              href={`mailto:${contact.email}?subject=Let's Work Together`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-semibold overflow-hidden mb-12"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              {/* Content */}
              <Mail className="w-5 h-5 text-primary-foreground relative z-10" />
              <span className="text-primary-foreground relative z-10">
                Get in Touch
              </span>
              <ArrowRight className="w-5 h-5 text-primary-foreground relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </div>
        <div>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-fill sm:object-cover z-0 brightness-110"
          >
            <source src="/eye.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
      <div className="block ml-auto mr-auto w-full text-center bg-black p-4">
        <p className="text-xs  md:text-sm text-[#e6e580] mt-6 drop-shadow-md">
          <b>+91 8269786782</b>
        </p>
        <p className="text-xs  md:text-sm text-foreground/70 mt-6 drop-shadow-md">
          © {new Date().getFullYear()} {name}. Crafted with passion.
        </p>
      </div>
    </>
  );
};
