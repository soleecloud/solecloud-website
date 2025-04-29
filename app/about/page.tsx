'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '@/components/AnimatedSection';
import TechStack from '@/components/TechStack';
import StatsCounter from '@/components/StatsCounter';
import dynamic from 'next/dynamic';

// Dynamically import the GlobeBackground component to prevent SSR issues
const GlobeBackground = dynamic(() => import('@/components/GlobeBackground'), { 
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-[#0f172a]">
      <div className="relative z-10 min-h-screen py-16 px-4"></div>
    </div>
  )
});

export default function About() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Animation variant for the underline
  const underlineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%', 
      transition: { 
        duration: 0.6, 
        ease: "easeInOut" 
      } 
    }
  };

  // Setup ref for heading section
  const [headingRef, headingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Card hover animation properties
  const cardHoverAnimation = {
    scale: 1.05,
    boxShadow: "0 10px 30px -10px rgba(2, 132, 199, 0.3)",
    transition: { duration: 0.2 }
  };

  // Wait until component is mounted on client-side to render Vanta background
  if (!isMounted) {
    return (
      <>
        <div className="fixed inset-0 z-0 bg-[#0f172a]"></div>
        <div className="pt-36 md:pt-32 pb-12 px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Content placeholder while loading */}
            <div className="relative mb-12 text-center mx-auto z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                Connecting the Dots with Sole Cloud
              </h1>
            </div>
            <div className="space-y-8 animate-pulse">
              <div className="w-full h-48 bg-slate-800 rounded-lg"></div>
              <div className="w-full h-48 bg-slate-800 rounded-lg"></div>
              <div className="w-full h-48 bg-slate-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <GlobeBackground>
      <div className="pt-36 md:pt-32 pb-12 px-4 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            ref={headingRef}
            className="relative mb-8 text-center mx-auto z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Connecting the Dots with Sole Cloud
            </h1>
            <motion.div 
              className="h-1 bg-primary mx-auto mt-2 rounded"
              initial="hidden"
              animate={headingInView ? "visible" : "hidden"}
              variants={underlineVariants}
              style={{ maxWidth: '200px' }}
            />
          </motion.div>
          
          <AnimatedSection className="w-full mb-10" delay={0.05}>
            <StatsCounter />
          </AnimatedSection>
          
          <div className="space-y-8">
            <AnimatedSection className="w-full" delay={0.1}>
              <motion.div 
                className="card"
                whileHover={cardHoverAnimation}
              >
                <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
                <p className="text-gray-300">
                  At Sole Cloud, we&apos;re dedicated to empowering businesses with cutting-edge web solutions 
                  that leverage the full potential of cloud technology. Our mission is to help our clients 
                  establish a powerful online presence that drives growth and success.
                </p>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection className="w-full" delay={0.2}>
              <motion.div 
                className="card"
                whileHover={cardHoverAnimation}
              >
                <h2 className="text-2xl font-semibold mb-4 text-primary">Who We Are</h2>
                <p className="text-gray-300 mb-4">
                  We are a team of passionate developers, designers, and cloud experts who combine 
                  technical expertise with creative problem-solving. With years of experience in 
                  website development and AWS infrastructure, we bring a wealth of knowledge to 
                  every project.
                </p>
                <p className="text-gray-300">
                  Our approach is client-focused and results-driven. We take the time to understand 
                  your business goals and challenges, then craft tailored solutions that help you 
                  achieve measurable outcomes.
                </p>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection className="w-full" delay={0.3}>
              <motion.div 
                className="card"
                whileHover={cardHoverAnimation}
              >
                <h2 className="text-2xl font-semibold mb-4 text-primary">Our Approach</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>User-centric design that prioritizes ease of use and engagement</li>
                  <li>Modern development practices for fast, responsive websites</li>
                  <li>Secure, scalable cloud infrastructure built on AWS</li>
                  <li>Continuous support and optimization after launch</li>
                  <li>Transparent communication throughout the project lifecycle</li>
                </ul>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection className="w-full" delay={0.4}>
              <motion.div 
                className="card"
                whileHover={cardHoverAnimation}
              >
                <h2 className="text-2xl font-semibold mb-4 text-primary">Why Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Expertise</h3>
                    <p className="text-gray-400">Specialized knowledge in Next.js, React, and AWS services</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Reliability</h3>
                    <p className="text-gray-400">Consistent delivery and ongoing support you can count on</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Innovation</h3>
                    <p className="text-gray-400">Cutting-edge solutions that keep you ahead of the curve</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Partnership</h3>
                    <p className="text-gray-400">We&apos;re invested in your long-term success</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection className="w-full" delay={0.5}>
              <TechStack />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </GlobeBackground>
  );
}