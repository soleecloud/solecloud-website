"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-b from-[#041B2D] via-[#05294B] to-[#020C1B] overflow-hidden">
      {/* Floating background mist */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-br from-[#0096FF]/20 via-[#FF6B35]/10 to-[#0096FF]/20 blur-3xl opacity-25"
      />

      {/* Animated title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl sm:text-6xl font-bold tracking-tight text-white"
      >
        <span className="block text-white">Welcome to</span>{" "}
        <span className="text-[#FF6B35]">SoleCloud</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="mt-4 text-2xl sm:text-3xl font-medium text-[#0096FF]"
      >
        Where Innovation Finds Altitude.
      </motion.p>

      {/* Supporting tagline */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.6 }}
        className="max-w-2xl mt-6 text-lg text-[#C9D6E3]"
      >
        We don't follow trends — we build systems that rise above them.  
        From design to deployment, every line of code we write helps  
        businesses reach new heights in the cloud.
      </motion.p>

      {/* Subtle glow line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="mt-10 h-[2px] w-32 bg-gradient-to-r from-[#0096FF] via-[#FF6B35] to-[#0096FF] rounded-full"
      />
    </section>
  );
}
