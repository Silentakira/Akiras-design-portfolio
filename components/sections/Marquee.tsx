"use client";

import { useEffect, useRef, useState } from "react";
import { marqueeText } from "@/lib/data";

export default function Marquee() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-transparent overflow-hidden"
      style={{ paddingTop: "36px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background flood animation */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          transformOrigin: "left",
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.5s ease-out",
          zIndex: -1,
        }}
      />

      {/* Marquee content */}
      <div
        className="h-full flex items-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.1s 0.6s",
        }}
      >
        <div
          className="whitespace-nowrap"
          style={{
            animation: "marquee 18s linear infinite",
            animationDuration: isHovered ? "9s" : "18s",
            fontSize: "clamp(12vw, 12vw, 10rem)",
            fontFamily: "Bebas Neue, sans-serif",
            lineHeight: 1,
            textTransform: "uppercase",
            color: "#CAFF00",
          }}
        >
          <span style={{ paddingRight: "2rem" }}>{marqueeText}</span>
          <span style={{ paddingRight: "2rem" }}>{marqueeText}</span>
        </div>
      </div>
    </section>
  );
}
