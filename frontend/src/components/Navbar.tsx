'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/icons';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = ['About', 'Projects', 'Resume', 'Contact'];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg font-heading">
            PK
          </div>
          <span className="font-heading font-semibold text-lg hidden sm:block">Piyush Kr. Priyadarshi</span>
        </div>

        {/* Desktop Links & Socials */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground mr-6">
            <Link href="#about" className="hover:text-primary transition-colors">About</Link>

            <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>

            <Link href="#resume" className="hover:text-primary transition-colors">Resume</Link>

            <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
            <span className="text-white/20">|</span>
          </div>



          <div className="flex items-center gap-4">
            <Link href="https://github.com/piyush-priyadarshi26" className="text-muted-foreground hover:text-white transition-colors" target="_blank">
              <Github size={20} />
            </Link>
            <Link href="https://www.linkedin.com/in/piyushkumarpriyadarshi/" className="text-muted-foreground hover:text-white transition-colors" target="_blank">
              <Linkedin size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </Link>
          ))}
          <div className="flex items-center gap-4 mt-2 pt-4 border-t border-white/5">
            <Link href="https://github.com/piyush-priyadarshi26" className="text-muted-foreground hover:text-white" target="_blank">
              <Github size={24} />
            </Link>
            <Link href="https://www.linkedin.com/in/piyushkumarpriyadarshi/" className="text-muted-foreground hover:text-white" target="_blank">
              <Linkedin size={24} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
