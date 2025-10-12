"use client";

import { motion } from "framer-motion";
import { Cloud, Laptop, Smartphone, Headphones } from "lucide-react";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  const services = [
    {
      title: "Website Creation & AWS Hosting",
      icon: <Laptop className="w-8 h-8 text-[#0096FF]" />,
      description:
        "Custom, responsive websites engineered for speed, security, and scalability — powered by AWS. From portfolio sites to enterprise platforms, we handle both the build and the cloud infrastructure behind it.",
      features: [
        "Next.js & React Development",
        "AWS EC2, S3, and CloudFront Hosting",
        "Performance Optimization & CI/CD Integration",
        "Domain Management & SSL Setup",
      ],
      color: "from-[#0096FF]/30 to-[#031B2E]",
    },
    {
      title: "AI-Powered Mobile App Development",
      icon: <Smartphone className="w-8 h-8 text-[#FF6B35]" />,
      description:
        "Cross-platform apps infused with intelligence. We integrate AI-driven automation, personalization, and chat experiences into seamless mobile interfaces built with React Native and AWS Amplify.",
      features: [
        "AI Chat & Voice Integration",
        "Cross-Platform React Native Apps",
        "AWS Amplify & API Gateway Integration",
        "Cloud Data Storage & Authentication",
      ],
      color: "from-[#FF6B35]/30 to-[#031B2E]",
    },
    {
      title: "IT Support & Infrastructure Management",
      icon: <Headphones className="w-8 h-8 text-[#0096FF]" />,
      description:
        "On-site and remote IT solutions that keep your business running smoothly — from help desk services and device management to network maintenance and cybersecurity monitoring.",
      features: [
        "Help Desk & 24/7 Remote Support",
        "Hardware Setup & Troubleshooting",
        "Network & Printer Configuration",
        "Cybersecurity & Patch Management",
      ],
      color: "from-[#0096FF]/30 to-[#031B2E]",
    },
    {
      title: "AWS Cloud Engineering Bootcamp (Coming Soon)",
      icon: <Cloud className="w-8 h-8 text-[#FF6B35]" />,
      description:
        "Our upcoming hands-on bootcamp designed to train the next generation of Cloud Engineers. Learn AWS infrastructure, automation, and DevSecOps workflows — directly from the SoleCloud team.",
      features: [
        "AWS Core Services & Infrastructure",
        "Terraform, CI/CD, and Automation",
        "Security & Compliance Fundamentals",
        "Capstone Projects & Real Deployment Labs",
      ],
      color: "from-[#FF6B35]/30 to-[#031B2E]",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#041B2D] via-[#031526] to-[#020C1B] text-white min-h-screen">
      {/* ---------- CLOUD MIST BACKGROUND ---------- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"], y: ["0%", "5%", "0%"], opacity: [0.25, 0.35, 0.25] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[80vw] h-[80vw] bg-[#0096FF] blur-[180px] opacity-25 top-[10%] left-[-20%]"
        />
        <motion.div
          animate={{ x: ["10%", "-5%", "10%"], y: ["10%", "0%", "10%"], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[70vw] h-[70vw] bg-[#FF6B35] blur-[200px] opacity-20 bottom-[0%] right-[-25%]"
        />
      </div>

      {/* ---------- HERO SECTION ---------- */}
      <section className="relative text-center py-28 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-bold tracking-tight text-white"
        >
          Solutions in <span className="text-[#0096FF]">Motion</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-4 text-lg max-w-2xl mx-auto text-[#C9D6E3]"
        >
          Comprehensive web, app, and cloud solutions — designed to help your business thrive securely,
          intelligently, and efficiently in the digital age.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 h-[2px] w-32 bg-gradient-to-r from-[#0096FF] via-[#FF6B35] to-[#0096FF] rounded-full mx-auto"
        />
      </section>

      {/* ---------- SERVICES GRID ---------- */}
      <section className="max-w-6xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-2 gap-10">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl bg-gradient-to-b ${service.color} border border-white/10 hover:border-[#0096FF]/40 hover:shadow-[0_0_35px_rgba(0,150,255,0.15)] transition-all duration-300 backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3 mb-4">
              {service.icon}
              <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
            </div>

            <p className="text-[#C9D6E3] mb-6">{service.description}</p>

            <ul className="space-y-2 text-[#AFC3D4]">
              {service.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2">
                  <span className="text-[#0096FF]">›</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {service.title.includes("Coming Soon") ? (
              <button
                disabled
                className="mt-6 px-5 py-2 rounded-md text-sm font-semibold bg-gray-700 text-gray-400 cursor-not-allowed"
              >
                Coming Soon
              </button>
            ) : (
              <a
                href="/contact"
                className="mt-6 px-5 py-2 rounded-md text-sm font-semibold bg-[#0096FF] hover:bg-[#0075CC] text-white inline-block transition-all"
              >
                Learn More
              </a>
            )}
          </motion.div>
        ))}
      </section>

      {/* ---------- FOOTER ---------- */}
      <Footer />
    </main>
  );
}
