'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaCloud, FaHeadset, FaMobileAlt, FaSearchPlus, FaShieldAlt, FaAngleRight, FaCogs } from 'react-icons/fa';
import AnimatedSection from '@/components/AnimatedSection';
import GlobeBackground from '@/components/GlobeBackground';

export default function Services() {

  const services = [
    {
      id: 'webdev',
      icon: <FaLaptopCode className="text-4xl text-blue-400" />,
      title: 'Website Development',
      description: 'Custom, responsive website design and development using Next.js, React, and other modern technologies. Our websites are optimized for performance, accessibility, and SEO.',
      features: [
        'Custom Design & Development',
        'Responsive Mobile-First Approach',
        'Performance Optimization',
        'Content Management Systems',
        'E-commerce Solutions'
      ]
    },
    {
      id: 'aws',
      icon: <FaCloud className="text-4xl text-blue-400" />,
      title: 'AWS Hosting',
      description: 'Secure, scalable cloud hosting solutions powered by Amazon Web Services. We handle the infrastructure so you can focus on your business.',
      features: [
        'Managed AWS Infrastructure',
        'Automated Deployment Pipelines',
        'Load Balancing & Auto-scaling',
        'Database Management',
        'CDN Integration'
      ]
    },
    {
      id: 'support',
      icon: <FaHeadset className="text-4xl text-blue-400" />,
      title: 'Support & Maintenance',
      description: 'Ongoing technical support and maintenance to keep your site running smoothly. Regular updates, backups, and performance monitoring.',
      features: [
        '24/7 Monitoring',
        'Regular Updates & Security Patches',
        'Backup & Disaster Recovery',
        'Performance Optimization',
        'Technical Support'
      ]
    },
    {
      id: 'mobile',
      icon: <FaMobileAlt className="text-4xl text-blue-400" />,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications that work seamlessly on iOS and Android devices using React Native and other modern frameworks.',
      features: [
        'Cross-Platform Development',
        'Native App Experience',
        'Push Notifications',
        'Offline Functionality',
        'App Store Submission'
      ]
    },
    {
      id: 'seo',
      icon: <FaSearchPlus className="text-4xl text-blue-400" />,
      title: 'SEO & Analytics',
      description: 'Improve your site\'s visibility in search engines and gain insights into user behavior with our SEO and analytics services.',
      features: [
        'Keyword Research & Strategy',
        'On-Page SEO Optimization',
        'Analytics Setup & Reporting',
        'Performance Monitoring',
        'Conversion Rate Optimization'
      ]
    },
    {
      id: 'security',
      icon: <FaShieldAlt className="text-4xl text-blue-400" />,
      title: 'Security Solutions',
      description: 'Protect your digital assets with our comprehensive security solutions, including SSL certificates, firewall configuration, and more.',
      features: [
        'SSL/TLS Implementation',
        'Web Application Firewall',
        'DDoS Protection',
        'Regular Security Audits',
        'Compliance Support'
      ]
    }
  ];

  return (
    <GlobeBackground>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-24 pb-16 sm:pb-24">
        <AnimatedSection className="mb-16 text-center">
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute -z-10 -inset-1 rounded-lg opacity-30 blur-xl bg-blue-500"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.h1 
                className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
              >
                Solutions in Motion
              </motion.h1>
              <motion.div 
                className="absolute -z-10 inset-0 opacity-60"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaCogs className="text-blue-400/20 text-7xl absolute -top-4 -right-12" />
                <FaCogs className="text-blue-400/20 text-5xl absolute -bottom-4 -left-8" />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Comprehensive web and cloud solutions to help your business thrive online.
          </motion.p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 h-full flex flex-col"
            >
              <motion.div 
                className="mb-5 p-3 bg-gray-900 rounded-full w-16 h-16 flex items-center justify-center"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {service.icon}
              </motion.div>
              <h2 className="text-2xl font-semibold mb-3 text-blue-400">{service.title}</h2>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <div className="mt-auto">
                <h3 className="text-lg font-medium mb-3 text-white">Key Features:</h3>
                <ul className="text-gray-300 space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-blue-400 mr-2 mt-1"><FaAngleRight /></span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link href="/contact">
                  <motion.button 
                    className="mt-6 px-5 py-2 bg-gray-900 text-blue-400 rounded-md border border-blue-400 hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 flex items-center group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Us
                    <FaAngleRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatedSection className="mt-20 text-center" delay={0.3}>
          <h2 className="text-3xl font-bold mb-6 text-blue-400">Need a custom solution?</h2>
          <p className="mb-8 text-gray-300 max-w-2xl mx-auto">
            We can create tailored packages to meet your specific business needs.
            Contact us to discuss your project requirements.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/contact" 
              className="inline-block bg-blue-400 text-gray-900 font-medium py-3 px-8 rounded-md
              hover:bg-blue-500 transition-all duration-300 transform hover:shadow-[0_0_15px_rgba(2,132,199,0.6)]"
            >
              Get in Touch
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </GlobeBackground>
  );
}