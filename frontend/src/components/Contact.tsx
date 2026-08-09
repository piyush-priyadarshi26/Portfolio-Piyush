'use client';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };
    console.log("Sending data:", data);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log("Response status:", res.status);
      if (res.ok) {
        setStatus('Message sent successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      console.error("Fetch error:",err);
      setStatus('An error occurred.');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-primary font-medium tracking-wider uppercase text-sm mb-2">Get In Touch</h2>
        <h3 className="text-3xl md:text-5xl font-bold font-heading text-white">Let's build something together.</h3>
      </div>

      <div className="relative group">
        {/* Gradient Border Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-[2rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        {/* Form Card */}
        <div className="relative bg-background border border-white/10 rounded-[2rem] p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-muted-foreground">How can I help you?</label>
              <textarea 
                id="message" 
                name="message" 
                required
                rows={5}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button type="submit" className="w-full h-14 rounded-xl bg-white text-black hover:bg-neutral-200 font-bold text-lg flex items-center justify-center gap-2">
              Send Message <Send size={18} />
            </Button>

            {status && (
              <p className="text-center text-sm mt-4 text-orange-400 font-medium">{status}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
