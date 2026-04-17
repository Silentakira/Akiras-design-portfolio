"use client";

import { personalInfo } from "@/lib/data";

export default function StatusBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-[36px] bg-black z-[9999] flex items-center justify-center pointer-events-none">
      <div className="text-dm-mono text-[0.7rem] lowercase text-white text-center px-4">
        {/* Desktop version */}
        <span className="hidden md:inline">
          <span className="text-lime inline-block animate-pulse">●</span> {personalInfo.availability} · {personalInfo.currentPosition}, {personalInfo.location.toLowerCase()} · {personalInfo.currentDate}
        </span>

        {/* Mobile version with marquee */}
        <span className="md:hidden status-marquee inline-block whitespace-nowrap">
          <span className="text-lime inline-block animate-pulse">●</span> {personalInfo.availability} · {personalInfo.currentPosition}, {personalInfo.location.toLowerCase()} · {personalInfo.currentDate} · {personalInfo.availability} · {personalInfo.currentPosition}, {personalInfo.location.toLowerCase()} · {personalInfo.currentDate}
        </span>
      </div>
    </div>
  );
}
