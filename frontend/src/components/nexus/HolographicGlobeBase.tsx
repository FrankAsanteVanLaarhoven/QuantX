"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

// Procedurally map a wireframe holographic sphere with geographic hot-nodes
function HolographicEarth() {
  const globeRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Custom Atmospheric Fresnel Shader
  const customShader = useMemo(() => {
     return {
         uniforms: {
             time: { value: 0 },
             color: { value: new THREE.Color("#0891b2") }
         },
         vertexShader: `
             varying vec3 vNormal;
             varying vec3 vPosition;
             uniform float time;
             
             void main() {
                 vNormal = normalize(normalMatrix * normal);
                 vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
                 
                 // Procedural geometric pulse
                 vec3 pos = position;
                 float distortion = sin(pos.y * 10.0 + time * 2.0) * 0.02;
                 pos += normal * distortion;
                 
                 gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
             }
         `,
         fragmentShader: `
             varying vec3 vNormal;
             varying vec3 vPosition;
             uniform vec3 color;
             uniform float time;
             
             void main() {
                 // Institutional Atmospheric Fresnel Rim Light
                 vec3 viewDirection = normalize(-vPosition);
                 float fresnel = dot(viewDirection, vNormal);
                 fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
                 fresnel = pow(fresnel, 3.0); // Intensity curvature
                 
                 vec3 finalColor = color + vec3(fresnel * 0.8);
                 
                 // Holographic Scanlines
                 float scanline = sin(vPosition.y * 40.0 - time * 5.0) * 0.5 + 0.5;
                 finalColor += vec3(0.0, 0.8, 1.0) * scanline * 0.3; // Cyan distortion
                 
                 gl_FragColor = vec4(finalColor, fresnel * 0.8 + 0.1);
             }
         `
     }
  }, []);

  useFrame((state) => {
      if (globeRef.current) {
          globeRef.current.rotation.y += 0.001; // Constant rotation
      }
      if (materialRef.current) {
          materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      }
  });

  return (
    <group ref={globeRef}>
      {/* Advanced WebGL Shader Wireframe Core */}
      <Sphere args={[2, 64, 64]}>
        <shaderMaterial 
            ref={materialRef}
            attach="material" 
            args={[customShader]} 
            wireframe={true} 
            transparent={true}
        />
      </Sphere>

      {/* Internal Glowing Core */}
      <Sphere args={[1.9, 32, 32]}>
        <meshBasicMaterial 
            color="#000000" 
            transparent 
            opacity={0.9} 
        />
      </Sphere>
      
      {/* Red Hot-Spot Nodes (Representing Dark Pools/Choke Points) */}
      <mesh position={[1.4, 0.8, 1.1]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-1.2, 0.5, 1.5]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      
      {/* Green Growth Nodes (TAM Vectors / BCG Stars) */}
      <mesh position={[0.5, 1.2, -1.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      <mesh position={[-0.8, -0.6, -1.5]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>

      {/* Blue Logic Nodes */}
      <mesh position={[0, -1, -1.7]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>

      {/* WebGL Connection Arches */}
      <SignalArch start={[1.4, 0.8, 1.1]} end={[-1.2, 0.5, 1.5]} color="#ef4444" label="Liquidity Drain" />
      <SignalArch start={[-1.2, 0.5, 1.5]} end={[0, -1, -1.7]} color="#22d3ee" label="StatArb Lock" />
      
      {/* Fundamental Arches */}
      <SignalArch start={[0.5, 1.2, -1.3]} end={[1.4, 0.8, 1.1]} color="#22c55e" label="TAM Growth Vector" />
      <SignalArch start={[-0.8, -0.6, -1.5]} end={[0, -1, -1.7]} color="#22c55e" label="LTV/CAC Efficiency" />
    </group>
  );
}

// Draw a curved line between 3D vectors
function SignalArch({ start, end, color, label }: { start: [number, number, number], end: [number, number, number], color: string, label?: string }) {
    const points = useMemo(() => {
        const vStart = new THREE.Vector3(...start);
        const vEnd = new THREE.Vector3(...end);
        
        // Find midpoint and push it outward to create an arch
        const midPoint = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
        const dist = vStart.distanceTo(vEnd);
        midPoint.normalize().multiplyScalar(2 + dist * 0.4); 

        const curve = new THREE.QuadraticBezierCurve3(vStart, midPoint, vEnd);
        return curve.getPoints(50);
    }, [start, end]);

    return (
        <Line 
            points={points} 
            color={color} 
            lineWidth={2}
            transparent 
            opacity={0.6}
        />
    );
}

export function GlobalHologramTerminal() {
    return (
        <div className="w-full h-full bg-[#03060c] border border-emerald-800/30 rounded-3xl relative overflow-hidden flex flex-col shadow-[inset_0_0_80px_rgba(8,145,178,0.05)]">
            
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 z-20 pointer-events-none flex justify-between items-start">
                <div>
                   <h2 className="text-sm font-light text-white uppercase tracking-widest">Global Flow Projection</h2>
                   <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-1">Spatial Arbitrage Network</p>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> SAT-LINK ONLINE</span>
                   <span className="text-[9px] text-slate-600 uppercase font-bold tracking-wider mt-1">3D WebGL Instance</span>
                </div>
            </div>

            {/* Canvas Substrate */}
            <div className="flex-1 w-full h-full cursor-move">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <HolographicEarth />
                </Canvas>
            </div>
            
            {/* Fundamental DD Layer Overlay */}
            <div className="absolute top-1/4 right-6 w-72 z-30 pointer-events-none flex flex-col gap-4">
                <div className="bg-black/50 backdrop-blur-md border border-emerald-500/30 p-4 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.1)] animation-fade-in">
                   <h3 className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-3 border-b border-emerald-500/20 pb-1 flex justify-between">
                     <span>ANTIGRAVITY Quant Matrix</span>
                     <span className="text-white">ACTIVE</span>
                   </h3>
                   <div className="space-y-3">
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Target TAM Growth</span>
                          <span className="text-green-300 font-mono">+14.2% CAGR</span>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">LTV / CAC Ratio</span>
                          <span className="text-green-300 font-mono">4.8x (Optimal)</span>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Insider Delta</span>
                          <span className="text-green-300 font-mono">Heavy Accum.</span>
                       </div>
                   </div>
                </div>

                <div className="bg-black/50 backdrop-blur-md border border-emerald-500/30 p-4 rounded-xl shadow-[0_0_20px_rgba(8,145,178,0.1)] animation-fade-in" style={{ animationDelay: '0.2s'}}>
                   <h3 className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-3 border-b border-emerald-500/20 pb-1 flex justify-between">
                     <span>Qualitative Core</span>
                     <span className="text-white">DD-PASS</span>
                   </h3>
                   <div className="space-y-2">
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">BCG Quadrant</span>
                          <span className="text-emerald-300 bg-emerald-500/10 px-1 rounded">CASH COW</span>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Porter's Friction</span>
                          <span className="text-emerald-300 bg-emerald-500/10 px-1 rounded">LOW SUB. RISK</span>
                       </div>
                   </div>
                </div>
            </div>
            
            {/* Overlay Grid Stats */}
            <div className="absolute bottom-6 left-6 z-20 pointer-events-none flex flex-col items-start gap-2">
                <div className="p-3 bg-black/60 border border-rose-500/20 backdrop-blur-sm rounded-xl">
                    <span className="text-[8px] text-slate-400 uppercase font-black block mb-1">Warning: Customer Conc.</span>
                    <span className="text-sm text-rose-500 font-mono font-bold">Failed 10% Rule (Reject)</span>
                </div>
                <div className="p-3 bg-black/60 border border-emerald-500/20 backdrop-blur-sm rounded-xl">
                    <span className="text-[8px] text-slate-400 uppercase font-black block mb-1">Execution Subsystem</span>
                    <span className="text-sm text-white font-mono font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      OANDA v20 REST ONLINE
                    </span>
                </div>
            </div>
        </div>
    );
}
