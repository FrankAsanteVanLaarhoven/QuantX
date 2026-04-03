"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';

interface DraggablePanelProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: (id: string) => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number | string; height: number | string };
}

export function DraggablePanel({ 
  id, 
  title, 
  children, 
  onClose,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 400, height: 'auto' }
}: DraggablePanelProps) {
  const constraintsRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [zIndex, setZIndex] = useState(10);
  
  // Bring to front on interaction
  const handleInteraction = () => {
    // In a real app we'd dispatch an event to increment a global z-index counter
    setZIndex(prev => prev + 1);
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.9, ...defaultPosition }}
      animate={
        isMaximized 
          ? { x: 0, y: 0, width: '100vw', height: '100vh', opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, width: defaultSize.width, height: isMinimized ? 44 : defaultSize.height }
      }
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
      style={{ zIndex, position: 'absolute' }}
      onPointerDown={handleInteraction}
      className={`
        flex flex-col overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]
        border border-white/[0.08] bg-black/40 backdrop-blur-2xl
        ${isMaximized ? 'rounded-none' : 'rounded-2xl'}
      `}
    >
      {/* Dynamic light reflection edge */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/[0.03] bg-gradient-to-br from-white/[0.05] to-transparent" />
      
      {/* Title Bar (Drag Handle) */}
      <div 
        className="h-11 flex items-center justify-between px-4 bg-white/[0.02] border-b border-white/[0.05] cursor-grab active:cursor-grabbing backdrop-blur-md shrink-0 z-10"
      >
        <div className="flex items-center gap-2">
          {/* Mac-style traffic lights but customized */}
          <button onClick={() => onClose(id)} className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors flex items-center justify-center group">
             <X size={8} className="opacity-0 group-hover:opacity-100 text-black" />
          </button>
          <button onClick={() => setIsMinimized(!isMinimized)} className="w-3 h-3 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors flex items-center justify-center group">
             <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black" />
          </button>
          <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-green-500/50 hover:bg-green-500 transition-colors flex items-center justify-center group">
             <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black" />
          </button>
          <span className="ml-3 text-xs font-semibold tracking-widest text-sky-100/70 uppercase">
            {title}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-auto p-1 z-10 relative custom-scrollbar"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
