'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface FullScreenVideoBackgroundProps {
  children: React.ReactNode;
  className?: string;
  videoSrc?: string;
  fallbackImage?: string;
}

export default function FullScreenVideoBackground({ 
  children, 
  className = '', 
  videoSrc = '/videos/cloud-background.mp4',
  fallbackImage = '/images/cloud-background-fallback.jpg'
}: FullScreenVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showFallback, setShowFallback] = useState(false); // Start trying to load video
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      console.log('Video loaded successfully');
      setIsVideoLoaded(true);
      setShowFallback(false);
    };

    const handleError = (e: Event) => {
      console.error('Video loading error:', e);
      setVideoError(true);
      setShowFallback(true);
      setIsVideoLoaded(true);
    };

    const handleCanPlay = () => {
      console.log('Video can play');
      video.play().then(() => {
        console.log('Video started playing');
        setIsVideoPlaying(true);
      }).catch((error) => {
        console.error('Video autoplay failed:', error);
        setShowFallback(true);
      });
    };

    const handleLoadStart = () => {
      console.log('Video load started');
    };

    const handleProgress = () => {
      console.log('Video loading progress');
    };

    // Add all event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    // Set video properties
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = 'auto';

    // Set a timeout to fallback if video takes too long
    const timeoutId = setTimeout(() => {
      if (!isVideoLoaded) {
        console.log('Video loading timeout, falling back to animation');
        setShowFallback(true);
        setIsVideoLoaded(true);
      }
    }, 10000); // 10 second timeout

    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [isVideoLoaded]);

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Full Screen Video Background */}
      <div className="fixed inset-0 z-0">
        {!showFallback && !videoError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            poster={fallbackImage}
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Animated gradient background fallback
          <div className="w-full h-full relative">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 animate-pulse" 
                 style={{ animationDuration: '8s' }} />
            
            {/* Moving gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"
                 style={{ animationDuration: '6s', animationDelay: '2s' }} />
            
            {/* Cloud-like floating elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-1/2 right-1/4 w-24 h-24 bg-cyan-300/10 rounded-full blur-xl"
                animate={{
                  x: [0, -80, 0],
                  y: [0, 60, 0],
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 5
                }}
              />
              <motion.div
                className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-purple-400/10 rounded-full blur-xl"
                animate={{
                  x: [0, 120, 0],
                  y: [0, -80, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 10
                }}
              />
            </div>
          </div>
        )}
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/80" />
        
        {/* Animated overlay elements */}
        <div className="absolute inset-0">
          {/* Floating particles overlay */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" 
               style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-40 animate-pulse" 
               style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-50 animate-pulse" 
               style={{ animationDelay: '2s', animationDuration: '5s' }} />
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-green-400 rounded-full opacity-30 animate-pulse" 
               style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
          
          {/* Grid pattern overlay */}
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
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Loading overlay */}
      {!isVideoLoaded && (
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