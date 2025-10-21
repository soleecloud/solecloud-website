'use client';

import { useEffect, useState, useRef } from 'react';

interface OptimizedCloudBackgroundProps {}

export default function OptimizedCloudBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if the user is on a mobile device
  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      const isMobile = isMobileDevice || (isSmallScreen && isTouchDevice);
      setIsMobile(isMobile);
    }
  }, []);

  // Intersection Observer to only run animations when visible
  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isClient]);

  // Only load Vanta on desktop and when visible
  useEffect(() => {
    if (!isClient || isMobile || !isVisible) return;

    let vantaEffect: any = null;

    const loadVanta = async () => {
      try {
        // Dynamic import to avoid loading on server side
        const THREE = await import('three');
        const VANTA = await import('vanta/dist/vanta.clouds.min');
        
        if (!containerRef.current || !VANTA.default) return;
        
        // Initialize the effect with reduced settings
        vantaEffect = VANTA.default({
          el: containerRef.current,
          THREE: THREE,
          mouseControls: false, // Disable mouse controls for better performance
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          skyColor: 0x68b8d7,
          cloudColor: 0xafdeff,
          cloudShadowColor: 0x1d5c7c,
          sunColor: 0xff9919,
          sunGlareColor: 0xffc561,
          sunlightColor: 0xf2bf95,
          speed: 0.5 // Reduced speed for better performance
        });
      } catch (error) {
        console.error('Failed to load Vanta effect:', error);
      }
    };
    
    loadVanta();
    
    // Cleanup function
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [isVisible, isMobile, isClient]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[-1]"
      style={{
        background: isMobile 
          ? 'linear-gradient(to bottom, #68b8d7, #93c5e4)' 
          : undefined
      }}
    >
      {/* Optimized Mobile Background */}
      {isClient && isMobile && (
        <>
          {/* Simplified floating mist - only one layer */}
          <div className="absolute inset-x-0 bottom-0 z-0 opacity-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full h-auto"
            >
              <path
                fill="#0096FF"
                fillOpacity="0.2"
                d="M0,160L80,186.7C160,213,320,267,480,277.3C640,288,800,256,960,224C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              />
            </svg>
          </div>

          {/* Single glow accent */}
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] bg-[#0096FF]/20 blur-[80px] rounded-full z-0" />
        </>
      )}
    </div>
  );
}
