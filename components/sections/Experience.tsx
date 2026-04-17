"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/lib/data";

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-bg overflow-hidden" style={{ paddingTop: "36px" }}>
      {/* Desktop - Diagonal timeline */}
      <div className="hidden md:block relative h-full">
        {/* Diagonal SVG line */}
        <div className="absolute inset-0 pointer-events-none z-5">
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            style={{ width: "100%", height: "100%" }}
          >
            <line
              x1="0"
              y1="100"
              x2="100"
              y2="0"
              stroke="#0D0D0D"
              strokeWidth="0.5"
              style={{
                strokeDasharray: 200,
                strokeDashoffset: isVisible ? 0 : 200,
                transition: "stroke-dashoffset 0.6s 0.4s ease-out",
              }}
            />
          </svg>
        </div>

        <div
          className="absolute inset-0 z-10"
          style={{
            transform: isVisible ? "translateX(0)" : "translateX(100vw)",
            transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {experience.slice(0, 4).map((job, index) => {
            // Position cards along diagonal from bottom-left to top-right
            const positions = [
              { left: "65%", top: "15%", fontSize: "1.5rem", padding: "1.5rem", maxWidth: "30vw" }, // Boutik Studio
              { left: "45%", top: "35%", fontSize: "1.2rem", padding: "1rem", maxWidth: "25vw" }, // Sticky Sticks
              { left: "25%", top: "55%", fontSize: "1rem", padding: "1rem", maxWidth: "25vw" }, // Real Tennis
              { left: "5%", top: "70%", fontSize: "0.9rem", padding: "1rem", maxWidth: "20vw" }, // Independent
            ];
            const pos = positions[index % positions.length];

            return (
              <div
                key={index}
                className="absolute bg-bg border-2 border-ink"
                style={{
                  left: pos.left,
                  top: pos.top,
                  fontSize: pos.fontSize,
                  padding: pos.padding,
                  maxWidth: pos.maxWidth,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(-50vh)",
                  transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${500 + index * 120}ms, opacity 0.4s ease ${500 + index * 120}ms`,
                  transformOrigin: "center",
                  zIndex: 10,
                }}
              >
                <h3
                  className={`text-bebas text-2xl ${index === 0 ? "text-lime" : "text-ink"}`}
                  style={{
                    textShadow: index === 0 ? "1px 1px 0 #0D0D0D, -1px -1px 0 #0D0D0D, 1px -1px 0 #0D0D0D, -1px 1px 0 #0D0D0D" : "none",
                    lineHeight: 1.1,
                  }}
                >
                  {job.company}
                </h3>
                <p className="text-dm-mono text-sm text-ink mt-2 font-medium">{job.role}</p>
                <span className="block text-dm-mono text-xs text-muted mt-1">
                  {job.date} {job.location && `· ${job.location.split(" ")[0]}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile - Vertical glitch stack */}
      <div className="md:hidden relative h-full overflow-y-auto px-4 py-8">
        {/* Vertical dashed line */}
        <div className="absolute left-10 top-0 bottom-0 w-px border-l-2 border-dashed border-ink/30" />

        {/* Experience cards */}
        <div className="space-y-6 pl-8">
          {experience.map((job, index) => (
            <div
              key={index}
              className="p-4 bg-bg border-2 border-ink relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? index % 2 === 0
                    ? "translateX(0) rotate(0deg)"
                    : "translateX(20px) rotate(1.2deg)"
                  : index % 2 === 0
                  ? "translateX(0) rotate(0deg)"
                  : "translateX(20px) rotate(1.2deg)",
                transition: `opacity 0.01ms steps(1) ${index * 120}ms, transform 0.01ms steps(1) ${index * 120}ms`,
                transformOrigin: "left",
              }}
            >
              <h3 className={`text-bebas text-xl ${index === 0 ? "text-lime" : "text-ink"}`}>
                {job.company}
              </h3>
              <p className="text-dm-mono text-xs text-ink mt-1">{job.role}</p>
              <p className="text-dm-mono text-xs text-muted mt-1">{job.date}</p>
              {job.location && (
                <p className="text-dm-mono text-xs text-muted">{job.location}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
