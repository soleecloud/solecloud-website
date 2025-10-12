"use client";

import { Laptop, BrainCircuit, Headphones, GraduationCap } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <Laptop className="w-8 h-8 text-[#0096FF]" />,
      title: "Website Creation & Hosting",
      description:
        "Modern, responsive websites built and hosted on AWS — fast, secure, and effortless.",
      link: "/services#websites",
      accent: "#0096FF",
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-[#FF6B35]" />,
      title: "AI-Powered App Development",
      description:
        "Intelligent apps engineered with AI and AWS — built to adapt, learn, and grow.",
      link: "/services#ai",
      accent: "#FF6B35",
    },
    {
      icon: <Headphones className="w-8 h-8 text-[#00C2FF]" />,
      title: "24/7 IT Support & Maintenance",
      description:
        "Always-on support. Real engineers. Real uptime.",
      link: "/services#support",
      accent: "#00C2FF",
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-[#FF6B35]" />,
      title: "Cloud Engineering Bootcamp",
      description:
        "Learn the future of cloud — taught by the engineers building it.",
      link: "/services#bootcamp",
      accent: "#FF6B35",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#041B2D] to-[#020C1B] text-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-3">Building Smarter Systems in the Cloud</h2>
        <p className="text-[#C9D6E3] max-w-2xl mx-auto mb-16">
          From design to deployment — SoleCloud engineers solutions that think, scale, and secure your digital world.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <a
              href={service.link}
              key={i}
              className="group relative rounded-2xl border border-transparent bg-[#0b213e]/30 backdrop-blur-sm p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,150,255,0.3)] hover:border-[#0096FF]/50"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-[#C9D6E3] text-sm">{service.description}</p>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `0 0 20px 2px ${service.accent}40`,
                }}
              />
            </a>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="/services"
            className="text-[#FF6B35] font-semibold hover:underline transition-all"
          >
            Explore all services →
          </a>
        </div>
      </div>

      {/* soft gradient blur background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0096FF]/10 to-transparent blur-3xl" />
    </section>
  );
}
