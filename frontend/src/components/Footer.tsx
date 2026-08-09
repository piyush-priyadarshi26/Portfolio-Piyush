'use client';
import { Eye } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    // Fetch and increment visits on mount
    const fetchVisits = async () => {
      try {
        const res = await fetch('/api/visits', {
          method: 'POST', // Increment visits when someone views the page
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setVisits(data.total_visits);
        }
      } catch (err) {
        console.error('Failed to fetch visits count.', err);
      }
    };
    
    fetchVisits();
  }, []);

  return (
    <footer className="border-t border-white/5 py-12 px-6 mt-12 bg-black/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="text-muted-foreground text-sm font-medium">
          © {new Date().getFullYear()} Piyush Kumar Priyadarshi. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <Link href="https://github.com/piyush-priyadarshi26" className="text-muted-foreground hover:text-white transition-colors" target="_blank">
            <Github size={20} />
          </Link>
          <Link href="https://www.linkedin.com/in/piyushkumarpriyadarshi/" className="text-muted-foreground hover:text-white transition-colors" target="_blank">
            <Linkedin size={20} />
          </Link>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <Eye size={16} className="text-orange-400" />
          <span className="text-sm font-medium text-white">
            Total Profile Visits: {visits !== null ? visits : '...'}
          </span>
        </div>

      </div>
    </footer>
  );
}
