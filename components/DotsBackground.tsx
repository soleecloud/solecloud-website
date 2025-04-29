'use client';

import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

interface DotsBackgroundProps {
  children: React.ReactNode;
}

export default function DotsBackground({ children }: DotsBackgroundProps) {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const [errorLoading, setErrorLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted || vantaEffect) return;

    let effect = null;
    
    const loadEffect = async () => {
      // Make sure we're in a browser environment
      if (typeof window === 'undefined' || !vantaRef.current) {
        return;
      }
      
      try {
        // Dynamically import VANTA DOTS and make sure THREE is available
        const VANTA = await import('vanta/dist/vanta.dots.min');
        
        if (!vantaRef.current || !VANTA.default) return;
        
        // Ensure THREE is properly loaded
        if (!THREE || !THREE.PerspectiveCamera) {
          console.error("THREE.js not properly loaded");
          setErrorLoading(true);
          return;
        }
        
        effect = VANTA.default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 400,
          minWidth: 400,
          scale: 1.0,
          scaleMobile: 1.0,
          color: '#0284c7',
          color2: '#0284c7',
          backgroundColor: '#0f172a',
          size: 2.5,
          spacing: 25.0,
          showLines: true,
          speed: 0.3
        });
        
        setVantaEffect(effect);
      } catch (error) {
        console.error("Failed to initialize VANTA effect:", error);
        setErrorLoading(true);
      }
    };
    
    // Only run on client side
    loadEffect();
    
    // Cleanup function
    return () => {
      if (effect) effect.destroy();
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, mounted]);

  // Add a fallback static background if VANTA fails to load or if we're not mounted yet
  if (errorLoading || !mounted) {
    return (
      <div className="fixed inset-0 z-0 bg-[#0f172a]">
        <div className="relative z-10 min-h-screen py-16 px-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={vantaRef} className="fixed inset-0 z-0">
      <div className="relative z-10 min-h-screen py-16 px-4">
        {children}
      </div>
    </div>
  );
}