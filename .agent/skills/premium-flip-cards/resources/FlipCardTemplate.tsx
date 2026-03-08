'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

export const PremiumFlipCard = ({ front, back, orientation = 'horizontal' }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const rotateAxis = orientation === 'horizontal' ? 'rotateY' : 'rotateX';

  return (
    <div 
      className="group perspective-1000 w-full h-[400px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d"
        animate={{ [rotateAxis]: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Face Avant */}
        <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md">
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
             {front}
          </div>
        </div>

        {/* Face Arrière */}
        <div 
          className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-gradient-to-tr from-primary/20 to-background backdrop-blur-2xl"
          style={{ transform: `${rotateAxis}(180deg)` }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
             {back}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
