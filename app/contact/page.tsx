'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import AnimatedSection from '@/components/AnimatedSection';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ status: 'success' | 'error' | null; message: string }>({
    status: null,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // In a real application, you would send this data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        status: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        status: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-28 md:pt-20">
      <div className="section-container overflow-y-auto">
        <AnimatedSection className="mb-12 text-center">
          <motion.h1 
            className="text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Have a question or want to discuss a project? Get in touch with our team.
          </motion.p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <AnimatedSection>
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8"
              whileHover={{ y: -5, boxShadow: "0 12px 24px -10px rgba(2, 132, 199, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-primary">Get In Touch</h2>
              <div className="space-y-6 sm:space-y-4 py-2">
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.div 
                    className="mt-1 mr-4 text-primary text-lg"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <FaMapMarkerAlt />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-base sm:text-sm">Location</h3>
                    <p className="text-gray-400">Based in Maryland, USA</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div 
                    className="mt-1 mr-4 text-primary text-lg"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <FaEnvelope />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-base sm:text-sm">Email</h3>
                    <p className="text-gray-400">soleecloud@gmail.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className="mt-1 mr-4 text-primary text-lg"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <FaPhone />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-base sm:text-sm">Phone</h3>
                    <p className="text-gray-400">(240) 300-0382</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
              whileHover={{ y: -5, boxShadow: "0 12px 24px -10px rgba(2, 132, 199, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-primary">Business Hours</h2>
              <ul className="space-y-4 sm:space-y-2 text-gray-400 py-2">
                <motion.li 
                  className="flex flex-col sm:flex-row sm:justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <span className="font-medium mb-1 sm:mb-0">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </motion.li>
                <motion.li 
                  className="flex flex-col sm:flex-row sm:justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <span className="font-medium mb-1 sm:mb-0">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </motion.li>
                <motion.li 
                  className="flex flex-col sm:flex-row sm:justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <span className="font-medium mb-1 sm:mb-0">Sunday:</span>
                  <span>Closed</span>
                </motion.li>
              </ul>
            </motion.div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.3}>
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
              whileHover={{ y: -5, boxShadow: "0 12px 24px -10px rgba(2, 132, 199, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-primary">Send Us a Message</h2>
              
              {submitStatus.status && (
                <motion.div 
                  className={`mb-6 p-4 rounded ${
                    submitStatus.status === 'success' ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitStatus.message}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit}>
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  />
                </motion.div>
                
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  />
                </motion.div>
                
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <label htmlFor="subject" className="block mb-1 font-medium">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Website Development">Website Development</option>
                    <option value="AWS Hosting">AWS Hosting</option>
                    <option value="Support">Technical Support</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>
                
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <label htmlFor="message" className="block mb-1 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  ></textarea>
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex justify-center items-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {isSubmitting ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : null}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}