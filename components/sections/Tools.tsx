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
}

const toolSpecs: ToolSpec[] = [
  {
    name: "Figma",
    fontSize: "7rem",
    fontSizeMobile: "4.2rem",
    fontFamily: "Bebas Neue",
    indent: "0%",
    indentMobile: "0%",
    color: "#CAFF00",
  },
  {
    name: "Illustrator",
    fontSize: "3rem",
    fontSizeMobile: "1.8rem",
    fontFamily: "DM Mono",
    indent: "8%",
    indentMobile: "4%",
    color: "#0D0D0D",
  },
  {
    name: "Photoshop",
    fontSize: "5rem",
    fontSizeMobile: "3rem",
    fontFamily: "Bebas Neue",
    indent: "20%",
    indentMobile: "10%",
    color: "#0D0D0D",
  },
  {
    name: "Affinity Designer",
    fontSize: "2rem",
    fontSizeMobile: "1.2rem",
    fontFamily: "DM Mono",
    indent: "5%",
    indentMobile: "2%",
    color: "#0D0D0D",
  },
  {
    name: "Affinity Photo",
    fontSize: "6rem",
    fontSizeMobile: "3.6rem",
    fontFamily: "Bebas Neue",
    indent: "30%",
    indentMobile: "15%",
    color: "#0D0D0D",
  },
  {
    name: "Photomator",
    fontSize: "2.5rem",
    fontSizeMobile: "1.5rem",
    fontFamily: "DM Mono",
    indent: "15%",
    indentMobile: "8%",
    color: "#0D0D0D",
  },
  {
    name: "Affinity Publisher",
    fontSize: "4rem",
    fontSizeMobile: "2.4rem",
    fontFamily: "Bebas Neue",
    indent: "40%",
    indentMobile: "20%",
    color: "#0D0D0D",
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
    // Clear any existing animation
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

      // Show cursor for current tool
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
          // Hide cursor for current tool
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

  const swapFont = (fontFamily: "Bebas Neue" | "DM Mono") => {
    return fontFamily === "Bebas Neue" ? "DM Mono, monospace" : "Bebas Neue, sans-serif";
  };

  return (
    <section ref={sectionRef} className="relative h-screen bg-bg overflow-hidden" style={{ paddingTop: "36px" }}>
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
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 overflow-y-auto">
          {toolSpecs.map((tool, index) => {
            const isHovered = hoveredTool === index;
            const displayFont = isHovered ? swapFont(tool.fontFamily) : (tool.fontFamily === "Bebas Neue" ? "Bebas Neue, sans-serif" : "DM Mono, monospace");
            const displayText = typingStates[index] || "";
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
                  className="whitespace-nowrap"
                  style={{
                    fontSize: isMobile ? tool.fontSizeMobile : tool.fontSize,
                    fontFamily: displayFont,
                    color: tool.color,
                    lineHeight: 1.1,
                    textTransform: tool.fontFamily === "Bebas Neue" ? "uppercase" : "lowercase",
                    transition: "font-family 0s",
                  }}
                >
                  {displayText}
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
