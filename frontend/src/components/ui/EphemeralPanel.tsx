"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { X } from "lucide-react";

interface EphemeralPanelProps {
  id: string;
  title?: string;
  children: ReactNode;
  onClose: (id: string) => void;
  position?: "center" | "bottom" | "side";
}

export function EphemeralPanel({ id, title, children, onClose, position = "center" }: EphemeralPanelProps) {
  const getVariants = () => {
    switch (position) {
      case "bottom":
        return { initial: { y: 200, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 200, opacity: 0 } };
      case "side":
        return { initial: { x: 200, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 200, opacity: 0 } };
      default:
        return { initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.95, opacity: 0 } };
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "bottom":
        return "bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl";
      case "side":
        return "top-8 right-8 w-96 max-h-[80vh]";
      default:
        return "top-1/2 mt-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        {...getVariants()}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`absolute p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 max-h-[80vh] overflow-y-auto ${getPositionClasses()}`}
      >
        {title && (
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h2 className="text-xs font-semibold tracking-widest text-white/50 uppercase">{title}</h2>
            <button 
              onClick={() => onClose(id)}
              className="text-white/50 hover:text-white transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className="relative w-full text-white/90">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
