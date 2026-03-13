'use client';

import { useCallback, useEffect, useState } from 'react';

interface UseCarouselProps {
  totalSlides: number;
  autoPlayInterval?: number;
  isPaused?: boolean;
}

export function useCarousel({
  totalSlides,
  autoPlayInterval = 5000,
  isPaused = false,
}: UseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused) return;

    const tick = 100; // ms
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (tick / autoPlayInterval) * 100;
      });
    }, tick);

    return () => clearInterval(timer);
  }, [isPaused, autoPlayInterval, nextSlide]);

  return {
    currentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    progress,
  };
}
