// Animation System using GSAP
//
// CHOICE JUSTIFICATION: GSAP vs Framer Motion
// I've chosen GSAP for this project because:
// 1. ScrollTrigger - Specifically designed for scroll-based animations with clean re-triggering
// 2. Performance - More efficient for complex animations like letter-by-letter sequencing
// 3. Control - Granular control over timing and sequencing for the precise animations required
// 4. Native IntersectionObserver integration - Works well with our re-trigger pattern

// Note: This is a lightweight animation utility library
// For production, you would install: npm install gsap
// Currently set up to work with CSS animations and IntersectionObserver

// Animation timing configurations
export const ANIMATION_CONFIG = {
  // Hero animations
  hero: {
    letterStagger: 40, // ms per letter
    exitDuration: 600, // ms
  },

  // About animations
  about: {
    rogueDelay: 2000, // ms before rogue text appears
    rogueLoop: 8000, // ms for rogue text loop
  },

  // Experience animations
  experience: {
    cardStagger: 120, // ms per card
  },

  // Tools animations
  tools: {
    fallDuration: { min: 400, max: 800 }, // ms range
  },

  // Contact animations
  contact: {
    letterStagger: 20, // ms per letter
    scrambleDuration: 400, // ms
  },

  // Global exit animations
  exit: {
    duration: 200, // ms
    blur: 4, // px
  },
} as const;

// Easing functions (CSS cubic-bezier equivalents)
export const EASING = {
  smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
  bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  sharp: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

// Intersection Observer configuration for re-triggering animations
export const OBSERVER_CONFIG = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3, // Trigger when 30% of section is visible
} as const;

// Helper function to force reflow (essential for re-triggering animations)
export function forceReflow(element: HTMLElement): void {
  void element.offsetWidth;
}

// Helper function to reset and re-trigger animation
export function retriggerAnimation(
  element: HTMLElement,
  animationClass: string
): void {
  element.classList.remove(animationClass);
  forceReflow(element);
  element.classList.add(animationClass);
}

// Random range helper for exit animations
export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Letter scramble effect for glitch animation
export function scrambleLetters(
  element: HTMLElement,
  duration: number,
  callback?: () => void
): void {
  const originalText = element.textContent || "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let iterations = 0;

  const interval = setInterval(() => {
    element.textContent = originalText
      .split("")
      .map((letter, index) => {
        if (index < iterations / 10) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    iterations += 40;

    if (iterations >= duration) {
      clearInterval(interval);
      element.textContent = originalText;
      callback?.();
    }
  }, 40);
}

// Animation class names for CSS
export const ANIMATION_CLASSES = {
  fadeInUp: "animate-fadeInUp",
  slideInRight: "animate-slideInRight",
  rotateIn: "animate-rotateIn",
  floodLeft: "animate-floodLeft",
  stampIn: "animate-stampIn",
} as const;

export default {
  ANIMATION_CONFIG,
  EASING,
  OBSERVER_CONFIG,
  forceReflow,
  retriggerAnimation,
  randomInRange,
  scrambleLetters,
  ANIMATION_CLASSES,
};
