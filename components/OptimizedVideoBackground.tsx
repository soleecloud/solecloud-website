'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedVideoBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'hero' | 'services' | 'about' | 'contact';
}

export default function OptimizedVideoBackground({ 
  children, 
  className = '', 
  variant = 'hero' 
}: OptimizedVideoBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number>();

  // Intersection Observer to only run animations when visible
  useEffect(() => {
    if (!canvasRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(canvasRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Reduced particle system for better performance
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Simplified particle configuration
    const getVariantConfig = () => {
      switch (variant) {
        case 'services':
          return { particleCount: 15, speed: 0.2, connectionDistance: 80 };
        case 'about':
          return { particleCount: 12, speed: 0.15, connectionDistance: 70 };
        case 'contact':
          return { particleCount: 10, speed: 0.1, connectionDistance: 60 };
        default: // hero
          return { particleCount: 20, speed: 0.3, connectionDistance: 90 };
      }
    };

    const config = getVariantConfig();

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#EF4444'];

      for (let i = 0; i < config.particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.speed,
          vy: (Math.random() - 0.5) * config.speed,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    // Simplified particle drawing
    const drawParticle = (particle: typeof particles[0]) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Simplified connections
    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Optimized animation loop with reduced frame rate
    let lastTime = 0;
    const targetFPS = 30; // Reduced from 60fps
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      // Clear canvas with simple background
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        drawParticle(particle);
      });

      // Draw connections (only every other frame for performance)
      if (Math.floor(currentTime / 100) % 2 === 0) {
        drawConnections();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    initParticles();
    animationRef.current = requestAnimationFrame(animate);
    setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, variant]);

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Optimized Background */}
      <div className="fixed inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ background: '#0F172A' }}
        />
        
        {/* Simplified overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-gray-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Simplified loading overlay */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-20 bg-gray-900 flex items-center justify-center"
        >
          <div className="text-blue-400 text-xl">Loading...</div>
        </motion.div>
      )}
    </div>
  );
}
