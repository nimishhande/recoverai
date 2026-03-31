import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { defaultConditions } from '../data/conditionData';
import { User, Activity, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    condition: 'general',
    age: '',
    healthNotes: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.form-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
      
      gsap.from('.bg-glow', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
      });
    }, formRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recoveryPlan = {
      patientInfo: formData,
      startDate: new Date().toISOString(),
      daysInRecovery: 0,
      symptoms: {
        pain: 3,
        temperature: 37.0,
        fatigue: 3,
        medicationTaken: false,
      },
      checklist: [
        { task: 'Take medication', completed: false },
        { task: 'Drink water (8 glasses)', completed: false },
        { task: 'Light exercise (as advised)', completed: false },
      ],
    };
    
    localStorage.setItem('recoveryPlan', JSON.stringify(recoveryPlan));
    
    // Animate out before navigate
    gsap.to('.form-reveal', {
      y: -40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      onComplete: () => navigate('/dashboard')
    });
  };

  return (
    <div className="min-h-screen bg-dark overflow-hidden selection:bg-primary selection:text-white">
      <Header />
      
      {/* Background Ambient Glow */}
      <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div ref={formRef} className="relative z-10 max-w-2xl mx-auto px-6 pt-36 pb-20">
        <div className="form-reveal mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center border-white/10 group-hover:scale-110 transition-transform shadow-blue-glow">
              <CheckCircle2 className="text-primary w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-black text-white tracking-tight">Personalize Your Agent</h1>
              <p className="text-white/40 font-medium">Step 01: Initial Configuration</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="form-reveal group">
            <label className="flex items-center gap-2 text-sm font-bold text-white/50 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-primary transition-colors">
              <User className="w-4 h-4" />
              Patient Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white text-lg font-medium transition-all duration-300 placeholder:text-white/10 hover:bg-white/[0.08]"
              placeholder="What should the agent call you?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Condition Selection */}
            <div className="form-reveal group">
              <label className="flex items-center gap-2 text-sm font-bold text-white/50 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-primary transition-colors">
                <Activity className="w-4 h-4" />
                Recovery Case
              </label>
              <div className="relative">
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white appearance-none cursor-pointer hover:bg-white/[0.08] transition-all"
                >
                  {defaultConditions.map(cond => (
                    <option key={cond.value} value={cond.value} className="bg-dark text-white">
                      {cond.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>

            {/* Age Input */}
            <div className="form-reveal group">
              <label className="flex items-center gap-2 text-sm font-bold text-white/50 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-primary transition-colors">
                <Calendar className="w-4 h-4" />
                Patient Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                max="120"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white hover:bg-white/[0.08] transition-all"
                placeholder="Age"
              />
            </div>
          </div>

          {/* Health Notes */}
          <div className="form-reveal group">
            <label className="flex items-center gap-2 text-sm font-bold text-white/50 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-primary transition-colors">
              Clinical Context (Optional)
            </label>
            <textarea
              name="healthNotes"
              value={formData.healthNotes}
              onChange={handleChange}
              rows="4"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white resize-none hover:bg-white/[0.08] transition-all"
              placeholder="Any specific instructions from your surgeon or care team?"
            />
          </div>

          {/* Action Button */}
          <div className="form-reveal pt-6">
            <button
              type="submit"
              className="w-full btn-primary px-8 py-5 text-lg font-bold rounded-2xl group flex items-center justify-center gap-3"
            >
              Initialize Recovery Engine
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
