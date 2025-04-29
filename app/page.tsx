'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ServiceCard from '@/components/ServiceCard';
import AnimatedSection from '@/components/AnimatedSection';
import { FaLaptopCode, FaCloud, FaHeadset } from 'react-icons/fa';

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
      <CloudBackground>
        <div className="w-full h-full" />
      </CloudBackground>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex justify-center items-center overflow-hidden">
        <div className="relative z-10 w-full h-full flex justify-center items-center pt-20">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Powering Your Digital Presence in the Cloud
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-10"
            >
              Website creation and AWS hosting tailored for your business.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/contact" className="btn-primary text-lg inline-block glow-effect">
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <AnimatedSection className="relative z-10 bg-dark/90 py-16 md:py-24" direction="up" distance={40}>
        <div className="section-container">
          <div className="mb-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 relative inline-block"
            >
              <span className="relative z-10">Our Services</span>
              <motion.div 
                className="absolute -z-10 inset-0 bg-primary/10 rounded-full blur-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              We provide end-to-end solutions to establish and maintain your online presence.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard 
                title="Website Development" 
                description="Custom, responsive website design and development using modern technologies."
                icon={<FaLaptopCode />} 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ServiceCard 
                title="AWS Hosting" 
                description="Secure, scalable cloud hosting solutions powered by Amazon Web Services."
                icon={<FaCloud />} 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <ServiceCard 
                title="Support & Maintenance" 
                description="Ongoing technical support and maintenance to keep your site running smoothly."
                icon={<FaHeadset />} 
              />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

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