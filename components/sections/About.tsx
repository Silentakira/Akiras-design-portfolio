"use client";

import { useEffect, useRef, useState } from "react";
import { aboutText, rogueText } from "@/lib/data";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [showRogue, setShowRogue] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Show rogue text after 2s
            setTimeout(() => setShowRogue(true), 2000);
          } else {
            setIsVisible(false);
            setShowRogue(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (showRogue) {
      // Loop rogue text every 8s
      const interval = setInterval(() => {
        setShowRogue(false);
        setTimeout(() => setShowRogue(true), 100);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [showRogue]);

  return (
    <section ref={sectionRef} className="relative h-screen bg-bg overflow-hidden" style={{ paddingTop: "36px" }}>
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #0D0D0D 1px, transparent 1px),
            linear-gradient(to bottom, #0D0D0D 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }} />
      </div>

      <div className="relative z-10 flex h-full">
        {/* Left column - Section label */}
        <div className="w-1/4 flex items-center justify-center">
          <div
            className="text-dm-mono text-sm text-ink origin-center"
            style={{
              transform: "rotate(-90deg)",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            ABOUT
          </div>
        </div>

        {/* Right column - Bio text */}
        <div className="w-3/4 flex items-center pr-8 md:pr-16">
          <div className="max-w-2xl">
            <p
              className="text-dm-mono text-lg md:text-xl text-ink leading-relaxed"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {aboutText}
            </p>

            {/* Rogue text container */}
            <div className="min-h-[2em] my-4">
              <span
                className="text-playfair text-lg md:text-xl text-ink inline-block bg-bg px-2"
                style={{
                  opacity: showRogue ? 1 : 0,
                  transform: showRogue ? "translateX(0)" : "translateX(60px)",
                  transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {rogueText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
