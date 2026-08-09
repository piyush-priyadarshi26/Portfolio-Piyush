'use client';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] -z-10" />

      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-8">
        <Zap size={16} className="fill-orange-400" />
        <span>Passionate About Tech & Startups</span>
      </div>

      {/* Typography */}
      <div className="text-center max-w-4xl space-y-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-tight tracking-tight text-white">
          Curious <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
            Web Dev Learner.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          I’m deeply curious about technology, innovation, and the journey of creating meaningful things. Exploring projects, internships, and startup culture.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
        <Link href="#projects">
          <Button size="lg" className="bg-white text-black hover:bg-neutral-200 font-medium px-8 rounded-full h-12">
            View Projects
          </Button>
        </Link>
        <Link href="#contact">
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-full h-12 px-8">
            Get in touch
          </Button>
        </Link>
      </div>

      {/* Metrics */}
      <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/5 pt-10 w-full max-w-4xl mx-auto">
        {[
          { label: "Current Focus", value: "Web Dev" },
          { label: "Hackathon Participation", value: "SIH 2025" },
          { label: "Tech Interest", value: "AI & Tech" },
        ].map((stat, i) => (  
          <div key={i} className="text-center">
            <div className="text-3xl font-bold text-white font-heading">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
