"use client";

import { useEffect, RefObject } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseAnimateOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  onEnter?: (element: HTMLElement) => void;
  onExit?: (element: HTMLElement) => void;
  animationClass?: string;
}

export function useAnimateOnScroll(
  ref: RefObject<HTMLElement>,
  options: UseAnimateOnScrollOptions = {}
) {
  const {
    threshold = 0.3,
    rootMargin = "0px",
    onEnter,
    onExit,
    animationClass = "animate-in",
  } = options;

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove class, force reflow, re-add class for re-trigger
            element.classList.remove(animationClass);
            void element.offsetWidth; // Force reflow
            element.classList.add(animationClass);

            onEnter?.(element);
          } else {
            // Remove class when not intersecting to reset
            element.classList.remove(animationClass);
            onExit?.(element);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, onEnter, onExit, animationClass, reducedMotion]);

  return { reducedMotion };
}
