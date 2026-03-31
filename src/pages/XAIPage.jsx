import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { calculateRecoveryScore, getRecoveryPhase } from '../utils/recoveryScoreAgent';
import { detectRiskLevel } from '../utils/riskDetectionAgent';
import { calculateAdherence } from '../utils/adherenceAgent';
import { generateXAIExplanation, explainRiskFactors } from '../utils/xaiAgent';
import { Brain, Search, GitMerge, FileWarning, Fingerprint, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export default function XAIPage() {
  const containerRef = useRef(null);
  const [recoveryPlan, setRecoveryPlan] = useState(null);
  const [symptoms, setSymptoms] = useState({
    pain: 3,
    temperature: 37.0,
    fatigue: 3,
    medicationTaken: false,
  });
  const [checklist, setChecklist] = useState([
    { task: 'Take medication', completed: false },
    { task: 'Drink water (8 glasses)', completed: false },
    { task: 'Light exercise (as advised)', completed: false },
  ]);

  useEffect(() => {
    const stored = localStorage.getItem('recoveryPlan');
    if (stored) {
      const plan = JSON.parse(stored);
      setRecoveryPlan(plan);
      if (plan.symptoms) setSymptoms(plan.symptoms);
      if (plan.checklist) setChecklist(plan.checklist);
    }

    const ctx = gsap.context(() => {
      gsap.from('.xai-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
      
      gsap.from('.progress-bar', {
        width: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const adherence = calculateAdherence(checklist, symptoms.medicationTaken);
  const recoveryScore = calculateRecoveryScore(symptoms, adherence, 5, recoveryPlan?.patientInfo?.condition || 'general');
  const riskLevel = detectRiskLevel(symptoms, adherence, 5);
  const xaiExplanation = generateXAIExplanation(symptoms, recoveryScore, riskLevel.level, adherence);
  const riskExplanations = explainRiskFactors(riskLevel.level, riskLevel.factors);

  return (
    <div ref={containerRef} className="min-h-screen bg-dark pt-32 pb-20 selection:bg-primary selection:text-white">
      <Header />
      
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex items-center gap-4 mb-12 xai-reveal">
          <div className="w-16 h-16 glass-card !p-0 flex items-center justify-center border-primary/20 shadow-blue-glow">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-black text-white tracking-tight">AI Explainability Matrix</h1>
            <p className="text-white/40 font-medium">Transparent insights into the neural decision paths</p>
          </div>
        </div>
        
        {/* Core Analysis Summary */}
        <section className="glass-card mb-8 xai-reveal relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
          
          <div className="flex items-center gap-2 mb-6">
            <Search className="w-4 h-4 text-primary" />
            <h2 className="text-[12px] font-bold text-white/50 uppercase tracking-[0.2em]">Primary Output Narrative</h2>
          </div>
          
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl relative z-10">
            <p className="text-white/80 text-lg leading-relaxed font-body">
              {xaiExplanation.mainNarrative}
            </p>
            <div className="mt-6 pt-6 border-t border-white/5 text-[13px] font-semibold text-primary uppercase tracking-widest flex items-center gap-2">
              <Fingerprint className="w-4 h-4" />
              {xaiExplanation.summary}
            </div>
          </div>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Contribution Weights */}
          <section className="glass-card xai-reveal">
            <div className="flex items-center gap-2 mb-8">
              <GitMerge className="w-4 h-4 text-primary" />
              <h3 className="text-[12px] font-bold text-white/50 uppercase tracking-[0.2em]">Variable Weight Allocation</h3>
            </div>
            
            <div className="space-y-6">
              {[
                { factor: 'Pain Telemetry', value: Math.abs(xaiExplanation.contributions.pain), color: '#FF4D4D' },
                { factor: 'Core Temp', value: Math.abs(xaiExplanation.contributions.temperature), color: '#FFD700' },
                { factor: 'System Fatigue', value: Math.abs(xaiExplanation.contributions.fatigue), color: '#00D1FF' },
                { factor: 'Med Adherence', value: Math.abs(xaiExplanation.contributions.medication), color: '#34D399' },
                { factor: 'Protocol Compliance', value: xaiExplanation.contributions.adherence, color: '#0066FF' },
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[13px] font-bold text-white/60 uppercase tracking-widest">{item.factor}</span>
                    <span style={{ color: item.color }} className="text-[15px] font-black group-hover:scale-110 transition-transform">
                      {item.value}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="progress-bar h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(item.value, 100)}%`, 
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}80` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Detailed Narrative Engine */}
          <section className="glass-card xai-reveal flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <FileWarning className="w-4 h-4 text-primary" />
              <h3 className="text-[12px] font-bold text-white/50 uppercase tracking-[0.2em]">Secondary Deductions</h3>
            </div>
            
            <div className="space-y-4 flex-1">
              {xaiExplanation.details.map((detail, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-[14px] text-white/70 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        {/* Step-by-Step Decision Logic */}
        <section className="glass-card xai-reveal">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="w-4 h-4 text-primary" />
            <h3 className="text-[12px] font-bold text-white/50 uppercase tracking-[0.2em]">Neural Computation Tree</h3>
          </div>
          
          <div className="space-y-4">
            {[
              {
                title: "Data Ingestion",
                desc: `Gathering telemetry: Pain (${symptoms.pain}/10), Temp (${symptoms.temperature}°C), Fatigue (${symptoms.fatigue}/10).`,
                color: "border-blue-500/30 bg-blue-500/5 text-blue-500"
              },
              {
                title: "Severity Mapping",
                desc: "Calculating deviation vectors from nominal health baselines.",
                color: "border-indigo-500/30 bg-indigo-500/5 text-indigo-500"
              },
              {
                title: "Protocol Adherence Scoring",
                desc: `Validating compliance variables. Current adherence synthesized at ${adherence}%.`,
                color: "border-purple-500/30 bg-purple-500/5 text-purple-500"
              },
              {
                title: "Risk Synthesis",
                desc: `Aggregating weights to determine overall system threat level: ${riskLevel.level}.`,
                color: "border-pink-500/30 bg-pink-500/5 text-pink-500"
              },
              {
                title: "Actionable Generation",
                desc: "Compiling phase-specific prescriptive guidelines and dietary macros.",
                color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-500"
              }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-[12px] ${step.color} shadow-lg transition-transform group-hover:scale-110`}>
                    0{idx + 1}
                  </div>
                  {idx !== 4 && <div className="w-px h-full bg-white/10 my-2 group-hover:bg-white/30 transition-colors" />}
                </div>
                <div className="pb-8 pt-1">
                  <p className="text-[13px] font-bold text-white mb-1 tracking-wide">{step.title}</p>
                  <p className="text-[14px] text-white/50">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
