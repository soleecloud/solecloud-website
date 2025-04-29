'use client';

import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

interface CloudBackgroundProps {
  children?: React.ReactNode;
}

export default function CloudBackground({ children }: CloudBackgroundProps) {
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
      setIsMobile(mobileRegex.test(userAgent));
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
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Vanta background container */}
      {isClient && (
        <div 
          ref={vantaRef} 
          className="absolute top-0 left-0 w-full h-full z-[-1]"
          style={{
            background: isMobile 
              ? 'linear-gradient(to bottom, #68b8d7, #93c5e4)' 
              : undefined
          }}
        >
          {/* Static background for mobile */}
          {isMobile && (
            <div className="absolute inset-0 bg-cover bg-center opacity-40"
                 style={{ 
                   backgroundImage: 'url("/static-clouds.jpg")',
                   filter: 'blur(1px)'
                 }} />
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}