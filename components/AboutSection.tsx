"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Rocket, Star, Cloud, Clock } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { icon: <Rocket className="w-6 h-6 text-[#0096FF]" />, value: 50, label: "Projects Completed" },
    { icon: <Star className="w-6 h-6 text-[#FF6B35]" />, value: 99, label: "Client Satisfaction" },
    { icon: <Clock className="w-6 h-6 text-[#0096FF]" />, value: 7, label: "Years Experience" },
    { icon: <Cloud className="w-6 h-6 text-[#FF6B35]" />, value: 30, label: "Cloud Migrations" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#041B2D] to-[#020C1B] text-white py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Connecting the <span className="text-[#0096FF]">Dots</span> with{" "}
          <span className="text-[#FF6B35]">SoleCloud</span>
        </h2>
        <p className="text-[#C9D6E3] max-w-2xl mx-auto mb-16">
          We combine creativity, engineering, and automation to deliver technology
          that accelerates your growth — in the cloud and beyond.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
          {stats.map((s, i) => (
            <AnimatedStatCard key={i} {...s} />
          ))}
        </div>

        {/* Mission / Who / Approach */}
        <div className="space-y-12 text-left max-w-4xl mx-auto">
          <InfoCard
            title="Our Mission"
            accent="#0096FF"
            content="At SoleCloud, our mission is to empower modern businesses through intelligent cloud solutions. We help you establish a digital presence that scales effortlessly and performs flawlessly — powered by automation, AI, and AWS."
          />

          <InfoCard
            title="Who We Are"
            accent="#0096FF"
            content="We're a team of engineers, designers, and innovators blending DevOps, automation, and creativity to deliver next-gen infrastructure and web solutions. Our approach is client-focused, data-driven, and built for measurable results."
          />

          <InfoCard
            title="Our Approach"
            accent="#0096FF"
            content={
              <ul className="list-disc list-inside text-[#C9D6E3] space-y-1">
                <li>Human-centered design focused on seamless UX</li>
                <li>Automation-first development principles</li>
                <li>Cloud-native infrastructure leveraging AWS</li>
                <li>Continuous monitoring and 24/7 support</li>
                <li>Transparent collaboration from start to scale</li>
              </ul>
            }
          />

          <InfoCard
            title="Why Choose SoleCloud"
            accent="#FF6B35"
            content="Because we don't just build — we engineer growth. From AWS DevOps pipelines to brand-level design, our systems think smarter and scale faster."
          />
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0096FF]/10 to-transparent blur-3xl" />
    </section>
  );
}

/* ---------- COMPONENTS ---------- */

function InfoCard({ title, accent, content }: { title: string; accent: string; content: React.ReactNode }) {
  return (
    <div
      className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-[#0096FF]/40 transition-all"
      style={{ borderColor: `${accent}30` }}
    >
      <h3 className="text-2xl font-semibold mb-2" style={{ color: accent }}>
        {title}
      </h3>
      <div className="text-[#C9D6E3] leading-relaxed">{content}</div>
    </div>
  );
}

/* ---------- ANIMATED STAT CARD ---------- */
function AnimatedStatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = useInView({ once: true, margin: "-100px" });

  useEffect(() => {
    if (ref.inView) {
      controls.start({ opacity: 1, y: 0 });
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const counter = setInterval(() => {
        start += increment;
        if (start >= value) {
          start = value;
          clearInterval(counter);
        }
        setCount(Math.floor(start));
      }, 16);
    }
  }, [ref.inView]);

  return (
    <motion.div
      ref={ref.ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#0096FF]/40 hover:shadow-[0_0_25px_rgba(0,150,255,0.2)] transition-all duration-300"
    >
      <div className="flex justify-center mb-2">{icon}</div>
      <h3 className="text-2xl font-bold text-[#0096FF]">{count}+</h3>
      <p className="text-sm text-[#C9D6E3]">{label}</p>
    </motion.div>
  );
}
