'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type TechItem = {
  name: string;
  description: string;
  category: 'frontend' | 'backend' | 'cloud';
};

const techItems: TechItem[] = [
  { 
    name: 'React', 
    description: 'Building interactive UIs with the most popular frontend library',
    category: 'frontend'
  },
  { 
    name: 'Next.js', 
    description: 'The React framework for production that enables SSR and static site generation',
    category: 'frontend'
  },
  { 
    name: 'TypeScript', 
    description: 'Adding type safety to JavaScript for more reliable code',
    category: 'frontend'
  },
  { 
    name: 'Tailwind CSS', 
    description: 'Utility-first CSS framework for rapidly building custom designs',
    category: 'frontend'
  },
  { 
    name: 'Node.js', 
    description: 'JavaScript runtime for building scalable network applications',
    category: 'backend'
  },
  { 
    name: 'Express', 
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    category: 'backend'
  },
  { 
    name: 'MongoDB', 
    description: 'Document database for modern applications',
    category: 'backend'
  },
  { 
    name: 'AWS EC2', 
    description: 'Scalable computing capacity in the cloud',
    category: 'cloud'
  },
  { 
    name: 'AWS S3', 
    description: 'Object storage built to store and retrieve any amount of data',
    category: 'cloud'
  },
  { 
    name: 'AWS Lambda', 
    description: 'Run code without thinking about servers or clusters',
    category: 'cloud'
  },
  { 
    name: 'AWS CloudFront', 
    description: 'Fast content delivery network (CDN) service',
    category: 'cloud'
  },
];

type FilterType = 'all' | 'frontend' | 'backend' | 'cloud';

export default function TechStack() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const filteredItems = filter === 'all' 
    ? techItems 
    : techItems.filter(item => item.category === filter);
  
  const categories: {label: string, value: FilterType}[] = [
    { label: 'All', value: 'all' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Cloud', value: 'cloud' },
  ];
  
  return (
    <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-primary">Our Tech Stack</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setFilter(category.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === category.value
                ? 'bg-primary text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <motion.div
            key={item.name}
            layoutId={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`relative p-4 rounded-lg cursor-pointer transition-all ${
              hoveredItem === item.name 
                ? 'bg-primary/20 shadow-lg shadow-primary/20' 
                : 'bg-slate-700/50 hover:bg-slate-700'
            }`}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="mb-2 font-medium text-white">{item.name}</div>
            
            {hoveredItem === item.name && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-300"
              >
                {item.description}
              </motion.div>
            )}
            
            <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
              item.category === 'frontend' ? 'bg-blue-400' :
              item.category === 'backend' ? 'bg-green-400' :
              'bg-purple-400'
            }`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}