'use client';

import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

interface GlobeBackgroundProps {
  children: React.ReactNode;
}

export default function GlobeBackground({ children }: GlobeBackgroundProps) {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const vantaRef = useRef<HTMLDivElement>(null);

  // First ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
    
    // Check WebGL support
    if (typeof window !== 'undefined') {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        setWebGLSupported(!!gl && typeof gl.getShaderPrecisionFormat === 'function');
      } catch (e) {
        console.warn('Error checking WebGL support:', e);
        setWebGLSupported(false);
      }
    }
    
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted || vantaEffect || !webGLSupported) return;

    let effect = null;
    
    const loadEffect = async () => {
      // Make sure we're in a browser environment
      if (typeof window === 'undefined' || !vantaRef.current) {
        return;
      }
      
      try {
        // We've already checked WebGL support in the first useEffect
        
        // Dynamically import VANTA GLOBE with a fallback if WebGL precision format fails
        const VANTA = await import('vanta/dist/vanta.globe.min');
        
        if (!vantaRef.current || !VANTA.default) return;
        
        // Create a modified THREE instance with fallback for precision format
        const modifiedTHREE = { ...THREE };
        
        // Monkeypatch the WebGL renderer to handle missing precision format
        const originalRenderer = THREE.WebGLRenderer;
        modifiedTHREE.WebGLRenderer = function(...args) {
          const renderer = new originalRenderer(...args);
          const originalGetContext = renderer.getContext;
          
          if (originalGetContext) {
            renderer.getContext = function() {
              const gl = originalGetContext.apply(this, arguments);
              if (gl && !gl.getShaderPrecisionFormat) {
                gl.getShaderPrecisionFormat = function() {
                  return { precision: 23, rangeMax: 127, rangeMin: 127 };
                };
              }
              return gl;
            };
          }
          
          return renderer;
        };
        
        effect = VANTA.default({
          el: vantaRef.current,
          THREE: modifiedTHREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 400,
          minWidth: 400,
          scale: 1.0,
          scaleMobile: 1.0,
          color: '#0284c7',
          color2: '#0ea5e9',
          backgroundColor: '#0f172a',
          size: 0.6,
          speed: 0.3
        });
        
        setVantaEffect(effect);
      } catch (error) {
        console.error("Failed to initialize VANTA effect:", error);
      }
    };
    
    // Only run on client side
    loadEffect();
    
    // Cleanup function
    return () => {
      if (effect) effect.destroy();
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, mounted, webGLSupported]);

  // Add a fallback static background if not mounted yet, if WebGL is not supported, or if there's an error
  if (!mounted || !webGLSupported) {
    return (
      <>
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.2] bg-[length:50px_50px]"></div>
          </div>
        </div>
        <div className="relative z-10 min-h-screen w-full overflow-y-auto">{children}</div>
      </>
    );
  }
  
  return (
    <>
      <div ref={vantaRef} className="fixed inset-0 z-0"></div>
      <div className="relative z-10 min-h-screen w-full overflow-y-auto">{children}</div>
    </>
  );
}