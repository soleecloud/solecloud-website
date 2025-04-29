'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type Stat = {
  title: string;
  value: number;
  unit: string;
  icon: string; // Using emoji for simplicity
};

const stats: Stat[] = [
  { title: 'Projects Completed', value: 50, unit: '+', icon: '🚀' },
  { title: 'Client Satisfaction', value: 99, unit: '%', icon: '⭐' },
  { title: 'Years Experience', value: 7, unit: '+', icon: '⏱️' },
  { title: 'Cloud Migrations', value: 30, unit: '+', icon: '☁️' },
];

export default function StatsCounter() {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const countingCompleted = useRef(false);

  useEffect(() => {
    if (!inView || countingCompleted.current) return;
    
    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setCounters(prev => {
          const newCounters = [...prev];
          
          if (newCounters[index] < stat.value) {
            // Calculate step size based on value to create a smooth animation effect
            const step = Math.max(1, Math.ceil(stat.value / 30));
            newCounters[index] = Math.min(newCounters[index] + step, stat.value);
          }
          
          // Check if all counters have reached their target
          const allDone = newCounters.every((val, idx) => val >= stats[idx].value);
          if (allDone) {
            countingCompleted.current = true;
          }
          
          return newCounters;
        });
      }, 50); // Update every 50ms for a smooth counting effect
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [inView]);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-slate-800/70 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-primary/20 transition-all duration-300 transform hover:scale-105"
        >
          <div className="text-3xl mb-3">{stat.icon}</div>
          <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
            {counters[index]}{stat.unit}
          </div>
          <div className="text-sm text-gray-300">{stat.title}</div>
        </motion.div>
      ))}
    </div>
  );
}