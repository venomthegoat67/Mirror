
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: "bg-[#0A0A0A] text-white",
    secondary: "bg-transparent text-[#0A0A0A] border border-black/10 hover:border-black"
  };
  
  return (
    <motion.button 
      whileHover={{ scale: 1.02, letterSpacing: '0.12em' }}
      whileTap={{ scale: 0.98 }}
      className={`px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-500 disabled:opacity-20 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ className = '', icon, ...props }) => (
  <div className="relative w-full group">
    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors duration-500">
      {icon}
    </div>
    <input 
      className={`w-full py-6 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all duration-700 text-2xl font-extralight tracking-tight placeholder:text-gray-200 ${icon ? 'pl-10' : ''} ${className}`}
      {...props}
    />
    <div className="absolute bottom-0 left-0 h-px bg-black w-0 group-focus-within:w-full transition-all duration-1000 ease-out" />
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ReactNode;
}

export const TextArea: React.FC<TextAreaProps> = ({ className = '', icon, ...props }) => (
  <div className="relative w-full group">
    <div className="absolute left-0 top-7 text-gray-300 group-focus-within:text-black transition-colors duration-500">
      {icon}
    </div>
    <textarea 
      className={`w-full py-6 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all duration-700 text-xl font-extralight tracking-tight placeholder:text-gray-200 resize-none min-h-[120px] ${icon ? 'pl-10' : ''} ${className}`}
      {...props}
    />
    <div className="absolute bottom-0 left-0 h-px bg-black w-0 group-focus-within:w-full transition-all duration-1000 ease-out" />
  </div>
);

export const Heading: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.h1 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    className={`text-5xl md:text-7xl font-light tracking-[-0.03em] mb-10 leading-[0.95] text-balance ${className}`}
  >
    {children}
  </motion.h1>
);

export const SubHeading: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.h2 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    className={`text-[9px] font-black uppercase tracking-[0.5em] text-gray-300 mb-8 ${className}`}
  >
    {children}
  </motion.h2>
);
