'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ShaderAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const timeRef = useRef(1.0);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !webGLSupported) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.Camera();
    camera.position.z = 1;
    cameraRef.current = camera;

    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2(width, height) },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      varying vec2 vUv;
        
      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      float random (vec2 st) {
          return fract(sin(dot(st.xy,
                               vec2(12.9898,78.233)))*
              43758.5453123);
      }

      void main(void) {
        vec2 uv = (vUv * 2.0 - 1.0) * (resolution.xy / min(resolution.x, resolution.y));
        
        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256, 256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);       
          
        float t = time*0.06+random(uv.x)*0.4;
        float lineWidth = 0.0008;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));        
          }
        }

        gl_FragColor = vec4(color[2],color[1],color[0],1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    } catch (e) {
      setWebGLSupported(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const handleResize = () => {
      if (!rendererRef.current || !materialRef.current || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      rendererRef.current.setSize(w, h);
      materialRef.current.uniforms.resolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !materialRef.current) return;
      rafRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.05;
      materialRef.current.uniforms.time.value = timeRef.current;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      if (materialRef.current) materialRef.current.dispose();
      if (geometryRef.current) geometryRef.current.dispose();
    };
  }, [webGLSupported]);

  if (!webGLSupported) return null;

  return <div ref={containerRef} className="w-full h-full absolute inset-0 z-0 overflow-hidden" style={{ opacity: 0.35 }} />;
};
