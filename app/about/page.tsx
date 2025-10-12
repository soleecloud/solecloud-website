"use client";

import { motion } from "framer-motion";
import { Rocket, Star, Cloud, Clock } from "lucide-react";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const stats = [
    { icon: <Rocket className="w-6 h-6 text-[#0096FF]" />, value: "50+", label: "Projects Completed" },
    { icon: <Star className="w-6 h-6 text-[#FF6B35]" />, value: "99%", label: "Client Satisfaction" },
    { icon: <Clock className="w-6 h-6 text-[#0096FF]" />, value: "7+", label: "Years Experience" },
    { icon: <Cloud className="w-6 h-6 text-[#FF6B35]" />, value: "30+", label: "Cloud Deployments" },
  ];

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#041B2D] via-[#031526] to-[#020C1B] text-white">
      {/* ---------- ANIMATED CLOUD MIST BACKGROUND ---------- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Blue mist */}
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"], y: ["0%", "5%", "0%"], opacity: [0.25, 0.35, 0.25] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[80vw] h-[80vw] bg-[#0096FF] blur-[180px] opacity-25 top-[10%] left-[-20%]"
        />
        {/* Orange mist */}
        <motion.div
          animate={{ x: ["10%", "-5%", "10%"], y: ["10%", "0%", "10%"], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[70vw] h-[70vw] bg-[#FF6B35] blur-[200px] opacity-20 bottom-[0%] right-[-25%]"
        />
        {/* Faint white glow mist */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[90vw] h-[90vw] bg-white blur-[250px] opacity-10 top-[30%] left-[10%]"
        />
      </div>

      {/* ---------- HERO SECTION ---------- */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-bold tracking-tight text-white"
        >
          Welcome to <span className="text-[#FF6B35]">SoleCloud</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-4 text-2xl sm:text-3xl font-medium text-[#0096FF]"
        >
          Where Innovation Finds Altitude.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="max-w-2xl mt-6 text-lg text-[#C9D6E3]"
        >
          We don't follow trends — we build systems that rise above them. From design to deployment,
          every solution we create helps businesses reach new heights in the cloud.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-10 h-[2px] w-32 bg-gradient-to-r from-[#0096FF] via-[#FF6B35] to-[#0096FF] rounded-full"
        />
      </section>

      {/* ---------- STATS SECTION ---------- */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#0096FF]/40 hover:shadow-[0_0_25px_rgba(0,150,255,0.2)] transition-all duration-300"
            >
              <div className="flex justify-center mb-2">{s.icon}</div>
              <h3 className="text-2xl font-bold text-[#0096FF]">{s.value}</h3>
              <p className="text-sm text-[#C9D6E3]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- MISSION SECTION ---------- */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Our Mission
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-sm hover:border-[#0096FF]/40 hover:shadow-[0_0_25px_rgba(0,150,255,0.2)] transition-all duration-300"
        >
          <p className="text-[#C9D6E3] text-lg leading-relaxed">
            To elevate businesses through intelligent automation, secure cloud architecture, and design that inspires trust. 
            We help organizations unlock the full potential of the cloud — from AWS deployments and DevSecOps pipelines to web platforms that move as fast as the people behind them.
          </p>
        </motion.div>
      </section>

      {/* ---------- WHO WE ARE ---------- */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Who We Are
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-sm hover:border-[#FF6B35]/40 hover:shadow-[0_0_25px_rgba(255,107,53,0.2)] transition-all duration-300"
        >
          <p className="text-[#C9D6E3] text-lg leading-relaxed">
            We're builders, strategists, and engineers who think in systems, not silos. We combine deep technical expertise in 
            <span className="text-[#0096FF] font-medium"> AWS, automation, and modern web frameworks</span> with creative problem-solving that keeps our clients ahead of the curve.
            What sets us apart isn't just what we build — it's how we think. We approach every project with precision, empathy, and a relentless drive to simplify the complex.
          </p>
        </motion.div>
      </section>

      {/* ---------- PHILOSOPHY & CULTURE ---------- */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Our Philosophy & Culture
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-sm hover:border-[#FF6B35]/40 transition-all"
        >
          <p className="text-[#C9D6E3] text-lg leading-relaxed">
            At SoleCloud, we don't just build in the cloud — we <span className="text-[#FF6B35]">think</span> in the cloud. 
            Every line of code, every automation, and every design decision is guided by a single principle: 
            <span className="text-[#0096FF] font-medium"> connect innovation with purpose.</span>
          </p>

          <p className="text-[#C9D6E3] text-lg leading-relaxed mt-6">
            We believe in blending creativity with engineering — where design meets DevOps, and automation amplifies human potential. 
            Our philosophy is simple: make technology feel seamless, scalable, and smart enough to evolve with you.
          </p>

          <p className="text-[#C9D6E3] text-lg leading-relaxed mt-6">
            What truly defines us is our culture. We move with curiosity, craft with precision, and collaborate like partners — not vendors. 
            We experiment boldly, automate intelligently, and never stop refining. At SoleCloud, we exist to elevate ideas — to transform what's possible through systems that learn, scale, and inspire confidence.
          </p>
        </motion.div>
      </section>

      {/* ---------- WHAT WE'RE KNOWN FOR ---------- */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8"
        >
          What We're Known For
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          {[
            { title: "Engineering Excellence", desc: "Clean, scalable cloud solutions built for real-world performance." },
            { title: "Automation-Driven Efficiency", desc: "Streamlined DevOps pipelines that save time and reduce error." },
            { title: "Design Intelligence", desc: "Interfaces and infrastructures that look as good as they perform." },
            { title: "Partnership Mindset", desc: "We don't just deliver — we collaborate, refine, and grow with you." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#0096FF]/40 hover:shadow-[0_0_25px_rgba(0,150,255,0.2)] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-[#0096FF] mb-2">{item.title}</h3>
              <p className="text-[#C9D6E3] text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <Footer />
    </main>
  );
}