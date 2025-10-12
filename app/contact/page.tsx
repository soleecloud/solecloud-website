"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! We've received your message and will get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          projectType: "",
          message: "",
          timeline: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
          Let's Build <span className="text-[#0096FF]">Something Amazing</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-4 text-lg max-w-2xl mx-auto text-[#C9D6E3]"
        >
          Ready to transform your vision into reality? Share your project details and let's create something extraordinary together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 h-[2px] w-32 bg-gradient-to-r from-[#0096FF] via-[#FF6B35] to-[#0096FF] rounded-full mx-auto"
        />
      </section>

      {/* ---------- FORM SECTION ---------- */}
      <section className="max-w-3xl mx-auto px-6 pb-12">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 shadow-[0_0_25px_rgba(0,150,255,0.15)] backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="input"
            >
              <option value="">Project Type</option>
              <option value="Website Creation">Website Creation</option>
              <option value="AI App Development">AI App Development</option>
              <option value="IT Support Services">IT Support Services</option>
              <option value="AWS Bootcamp">AWS Bootcamp (Coming Soon)</option>
            </select>
            <textarea
              name="message"
              placeholder="Describe your vision..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="input"
            ></textarea>
            <input
              type="text"
              name="timeline"
              placeholder="Timeline (optional)"
              value={formData.timeline}
              onChange={handleChange}
              className="input"
            />
            
            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-500/20 border border-green-500/50 text-green-100"
                    : "bg-red-500/20 border border-red-500/50 text-red-100"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 bg-gradient-to-r from-[#0096FF] to-[#FF6B35] font-semibold rounded-lg shadow-lg hover:shadow-[#0096FF]/40 transition-all duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Send My Vision →"}
            </button>
          </form>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/40 text-center text-sm leading-relaxed">
            Trusted by builders, brands, and innovators who believe in better infrastructure.
            <br />
            We don't just launch projects — we engineer growth.
          </p>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#041B2D] via-[#0096FF]/20 to-[#FF6B35]/10 rounded-2xl"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Ready to make it real?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-[#C9D6E3] mb-8"
          >
            The cloud is waiting — let's build what's next.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-[#0096FF] to-[#FF6B35] hover:from-[#0075CC] hover:to-[#E55A2B] text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-[0_0_30px_rgba(0,150,255,0.4)] transition-all duration-300 hover:scale-105 inline-block"
            >
              Schedule a Discovery Call
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}