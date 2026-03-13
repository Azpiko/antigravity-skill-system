'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

export const PremiumCarouselTemplate = ({ slides }: { slides: any[] }) => {
  // Simulé (index actif)
  const [index, setIndex] = React.useState(0);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl bg-background/50 backdrop-blur-xl border border-white/10 group shadow-2xl">
      {/* Slides Container */}
      <div className="relative aspect-video flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight text-white">{slides[index].title}</h2>
              <p className="text-lg text-white/70 max-w-md mx-auto">{slides[index].description}</p>
            </div>
            <button className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform active:scale-95">
              En savoir plus
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIndex((i) => (i + 1) % slides.length)}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Progress & Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
      
      {/* Visual Timer Bar (Bottom) */}
      <div className="absolute bottom-0 left-0 h-1 bg-primary/50 w-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary" 
          animate={{ x: '-100%' }} 
          initial={{ x: '0%' }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
};
