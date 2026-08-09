import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: "Scholarship Checker",
    category: "SIH 2025 Platform",
    gradient: "from-orange-500 to-rose-500",
    bgImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    link: "https://scholarshipreadyaccount.netlify.app/",
    colSpan: "md:col-span-2",
  },
  {
    title: "Mathematical Animations",
    category: "Python & Manim",
    gradient: "from-blue-500 to-indigo-500",
    bgImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop",
    link: "#",
    colSpan: "md:col-span-1",
  },
  {
    title: "Health Tech Innovation",
    category: "Wellwith Bootcamp",
    gradient: "from-emerald-500 to-teal-500",
    bgImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop",
    link: "#",
    colSpan: "md:col-span-1",
  },
  {
    title: "More Projects Soon",
    category: "Exploration",
    gradient: "from-purple-500 to-pink-500",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    link: "#",
    colSpan: "md:col-span-2",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 w-full max-w-none mx-auto">
      <div className="mb-16 max-w-7xl mx-auto">
        <h2 className="text-primary font-medium tracking-wider uppercase text-sm mb-2">Featured Work</h2>
        <h3 className="text-3xl md:text-5xl font-bold font-heading text-white">Selected Projects</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
        {projects.map((project, i) => (
          <Link href={project.link || "#"} target="_blank" key={i} className={`group relative block h-[600px] rounded-3xl overflow-hidden bg-card border border-white/5 ${project.colSpan}`}>
            
            {/* Background Image that will never show duplicate alt text if it fails */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-50"
              style={{ backgroundImage: `url(${project.bgImage})` }}
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80 mix-blend-overlay transition-all duration-700 z-10`} />
            
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-orange-400 font-medium text-sm mb-2">{project.category}</p>
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold text-white font-heading">{project.title}</h4>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
