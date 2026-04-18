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
    fontSize: "7rem",
    fontSizeMobile: "3.8rem",
    fontFamily: "Bebas Neue",
    indent: "0%",
    indentMobile: "0%",
    color: "#F5F2EC",
    isOutlined: true,
  },
  {
    name: "Illustrator",
    fontSize: "3rem",
    fontSizeMobile: "1.6rem",
    fontFamily: "DM Mono",
    indent: "8%",
    indentMobile: "4%",
    color: "#0D0D0D",
    isOutlined: false,
  },
  {
    name: "Photoshop",
    fontSize: "5rem",
    fontSizeMobile: "2.7rem",
    fontFamily: "Bebas Neue",
    indent: "20%",
    indentMobile: "10%",
    color: "#0D0D0D",
    isOutlined: false,
  },
  {
    name: "Affinity Designer",
    fontSize: "2rem",
    fontSizeMobile: "1.3rem", // Increased from 1.2rem for better fit
    fontFamily: "DM Mono",
    indent: "5%",
    indentMobile: "2%", // Reduced from 2%
    color: "#0D0D0D",
    isOutlined: false,
  },
  {
    name: "Affinity Photo",
    fontSize: "6rem",
    fontSizeMobile: "3.2rem",
    fontFamily: "Bebas Neue",
    indent: "30%",
    indentMobile: "12%", // Reduced from 15%
    color: "#0D0D0D",
    isOutlined: false,
  },
  {
    name: "Photomator",
    fontSize: "2.5rem",
    fontSizeMobile: "1.4rem",
    fontFamily: "DM Mono",
    indent: "15%",
    indentMobile: "6%", // Reduced from 8%
    color: "#0D0D0D",
    isOutlined: false,
  },
  {
    name: "Affinity Publisher",
    fontSize: "4rem",
    fontSizeMobile: "2.1rem", // Reduced from 2.4rem to fit better
    fontFamily: "Bebas Neue",
    indent: "40%",
    indentMobile: "8%", // Significantly reduced from 20%
    color: "#0D0D0D",
    isOutlined: false,
  },
];

export default function Tools() {
  const [isVisible, setIsVisible] = useState(false);
  const [typingStates, setTypingStates] = useState<string[]>([]);
  const [cursorStates, setCursorStates] = useState<boolean[]>([]);
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            startTypewriterSequence();
          } else {
            setIsVisible(false);
            resetTypewriter();
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
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const startTypewriterSequence = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    setTypingStates(new Array(toolSpecs.length).fill(""));
    setCursorStates(new Array(toolSpecs.length).fill(false));

    let currentTool = 0;

    const typeNextTool = () => {
      if (currentTool >= toolSpecs.length) return;

      const tool = toolSpecs[currentTool];
      let currentChar = 0;

      setCursorStates(prev => {
        const newStates = [...prev];
        newStates[currentTool] = true;
        return newStates;
      });

      const typeChar = () => {
        if (currentChar <= tool.name.length) {
          setTypingStates(prev => {
            const newStates = [...prev];
            newStates[currentTool] = tool.name.slice(0, currentChar);
            return newStates;
          });
          currentChar++;

          animationTimeoutRef.current = setTimeout(typeChar, 30);
        } else {
          setCursorStates(prev => {
            const newStates = [...prev];
            newStates[currentTool] = false;
            return newStates;
          });

          currentTool++;
          animationTimeoutRef.current = setTimeout(typeNextTool, 200);
        }
      };

      typeChar();
    };

    typeNextTool();
  };

  const resetTypewriter = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setTypingStates([]);
    setCursorStates([]);
  };

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

        {/* Tools stack - left aligned with indents */}
        <div className="flex-1 flex flex-col justify-center px-4 md:px-16 overflow-y-auto overflow-x-hidden">
          {toolSpecs.map((tool, index) => {
            const displayText = typingStates[index] || "";
            const isHovered = hoveredTool === index;
            const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

            return (
              <div
                key={tool.name}
                className="relative interactive py-2"
                style={{
                  paddingLeft: isMobile ? tool.indentMobile : tool.indent,
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.3s ease",
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
                    lineHeight: 1.1,
                    textTransform: tool.fontFamily === "Bebas Neue" ? "uppercase" : "lowercase",
                  }}
                >
                  {/* Original text (always visible) */}
                  <span
                    className="original block"
                    style={{
                      color: tool.isOutlined && !isHovered ? "#F5F2EC" : tool.color,
                      WebkitTextStroke: tool.isOutlined && !isHovered ? "2px #CAFF00" : "none",
                    }}
                  >
                    {displayText}
                  </span>

                  {/* Lime copy (reveals on hover) */}
                  <span
                    className="lime-copy block absolute inset-0"
                    style={{
                      color: tool.isOutlined ? "#F5F2EC" : "#CAFF00",
                      WebkitTextStroke: tool.isOutlined ? "2px #CAFF00" : "none",
                      clipPath: isHovered ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                      transition: "clip-path 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {displayText}
                  </span>

                  {/* Blinking cursor */}
                  {cursorStates[index] && (
                    <span
                      className="inline-block ml-1"
                      style={{
                        color: "#CAFF00",
                        fontSize: "0.8em",
                        animation: "blink 1s step-end infinite",
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
