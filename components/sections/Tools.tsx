"use client";

import { useEffect, useRef, useState } from "react";
import { tools } from "@/lib/data";

interface ToolSpec {
  name: string;
  fontSize: string;
  fontSizeMobile: string;
  fontFamily: "Bebas Neue" | "DM Mono";
  indent: string;
  indentMobile: string;
  color: string;
  isOutlined: boolean;
}

const toolSpecs: ToolSpec[] = [
  {
    name: "Figma",
    fontSize: "6rem", // Scaled from 4rem
    fontSizeMobile: "2.2rem",
    fontFamily: "Bebas Neue",
    indent: "0%",
    indentMobile: "0%",
    color: "#CAFF00",
    isOutlined: true,
  },
  {
    name: "Illustrator",
    fontSize: "3rem", // Scaled from 2rem
    fontSizeMobile: "1.1rem",
    fontFamily: "DM Mono",
    indent: "8%",
    indentMobile: "4%",
    color: "#0D0D0D",
    isOutlined: false,
  },
  {
    name: "Photoshop",
    fontSize: "4.5rem", // Scaled from 3rem
    fontSizeMobile: "1.7rem",
    fontFamily: "Bebas Neue",
    indent: "20%",
    indentMobile: "10%",
    color: "#0D0D0D",
    isOutlined: false,
  },
  {
    name: "Affinity Designer",
    fontSize: "2rem", // Scaled from 1.3rem
    fontSizeMobile: "0.9rem",
    fontFamily: "DM Mono",
    indent: "5%",
    indentMobile: "2%",
    color: "#0D0D0D",
    isOutlined: false,
  },
  {
    name: "Affinity Photo",
    fontSize: "4.8rem", // Scaled from 3.2rem
    fontSizeMobile: "1.9rem",
    fontFamily: "Bebas Neue",
    indent: "30%",
    indentMobile: "12%",
    color: "#0D0D0D",
    isOutlined: false,
  },
  {
    name: "Photomator",
    fontSize: "2.4rem", // Scaled from 1.6rem
    fontSizeMobile: "1rem",
    fontFamily: "DM Mono",
    indent: "15%",
    indentMobile: "6%",
    color: "#0D0D0D",
    isOutlined: false,
  },
  {
    name: "Affinity Publisher",
    fontSize: "3.8rem", // Scaled from 2.5rem
    fontSizeMobile: "1.4rem",
    fontFamily: "Bebas Neue",
    indent: "40%",
    indentMobile: "8%",
    color: "#0D0D0D",
    isOutlined: false,
  },
];

export default function Tools() {
  const [typedChars, setTypedChars] = useState<number[]>(new Array(toolSpecs.length).fill(0));
  const [cursorStates, setCursorStates] = useState<boolean[]>(new Array(toolSpecs.length).fill(false));
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  const resetAnimation = () => {
    // Clear all intervals
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    // Reset all state to zeros/invisible
    setTypedChars(new Array(toolSpecs.length).fill(0));
    setCursorStates(new Array(toolSpecs.length).fill(false));
  };

  const startTypewriterSequence = () => {
    resetAnimation();

    let currentTool = 0;

    const typeNextTool = () => {
      if (currentTool >= toolSpecs.length) return;

      const tool = toolSpecs[currentTool];

      // Show cursor for current tool
      setCursorStates(prev => {
        const newStates = [...prev];
        newStates[currentTool] = true;
        return newStates;
      });

      let charCount = 0;

      const typeChar = () => {
        if (charCount <= tool.name.length) {
          setTypedChars(prev => {
            const newStates = [...prev];
            newStates[currentTool] = charCount;
            return newStates;
          });
          charCount++;

          const intervalId = setInterval(() => {
            setTypedChars(prev => {
              const newStates = [...prev];
              newStates[currentTool] = charCount;
              return newStates;
            });
            charCount++;

            if (charCount > tool.name.length) {
              clearInterval(intervalId);
              // Hide cursor for current tool
              setCursorStates(prev => {
                const newStates = [...prev];
                newStates[currentTool] = false;
                return newStates;
              });
              // Move to next tool after 200ms gap
              currentTool++;
              setTimeout(typeNextTool, 200);
            }
          }, 30);

          intervalsRef.current.push(intervalId);
        }
      };

      typeChar();
    };

    typeNextTool();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section entered - start animation
            startTypewriterSequence();
          } else {
            // Section left - instant reset
            resetAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      resetAnimation();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-bg overflow-hidden"
      style={{ paddingTop: "36px", overflowX: "hidden" }}
    >
      <div className="relative h-full flex">
        {/* Section label - right side */}
        <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <div
            className="text-dm-mono text-sm text-ink origin-center"
            style={{
              transform: "rotate(90deg)",
            }}
          >
            TOOLS
          </div>
        </div>

        {/* Tools stack - typewriter animation */}
        <div className="flex-1 flex flex-col justify-center px-4 md:px-16">
          {toolSpecs.map((tool, index) => {
            const isHovered = hoveredTool === index;
            const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
            const currentText = tool.name.slice(0, typedChars[index]);

            return (
              <div
                key={tool.name}
                className="relative interactive"
                style={{
                  paddingLeft: isMobile ? tool.indentMobile : tool.indent,
                  lineHeight: "1",
                  marginBottom: index < toolSpecs.length - 1 ? "0.15rem" : "0",
                }}
                onMouseEnter={() => setHoveredTool(index)}
                onMouseLeave={() => setHoveredTool(null)}
                onTouchStart={() => setHoveredTool(index)}
                onTouchEnd={() => setHoveredTool(null)}
              >
                <div
                  className="tool-name inline-block relative"
                  style={{
                    fontSize: isMobile ? tool.fontSizeMobile : tool.fontSize,
                    fontFamily: tool.fontFamily === "Bebas Neue" ? "Bebas Neue, sans-serif" : "DM Mono, monospace",
                    lineHeight: "1",
                    textTransform: tool.fontFamily === "Bebas Neue" ? "uppercase" : "lowercase",
                  }}
                >
                  {/* Original text (currently typed) */}
                  <span
                    className="original block"
                    style={{
                      color: tool.isOutlined ? "#CAFF00" : tool.color,
                      textShadow: tool.isOutlined
                        ? "-1px -1px 0 #0D0D0D, 1px -1px 0 #0D0D0D, -1px 1px 0 #0D0D0D, 1px 1px 0 #0D0D0D"
                        : "none",
                    }}
                  >
                    {currentText}
                  </span>

                  {/* Lime copy (reveals on hover) */}
                  <span
                    className="lime-copy block absolute inset-0"
                    style={{
                      color: tool.isOutlined ? "#CAFF00" : "#CAFF00",
                      clipPath: isHovered ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                      transition: "clip-path 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {currentText}
                  </span>

                  {/* Blinking cursor (only while typing) */}
                  {cursorStates[index] && (
                    <span
                      className="inline-block ml-1"
                      style={{
                        color: "#CAFF00",
                        fontSize: "0.8em",
                        animation: "blink 0.7s step-end infinite",
                      }}
                    >
                      ▌
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
