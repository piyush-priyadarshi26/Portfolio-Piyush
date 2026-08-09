import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";

export default function Home() {
  return (
    <>
      {/* Spotlight Cursor - Following user across the whole page */}
      <SpotlightCursor 
        config={{
          color: "#f97316", // Tailwind orange-500
          radius: 300,
          brightness: 0.1
        }}
      />
      
      <Navbar />
      <main className="flex flex-col gap-12 sm:gap-20">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
