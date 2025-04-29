'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <motion.div 
      className="card group relative h-full overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="absolute -right-6 -top-6 opacity-5 text-8xl group-hover:opacity-10 
                    transition-opacity duration-500 group-hover:text-primary">
        {icon}
      </div>
      
      <div className="relative z-10">
        <motion.div 
          className="text-primary mb-4 text-3xl"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
        
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 inline-block">
          {title}
        </h3>
        
        <div className="w-0 h-0.5 bg-primary/70 group-hover:w-16 transition-all duration-300 mb-3"></div>
        
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}