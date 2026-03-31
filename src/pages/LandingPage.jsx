import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, ArrowRight, Activity, Database, Brain, ArrowUpRight } from 'lucide-react';
import DNAHelix from '../components/DNAHelix';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Initial Reveal
    const ctx = gsap.context(() => {
      // Hero Text Split Reveal
      gsap.from('.hero-word', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.5
      });

      // Data Points Reveal
      gsap.from('.stat-box', {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1.2
      });

      // Navbar Slide Down
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });

      // Floating Icons
      gsap.to('.floating-icon', {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-dark overflow-hidden selection:bg-primary selection:text-white">
      <div className="noise-overlay" />
      
      {/* 3D Background */}
      <DNAHelix />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-12 py-8">
        <div className="flex items-center gap-12">
          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border-white/20 hover:scale-110 transition-transform cursor-pointer">
            <Plus className="text-white w-6 h-6" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50 tracking-wide uppercase">
            {['Homepage', 'Services', 'About Us', 'Resources', 'Careers'].map((item) => (
              <a key={item} href="#" className="nav-item hover:text-white transition-colors">
                {item === 'Homepage' && <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block mr-2" />}
                {item}
              </a>
            ))}
          </div>
        </div>
        <button onClick={() => navigate('/onboarding')} className="nav-item btn-primary flex items-center gap-2 group">
          Get In Touch
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-44 px-12 md:px-24">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1 glass rounded-full text-xs font-bold text-primary tracking-widest uppercase mb-8 gsap-reveal">
            Our Purpose
          </span>
          <h1 ref={heroTextRef} className="text-6xl md:text-8xl font-heading font-black leading-[0.9] text-white">
            {['We', 'Empower', 'Your', 'Health', 'with', 'AI/ML.'].map((word, i) => (
              <span key={i} className="hero-word inline-block mr-4 mb-2">
                {word}
              </span>
            ))}
          </h1>
          
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-8">
            <button onClick={() => navigate('/onboarding')} className="btn-primary px-12 py-4 text-lg">
              Learn More
            </button>
            <p className="max-w-xs text-white/40 text-sm leading-relaxed">
              Pioneering the intersection of molecular biology and computational neuroscience.
            </p>
          </div>
        </div>

        {/* Data Points - Floating Cards */}
        <div ref={statsRef} className="absolute right-24 top-1/2 -translate-y-1/2 flex flex-col gap-12">
          {[
            { label: 'Health AI LLMs', value: '500K+', icon: Brain },
            { label: 'Data Points', value: '1.2M+', icon: Database },
            { label: 'AI Models', value: '78+', icon: Activity }
          ].map((stat, i) => (
            <div key={i} className="stat-box glass-card w-64 group cursor-pointer hover:shadow-blue-glow">
              <div className="flex justify-between items-start mb-4">
                <stat.icon className="text-primary w-6 h-6 floating-icon" style={{ animationDelay: `${i * 0.5}s` }} />
                <ArrowUpRight className="text-white/20 w-4 h-4 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-3xl font-heading font-bold text-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-white/40 uppercase tracking-widest">
                {stat.label}
              </div>
              {/* Connection point line from image */}
              <div className="absolute -left-12 top-1/2 w-12 h-px bg-white/10 hidden lg:block" />
              <div className="absolute -left-12 top-1/2 w-2 h-2 bg-white rounded-full -translate-y-1/2 hidden lg:block" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Contact Reveal Background */}
      <div className="absolute inset-x-0 bottom-0 py-12 flex justify-center opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-xs tracking-[0.4em] uppercase text-white/30">
          Designed for high-definition longevity • Silicon Valley © MMXXVI
        </p>
      </div>
    </main>
  );
}
