'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-darker border-t border-gray-800">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">SoleCloud</h3>
            <p className="text-gray-400 mb-4">
              Modern cloud solutions for visionary organizations. 
              Empowering digital transformation through purpose and performance.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <FaEnvelope className="text-primary mr-3" />
                <a 
                  href="mailto:contact@solecloud.io" 
                  className="hover:text-primary transition-colors duration-300"
                >
                  contact@solecloud.io
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/solecloud.io" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300 text-2xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-500">
            © 2025 SoleCloud LLC. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
} 