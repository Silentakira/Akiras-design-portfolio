"use client";

import { useEffect, useRef, useState } from "react";
import { tools } from "@/lib/data";

export default function Tools() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Fixed positions matching HTML
  const toolPositions = [
    { className: "t-figma", name: "Figma", left: "10%", top: "15%", fontSize: "6vw", duration: "0.4s" },
    { className: "t-photom", name: "Photomator", left: "55%", top: "25%", fontSize: "7vw", duration: "0.5s", accent: true },
    { className: "t-aff-des", name: "Affinity Designer", left: "8%", top: "50%", fontSize: "4vw", duration: "0.6s" },
    { className: "t-ps", name: "Photoshop", left: "65%", top: "60%", fontSize: "5vw", duration: "0.7s" },
    { className: "t-aff-pho", name: "Affinity Photo", left: "12%", top: "75%", fontSize: "4.5vw", duration: "0.8s" },
    { className: "t-ill", name: "Illustrator", left: "50%", top: "85%", fontSize: "3.5vw", duration: "0.45s" },
    { className: "t-aff-pub", name: "Affinity Publisher", left: "35%", top: "8%", fontSize: "3vw", duration: "0.65s" },
  ];

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

  const handleToolHover = (toolName: string) => {
    setHoveredTool(toolName);
    setTimeout(() => setHoveredTool(null), 300);
  };

  return (
    <section ref={sectionRef} className="relative h-screen bg-bg overflow-hidden" style={{ paddingTop: "36px" }}>
      {/* Desktop - Scattered tools */}
      <div className="hidden md:block relative h-full">
        {toolPositions.map((tool, index) => {
          const isHovered = hoveredTool === tool.name;

          return (
            <div
              key={tool.name}
              className="absolute font-bold interactive bg-bg px-1"
              style={{
                left: tool.left,
                top: tool.top,
                fontSize: tool.fontSize,
                fontFamily: "Bebas Neue, sans-serif",
                textTransform: "uppercase",
                color: tool.accent ? "#CAFF00" : "#0D0D0D",
                WebkitTextStroke: tool.accent ? "1px #0D0D0D" : "none",
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? `translateY(0) ${isHovered ? "rotate(360deg)" : "rotate(0deg)"}`
                  : "translateY(-100vh)",
                transition: `opacity 0.4s ease, transform ${tool.duration} cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                animation: isVisible && !isHovered ? `wobble 0.6s ease-in-out 2 ${tool.duration}` : "none",
                zIndex: tool.accent ? 11 : 10,
              }}
              onMouseEnter={() => handleToolHover(tool.name)}
              onTouchStart={() => handleToolHover(tool.name)}
            >
              {tool.name}
            </div>
          );
        })}
      </div>

      {/* Mobile - Scattered positioning */}
      <div className="md:hidden relative h-full px-4 py-8 overflow-hidden">
        {tools.map((tool, index) => {
          // Scattered positions for mobile (more spread out)
          const mobilePositions = [
            { left: "5%", top: "12%", fontSize: "1.8rem", fontFamily: "Bebas Neue, sans-serif" },
            { left: "60%", top: "25%", fontSize: "2.2rem", fontFamily: "Bebas Neue, sans-serif", color: "#CAFF00", WebkitTextStroke: "1.5px #0D0D0D" },
            { left: "15%", top: "40%", fontSize: "1.6rem", fontFamily: "DM Mono, monospace", fontWeight: "bold" },
            { left: "70%", top: "55%", fontSize: "1.9rem", fontFamily: "Bebas Neue, sans-serif" },
            { left: "8%", top: "70%", fontSize: "1.7rem", fontFamily: "DM Mono, monospace", fontWeight: "500" },
            { left: "55%", top: "85%", fontSize: "2rem", fontFamily: "Bebas Neue, sans-serif" },
            { left: "25%", top: "95%", fontSize: "1.5rem", fontFamily: "DM Mono, monospace" },
          ];
          const pos = mobilePositions[index % mobilePositions.length];

          return (
            <div
              key={tool}
              className="cursor-pointer interactive absolute bg-bg px-2"
              style={{
                ...pos,
                textTransform: "uppercase",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(-100vh)",
                transition: `opacity 0.4s ease, transform ${0.4 + (index % 4) * 0.1}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                animation: isVisible ? `wobble 0.6s ease-in-out 2 ${0.4 + (index % 4) * 0.1}s` : "none",
                zIndex: pos.color === "#CAFF00" ? 11 : 10,
              }}
            >
              {tool}
            </div>
          );
        })}
      </div>
    </section>
  );
}
