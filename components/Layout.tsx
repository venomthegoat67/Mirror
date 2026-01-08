
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-[#0A0A0A] selection:bg-black selection:text-white">
      {/* Background soft geometric element */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full border border-black/5"
        />
      </div>

      {/* Floating Circular Glass Header */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-2 py-2">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-6 px-6 py-3 bg-white/40 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] transition-all hover:bg-white/60 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] group cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 rounded-full border border-black/10 flex items-center justify-center overflow-hidden">
               <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-2 h-2 bg-black rounded-full" 
               />
            </div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase">
              Mirror<sup>©</sup>
            </span>
          </div>
          
          <div className="h-4 w-px bg-black/10" />
          
          <div className="flex items-center gap-3 pr-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/40 animate-pulse" />
            <span className="text-[9px] font-medium tracking-widest text-gray-500 uppercase">
              {location.pathname === '/' ? 'Reflecting Identity' : location.pathname.substring(1)}
            </span>
          </div>
        </motion.div>
      </nav>

      <main className="relative w-full max-w-7xl flex-grow flex flex-col z-10 pt-24 px-6">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>

      <footer className="w-full max-w-6xl py-20 mt-20 border-t border-gray-100 flex flex-col md:flex-row justify-between items-end text-[10px] text-gray-400 tracking-widest uppercase gap-8 z-10 px-6 mx-auto">
        <div className="max-w-xs leading-loose">
          A high-end research tool for the modern digital era. <br/>
          Privacy is our primary architecture.
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <span>Engineered with Gemini 3 Pro</span>
          <span>© 2025 DIGITAL MIRROR RESEARCH STUDIO</span>
        </div>
      </footer>
    </div>
  );
};