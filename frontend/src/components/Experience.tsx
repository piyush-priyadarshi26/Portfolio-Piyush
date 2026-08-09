import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const experiences = [
  {
    title: "SIH 2025 Participant",
    company: "Smart India Hackathon",
    years: "2025",
    description: "Developed the Scholarship Ready Account Checker & Awareness Hub, a web-based platform aimed at improving awareness and accessibility of scholarship opportunities for students. Focused on simplifying information and enhancing user understanding.",
  },
  {
    title: "Tech Bootcamp Attendee",
    company: "WellWith Health Startup",
    years: "2025",
    description: "Attended a 5-day startup exploration bootcamp focused on health-tech innovation. Gained exposure to startup ecosystems, business fundamentals, and practical problem-solving approaches.",
  },
  {
    title: "Continuous Learner",
    company: "Generative AI & Web Development",
    years: "Present",
    description: "Actively expanding technical knowledge by exploring modern web development and Generative AI concepts through hands-on learning.",
  },
];

const technologies = [
  "HTML", "CSS", "Python", "Manim", "GenAI", "GitHub", "Netlify", "Web Dev"
];

export default function Experience() {
  return (
    <section id="resume" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16">
        
        {/* Experience Timeline */}
        <div>
          <div className="mb-10">
            <h2 className="text-primary font-medium tracking-wider uppercase text-sm mb-2">My Journey</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-heading text-white">Experience & Learning Journey</h3>
          </div>

          <div className="space-y-12 pl-4 border-l border-white/10 relative">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8">
                {/* Timeline dot */}
                <div className="absolute -left-[22px] top-1 w-11 h-11 bg-background rounded-full flex items-center justify-center border border-white/10">
                  <Briefcase size={18} className="text-orange-400" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                  <span className="text-sm text-muted-foreground bg-white/5 px-3 py-1 rounded-full w-fit">
                    {exp.years}
                  </span>
                </div>
                <div className="text-orange-400 font-medium mb-3">{exp.company}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Resume */}
        <div className="lg:pl-10 lg:border-l border-white/5 flex flex-col justify-between">
          <div>
            <div className="mb-10">
              <h2 className="text-primary font-medium tracking-wider uppercase text-sm mb-2">Skills</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-heading text-white">Tech Stack</h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <div 
                  key={tech} 
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors text-sm font-medium"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-tr from-card to-card border border-white/10 p-8 rounded-3xl relative overflow-hidden">
             <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay" />
             <h4 className="text-2xl font-bold text-white mb-4 relative z-10">Want to see more?</h4>
             <p className="text-muted-foreground mb-6 relative z-10">
               Check out my GitHub profile to explore my code, repositories, and open-source contributions.
             </p>
             <Link href="https://github.com/piyush-priyadarshi26" target="_blank">
               <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 px-8 rounded-full relative z-10 w-full sm:w-auto">
                 View Github Profile
               </Button>
             </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
