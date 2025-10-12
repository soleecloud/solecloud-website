'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'hero' | 'services' | 'about' | 'contact';
}

export default function VideoBackground({ children, className = '', variant = 'hero' }: VideoBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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

    // Animation variables
    let animationId: number;
    let time = 0;

    // Particle system for cloud infrastructure
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      type: string;
      color: string;
    }> = [];

    // Get particle configuration based on variant
    const getVariantConfig = () => {
      switch (variant) {
        case 'services':
          return {
            particleCount: 40,
            types: ['server', 'database', 'network', 'security', 'aws'],
            colors: {
              server: '#3B82F6', // AWS Blue
              database: '#10B981', // Green for data
              network: '#8B5CF6', // Purple for connections
              security: '#EF4444', // Red for security
              aws: '#FF9900' // AWS Orange
            },
            speed: 0.3,
            connectionDistance: 120
          };
        case 'about':
          return {
            particleCount: 35,
            types: ['person', 'heart', 'partnership', 'values', 'faith'],
            colors: {
              person: '#3B82F6', // Blue for people
              heart: '#EC4899', // Pink for heart/values
              partnership: '#8B5CF6', // Purple for connections
              values: '#F59E0B', // Amber for values
              faith: '#10B981' // Green for faith
            },
            speed: 0.2,
            connectionDistance: 100
          };
        case 'contact':
          return {
            particleCount: 25,
            types: ['phone', 'email', 'location', 'communication', 'support'],
            colors: {
              phone: '#3B82F6', // Blue for communication
              email: '#10B981', // Green for email
              location: '#F59E0B', // Amber for location
              communication: '#8B5CF6', // Purple for connections
              support: '#EF4444' // Red for support
            },
            speed: 0.15,
            connectionDistance: 80
          };
        default: // hero
          return {
            particleCount: 50,
            types: ['server', 'data', 'connection', 'security'],
            colors: {
              server: '#3B82F6',
              data: '#10B981',
              connection: '#8B5CF6',
              security: '#EF4444'
            },
            speed: 0.5,
            connectionDistance: 100
          };
      }
    };

    const config = getVariantConfig();

    // Initialize particles based on variant
    const initParticles = () => {
      particles.length = 0;

      for (let i = 0; i < config.particleCount; i++) {
        const type = config.types[Math.floor(Math.random() * config.types.length)];
        const colors = config.colors;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.speed,
          vy: (Math.random() - 0.5) * config.speed,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          type,
          color: colors[type as keyof typeof colors] || '#3B82F6'
        });
      }
    };

    // Draw particle based on type and variant
    const drawParticle = (particle: typeof particles[0]) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      
      switch (particle.type) {
        // Services page particles
        case 'server':
          // Draw server icon (rectangle with lines)
          ctx.fillStyle = particle.color;
          ctx.fillRect(particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 2);
          ctx.strokeStyle = '#1E40AF';
          ctx.lineWidth = 1;
          ctx.strokeRect(particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 2);
          break;
          
        case 'database':
          // Draw database icon (cylinder)
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.ellipse(particle.x, particle.y - particle.size, particle.size, particle.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(particle.x, particle.y + particle.size, particle.size, particle.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillRect(particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 2);
          break;

        case 'aws':
          // Draw AWS logo style (smile)
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI);
          ctx.stroke();
          break;

        // About page particles
        case 'person':
          // Draw person icon (stick figure)
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y - particle.size, particle.size * 0.5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - particle.size * 0.5);
          ctx.lineTo(particle.x, particle.y + particle.size);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.size, particle.y);
          ctx.lineTo(particle.x + particle.size, particle.y);
          ctx.stroke();
          break;

        case 'heart':
          // Draw heart icon
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y + particle.size);
          ctx.bezierCurveTo(
            particle.x - particle.size, particle.y, 
            particle.x - particle.size, particle.y - particle.size,
            particle.x, particle.y - particle.size
          );
          ctx.bezierCurveTo(
            particle.x + particle.size, particle.y - particle.size,
            particle.x + particle.size, particle.y,
            particle.x, particle.y + particle.size
          );
          ctx.fill();
          break;

        case 'partnership':
          // Draw handshake/connection
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.size, particle.y);
          ctx.lineTo(particle.x + particle.size, particle.y);
          ctx.stroke();
          break;

        // Contact page particles
        case 'phone':
          // Draw phone icon
          ctx.fillStyle = particle.color;
          ctx.fillRect(particle.x - particle.size, particle.y - particle.size * 1.5, particle.size * 2, particle.size * 3);
          ctx.strokeStyle = '#1E40AF';
          ctx.lineWidth = 1;
          ctx.strokeRect(particle.x - particle.size, particle.y - particle.size * 1.5, particle.size * 2, particle.size * 3);
          break;

        case 'email':
          // Draw email icon
          ctx.fillStyle = particle.color;
          ctx.fillRect(particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 1.5);
          ctx.strokeStyle = '#1E40AF';
          ctx.lineWidth = 1;
          ctx.strokeRect(particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 1.5);
          break;

        case 'location':
          // Draw location pin
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - particle.size);
          ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
          ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
          ctx.closePath();
          ctx.fill();
          break;

        // Default particles (hero and fallback)
        case 'data':
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'connection':
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.size, particle.y);
          ctx.lineTo(particle.x + particle.size, particle.y);
          ctx.stroke();
          break;
          
        case 'security':
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - particle.size);
          ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
          ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
          ctx.closePath();
          ctx.fill();
          break;

        default:
          // Fallback to circle
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
      
      ctx.restore();
    };

    // Draw connections between nearby particles
    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
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

    // Animation loop
    const animate = () => {
      time += 0.01;
      
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0F172A'); // Dark blue
      gradient.addColorStop(1, '#1E293B'); // Slate
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Add subtle wave motion
        particle.y += Math.sin(time + particle.x * 0.01) * 0.2;

        // Draw particle
        drawParticle(particle);
      });

      // Draw connections
      drawConnections();

      // Add floating cloud elements (only for hero and services)
      if (variant === 'hero' || variant === 'services') {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.05)';
        for (let i = 0; i < 3; i++) {
          const x = (time * 20 + i * 200) % (canvas.width + 200) - 100;
          const y = 100 + i * 150;
          const size = 50 + Math.sin(time + i) * 10;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    initParticles();
    animate();
    setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [variant]);

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Video/Animation Background */}
      <div className="fixed inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ background: 'linear-gradient(to bottom, #0F172A, #1E293B)' }}
        />
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/40" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="fixed inset-0 z-20 bg-gray-900 flex items-center justify-center"
        >
          <div className="text-primary text-xl">Loading SoleCloud...</div>
        </motion.div>
      )}
    </div>
  );
} 