'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import AnimatedSection from '@/components/AnimatedSection';
import ServicesSection from '@/components/ServicesSection';

// Dynamically import the CloudBackground component to prevent SSR issues
const CloudBackground = dynamic(() => import('@/components/CloudBackground'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[-20] bg-darker">
      <div className="bg-gradient-to-b from-darker/80 to-dark/90 w-full h-full"></div>
    </div>
  )
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Cloud Background - positioned fixed and below all content */}
      <CloudBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex justify-center items-center overflow-hidden">
        <div className="relative z-10 w-full h-full flex justify-center items-center pt-28 md:pt-20">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Engineered for Growth. Built for the Cloud
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-10"
            >
              We blend design, automation, and cloud architecture into one seamless experience -- all tailored for your business
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg text-lg inline-block transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 transform">
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* CTA Section */}
      <AnimatedSection 
        className="relative z-10 bg-gradient-to-r from-dark/95 to-primary/20 py-16"
        delay={0.2}
        direction="right"
        distance={40}
      >
        <div className="section-container text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl slow-spin" />
            <div className="absolute -left-40 -top-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl slow-spin" />
          </div>
          
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Ready to elevate your digital presence?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let us handle your web development and cloud hosting needs so you can focus on your business.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/contact" className="btn-primary inline-block glow-effect">
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}