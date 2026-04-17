"use client";

import { useEffect, useRef, useState } from "react";
import { contactContent } from "@/lib/data";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [lettersAnimated, setLettersAnimated] = useState(false);
  const [scramble, setScramble] = useState(false);
  const [clientTransforms, setClientTransforms] = useState<Array<{x: number; y: number; r: number}>>([]);
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const title = contactContent.title;

  // Generate random transforms only on client side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const transforms = title.split("").map(() => ({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 200,
      r: (Math.random() - 0.5) * 30,
    }));
    setClientTransforms(transforms);
  }, [title]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setLettersAnimated(true), 100);
          } else {
            setIsVisible(false);
            setLettersAnimated(false);
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

  const handleEmailHover = () => {
    setScramble(true);
    setTimeout(() => setScramble(false), 400);
  };

  return (
    <section ref={sectionRef} className="relative h-screen bg-black overflow-hidden" style={{ paddingTop: "36px" }}>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        {/* Pre-title */}
        <p
          className="text-dm-mono text-lime text-[0.8rem] mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s",
          }}
        >
          {contactContent.preTitle}
        </p>

        {/* Title - Letter assembly */}
        <h1 className="text-bebas text-white text-[12vw] md:text-[12vw] leading-none mb-8 relative">
          {title.split("").map((letter, index) => {
            const transform = isClient && clientTransforms[index] ? clientTransforms[index] : {x: 0, y: 0, r: 0};

            return (
              <span
                key={index}
                className="inline-block"
                style={{
                  opacity: lettersAnimated ? 1 : 0,
                  transform: lettersAnimated
                    ? "translateX(0) translateY(0) rotate(0deg)"
                    : `translateX(${transform.x}px) translateY(${transform.y}px) rotate(${transform.r}deg)`,
                  transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 20}ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 20}ms`,
                }}
              >
                {scramble ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : letter}
              </span>
            );
          })}
        </h1>

        {/* Email */}
        <a
          href={`mailto:${contactContent.email}`}
          className="text-dm-mono text-white text-1rem mb-4 interactive relative group"
          onMouseEnter={handleEmailHover}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s",
          }}
        >
          {contactContent.email}
          <span className="absolute bottom-0 left-0 h-px bg-lime transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </a>

        {/* Phone */}
        <p
          className="text-dm-mono text-muted text-[0.85rem] mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s",
          }}
        >
          {contactContent.phone}
        </p>

        {/* Behance button */}
        <a
          href={`https://${contactContent.behance}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dm-mono text-white text-sm border border-white px-6 py-3 interactive hover:bg-lime hover:text-black transition-all duration-300 mb-4 inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.7s, transform 0.5s ease 0.7s, background-color 0.3s ease, color 0.3s ease",
          }}
        >
          {contactContent.behance}
        </a>

        {/* Location */}
        <p
          className="text-dm-mono text-ghost text-[0.75rem]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.8s, transform 0.5s ease 0.8s",
          }}
        >
          {contactContent.location}
        </p>
      </div>
    </section>
  );
}
