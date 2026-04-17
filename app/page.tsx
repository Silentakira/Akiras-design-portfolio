import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Tools from "@/components/sections/Tools";
import Marquee from "@/components/sections/Marquee";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <About />
      <Experience />
      <Tools />
      <Marquee />
      <Education />
      <Contact />
    </main>
  );
}
