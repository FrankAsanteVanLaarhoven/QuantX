"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const INSTANCE_COUNT = 800; // Limit orders

const InstancedOrderBook = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate simulated order book data
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < INSTANCE_COUNT; i++) {
            // Split 50/50 Bid/Ask
            const isBid = i < INSTANCE_COUNT / 2;
            const y = Math.random() * 4 - 2; // Price level vertical mapping
            const z = (Math.random() - 0.5) * 2; // Depth
            
            // Bids pile up negatively on X, Asks positively on X
            const xOffset = isBid ? -2 - Math.random() * 3 : 2 + Math.random() * 3;
            
            // Density clustering (closer to spread means higher block density)
            const elasticity = Math.abs(y); 
            const densityScale = Math.max(0.1, 1 - (elasticity * 0.2));

            const color = new THREE.Color(isBid ? '#16a34a' : '#dc2626');

            temp.push({ x: xOffset, y, z, scale: densityScale, color });
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        
        particles.forEach((particle, i) => {
            // Pulse the blocks based on time
            const t = state.clock.elapsedTime;
            const pulse = Math.sin(t * 2 + i * 0.1) * 0.1;
            
            dummy.position.set(particle.x, particle.y, particle.z);
            dummy.scale.set(particle.scale + pulse, particle.scale + pulse, particle.scale + pulse);
            dummy.updateMatrix();
            
            meshRef.current!.setMatrixAt(i, dummy.matrix);
            meshRef.current!.setColorAt(i, particle.color);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
        if(meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, INSTANCE_COUNT]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial toneMapped={false} />
        </instancedMesh>
    );
};

export const DOMHeatmap = () => {
  return (
    <div className="w-full h-full bg-[#050505] border border-white/10 rounded-2xl relative overflow-hidden flex flex-col">
        {/* HUD Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 z-20 pointer-events-none flex justify-between items-start">
            <div>
               <h2 className="text-xl font-bold text-white tracking-widest uppercase mb-1 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Level 3 DOM Heatmap
               </h2>
               <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">Institutional Limit Order Topography</p>
            </div>
            <div className="flex flex-col items-end gap-1">
               <span className="text-xs text-emerald-500 font-mono bg-emerald-500/10 px-2 py-1 rounded">Bid Liquidity: 42M</span>
               <span className="text-xs text-rose-500 font-mono bg-rose-500/10 px-2 py-1 rounded">Ask Wall: 89M</span>
            </div>
        </div>

        {/* 3D WebGL Canvas */}
        <div className="flex-1 w-full h-full cursor-crosshair">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                <InstancedOrderBook />
                <OrbitControls enableZoom={true} enablePan={false} autoRotate={true} autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
            </Canvas>
        </div>

        {/* Bottom Metrics */}
        <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none border-t border-white/10 pt-4 flex justify-between">
           <div className="flex gap-4">
              <div className="flex flex-col">
                 <span className="text-[9px] text-slate-500 uppercase font-black">Elasticity</span>
                 <span className="text-sm text-white font-mono">0.002%</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[9px] text-slate-500 uppercase font-black">Spread</span>
                 <span className="text-sm text-emerald-400 font-mono">0.05 Ticks</span>
              </div>
           </div>
           <span className="text-[8px] bg-rose-500/20 text-rose-400 uppercase tracking-widest absolute bottom-4 right-0 px-2 py-1 border border-rose-500/30">Latency: 0.1ms (Colocated)</span>
        </div>
    </div>
  );
};
