"use client";

import { useEffect, useRef, useState } from "react";
import { education, achievements } from "@/lib/data";

export default function Education() {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-bg overflow-hidden" style={{ paddingTop: "36px" }}>
      <div
        className="relative z-10 flex h-full px-8 md:px-16"
        style={{
          transform: isVisible ? "rotate(-1.5deg) translateY(0)" : "rotate(-8deg) translateY(60px)",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Left column - Section label */}
        <div className="w-1/4 flex items-center justify-center">
          <div
            className="text-dm-mono text-sm text-ink origin-center"
            style={{
              transform: "rotate(-90deg)",
            }}
          >
            EDUCATION
          </div>
        </div>

        {/* Right column - Content */}
        <div className="w-3/4 flex flex-col justify-center pr-8 md:pr-16">
          {/* Education entry */}
          <div
            className="mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s",
            }}
          >
            <h2 className="text-bebas text-3xl md:text-4xl text-ink mb-2">
              {education.degree}
            </h2>
            <p className="text-dm-mono text-base text-ink">
              {education.location} · {education.date}
            </p>
            <p className="text-dm-mono text-sm text-muted mt-1">
              {education.details}
            </p>
          </div>

          {/* Achievements */}
          <div>
            <div
              className="text-dm-mono text-sm text-ink mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.6s ease 0.3s",
              }}
            >
              ACHIEVEMENTS
            </div>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="inline-block border-2 border-lime px-4 py-2"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.6s ease 0.4s",
                }}
              >
                <div className="text-bebas text-2xl text-ink">
                  {achievement.title}
                </div>
                <div className="text-dm-mono text-sm text-muted">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
