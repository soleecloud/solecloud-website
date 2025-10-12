'use client';

import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

interface CloudBackgroundProps {}

export default function CloudBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const vantaRef = useRef<HTMLDivElement>(null);

  // Check if the user is on a mobile device
  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // More comprehensive mobile detection
      const isMobile = isMobileDevice || (isSmallScreen && isTouchDevice);
      setIsMobile(isMobile);
      
      // Debug logging
      console.log('Mobile detection:', {
        userAgent: userAgent.substring(0, 50) + '...',
        isMobileDevice,
        isSmallScreen,
        isTouchDevice,
        finalIsMobile: isMobile,
        screenWidth: window.innerWidth
      });
    }
  }, []);

  // Initialize Vanta.js effect only on desktop devices
  useEffect(() => {
    if (!isClient || isMobile || vantaEffect) return;

    // Only import Vanta on desktop
    const loadVanta = async () => {
      try {
        // Dynamic import to avoid loading on server side
        const VANTA = await import('vanta/dist/vanta.clouds.min');
        
        if (!vantaRef.current || !VANTA.default) return;
        
        // Initialize the effect
        const effect = VANTA.default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
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
          speed: 1.0
        });
        
        setVantaEffect(effect);
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
  }, [vantaEffect, isMobile, isClient]);

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 z-[-1]"
      style={{
        background: isMobile 
          ? 'linear-gradient(to bottom, #68b8d7, #93c5e4)' 
          : undefined
      }}
    >
      {/* Enhanced Mobile Background with Floating Mist */}
      {isClient && (
        <>
          {/* Floating Animated Mist SVG - Always show on mobile/small screens */}
          <div className="absolute inset-x-0 bottom-0 z-0 opacity-40 animate-pulse-slow md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full h-auto"
            >
              <path
                fill="#0096FF"
                fillOpacity="0.25"
                d="M0,160L80,186.7C160,213,320,267,480,277.3C640,288,800,256,960,224C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              />
            </svg>
          </div>

          {/* Glow Accent Layer - Mobile only */}
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-[#0096FF]/30 blur-[120px] rounded-full z-0 md:hidden" />

          {/* Second Mist Layer for Depth - Mobile only */}
          <div className="absolute inset-x-0 bottom-10 z-0 opacity-15 animate-pulse-slower md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full h-auto"
            >
              <path
                fill="#FFFFFF"
                fillOpacity="0.2"
                d="M0,160L80,186.7C160,213,320,267,480,277.3C640,288,800,256,960,224C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}