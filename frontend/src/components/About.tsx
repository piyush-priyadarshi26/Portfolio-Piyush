import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left pane - Image */}
        <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-card aspect-[4/5] md:aspect-square lg:aspect-[4/5] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-pink-500/20 z-10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
          <img 
            src="alex-knight-2EJCSULRwC8-unsplash.jpg" 
            alt="Professional Headshot"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
          />
        </div>

        {/* Right pane - Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-primary font-medium tracking-wider uppercase text-sm mb-2">About Me</h2>
            <h3 className="text-3xl md:text-5xl font-bold font-heading text-white leading-tight">
              Curious about the journey of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">creating impact.</span>
            </h3>
          </div>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            I am Piyush Kumar Priyadarshi, a passionate Web Dev Learner and tech enthusiast. I'm deeply curious about innovation, startups, and how technology can be used to build meaningful solutions. Currently, I'm actively exploring new projects and seeking out internships to grow my skills.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-white/5">
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-xl">Learning & Growth</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Focused on continuous skill development by exploring Generative AI and emerging technologies. Attended a startup exploration bootcamp, gaining insights into innovation, business models, and real-world problem solving.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-xl">Technical Skills</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Building a strong foundation in Web Development and modern web frameworks. I also work with Python, utilizing libraries like Manim for mathematical animations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
