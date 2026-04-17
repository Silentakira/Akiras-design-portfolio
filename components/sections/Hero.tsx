"use client";

import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  const [nameAnimated, setNameAnimated] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const firstName = personalInfo.name.first;
  const lastName = personalInfo.name.last;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Trigger animations
            setTimeout(() => setNameAnimated(true), 100);
          } else {
            setIsVisible(false);
            setNameAnimated(false);
            setSubtitleVisible(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (nameAnimated) {
      const timer = setTimeout(() => {
        setSubtitleVisible(true);
      }, firstName.length * 60 + 200);
      return () => clearTimeout(timer);
    }
  }, [nameAnimated, firstName.length]);

  return (
    <section ref={sectionRef} className="relative h-screen bg-bg overflow-hidden" style={{ paddingTop: "36px" }}>
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16">
        {/* Name - First Line */}
        <div className="overflow-hidden">
          <h1 className="text-bebas text-ink text-[clamp(15vw,14vw,300px)] leading-none text-center">
            {firstName.split("").map((letter, index) => (
              <span
                key={`first-${index}`}
                className="inline-block"
                style={{
                  opacity: nameAnimated ? 1 : 0,
                  transform: nameAnimated ? "translateY(0)" : "translateY(100px)",
                  transition: isVisible
                    ? `opacity 0.6s ease ${index * 40}ms, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 40}ms`
                    : `opacity 0.6s ease 0ms, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0ms`,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Name - Second Line */}
        <div className="overflow-hidden">
          <h1 className="text-bebas text-ink text-[clamp(15vw,14vw,300px)] leading-none text-center">
            {lastName.split("").map((letter, index) => (
              <span
                key={`last-${index}`}
                className="inline-block"
                style={{
                  opacity: nameAnimated ? 1 : 0,
                  transform: nameAnimated ? "translateY(0)" : "translateY(100px)",
                  transition: isVisible
                    ? `opacity 0.6s ease ${(index + firstName.length) * 40}ms, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${(index + firstName.length) * 40}ms`
                    : `opacity 0.6s ease 0ms, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0ms`,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="absolute bottom-16 left-8 md:left-16">
          <p className="text-dm-mono text-[0.85rem] text-ink">
            {personalInfo.title}
            <span className="animate-blink">|</span>
          </p>
        </div>
      </div>
    </section>
  );
}
