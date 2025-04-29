'use client';

import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

interface CloudBackgroundProps {
  children: React.ReactNode;
}

export default function CloudBackground({ children }: CloudBackgroundProps) {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only initialize Vanta when component is mounted and THREE is available
    if (!vantaRef.current || vantaEffect) return;
    
    try {
      const effect = CLOUDS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        speed: 0.5, // Slower, more subtle movement
        cloudColor: '#0284c7',
        backgroundColor: '#020617',
        skyColor: '#0f172a',
        sunColor: '#0284c7',
        sunGlareColor: '#0284c7',
        sunlightColor: '#0284c7',
        cloudShadowColor: '#020617',
        cloudColorMultiplier: 0.7,
        scale: 1.2,
        scaleMobile: 1.5,
        quantity: 3, // Fewer clouds for lighter performance
        backgroundAlpha: 0.9
      });
      setVantaEffect(effect);
    } catch (error) {
      console.error("Failed to initialize VANTA effect:", error);
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]); // Only depend on vantaEffect to ensure it runs only once
  
  return (
    <div className="absolute inset-0 z-[-10] overflow-hidden pointer-events-none">
      <div 
        ref={vantaRef} 
        className="absolute inset-0 w-full h-full"
        style={{ position: 'fixed' }} // Fixed position to keep clouds in view
      ></div>
      <div className="relative w-full h-full">{children}</div>
    </div>
  );
}