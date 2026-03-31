import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import SymptomInputPanel from '../components/SymptomInputPanel';
import DailyChecklist from '../components/DailyChecklist';
import RecoveryScoreCard from '../components/RecoveryScoreCard';
import RiskLevelCard from '../components/RiskLevelCard';
import AdherenceCard from '../components/AdherenceCard';
import SmartPrescriptionPanel from '../components/SmartPrescriptionPanel';
import DietRecommendationPanel from '../components/DietRecommendationPanel';
import ChatBot from '../components/ChatBot';
import { calculateRecoveryScore, getRecoveryPhase } from '../utils/recoveryScoreAgent';
import { detectRiskLevel } from '../utils/riskDetectionAgent';
import { calculateAdherence } from '../utils/adherenceAgent';
import { generateRecommendations } from '../utils/recommendationAgent';
import gsap from 'gsap';
import { Shield, Info, Activity } from 'lucide-react';

export default function PatientDashboard() {
  const [recoveryPlan, setRecoveryPlan] = useState(null);
  const containerRef = useRef(null);
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
      gsap.from('.dash-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSymptomChange = (field, value) => {
    const newSymptoms = { ...symptoms, [field]: value };
    setSymptoms(newSymptoms);
    if (recoveryPlan) {
      const updated = { ...recoveryPlan, symptoms: newSymptoms };
      localStorage.setItem('recoveryPlan', JSON.stringify(updated));
      setRecoveryPlan(updated);
    }
  };

  const handleChecklistChange = (index) => {
    const newChecklist = [...checklist];
    newChecklist[index].completed = !newChecklist[index].completed;
    setChecklist(newChecklist);
    if (recoveryPlan) {
      const updated = { ...recoveryPlan, checklist: newChecklist };
      localStorage.setItem('recoveryPlan', JSON.stringify(updated));
      setRecoveryPlan(updated);
    }
  };

  const adherence = calculateAdherence(checklist, symptoms.medicationTaken);
  const recoveryScore = calculateRecoveryScore(symptoms, adherence, 5, recoveryPlan?.patientInfo?.condition || 'general');
  const recoveryPhase = getRecoveryPhase(5);
  const riskLevel = detectRiskLevel(symptoms, adherence, 5);
  const recommendations = generateRecommendations(symptoms, recoveryPlan?.patientInfo?.condition || 'general');

  if (!recoveryPlan) return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-dark pt-32 pb-20 selection:bg-primary selection:text-white">
      <Header />
      <ChatBot />
      
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Top Section: Welcome & Alerts */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 dash-reveal">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-primary/20">
                Live Monitoring Active
              </span>
              <span className="text-white/20 text-xs font-medium">Protocol: {recoveryPlan.patientInfo.condition}</span>
            </div>
            <h1 className="text-5xl font-heading font-black text-white tracking-tight">
              Hello, {recoveryPlan.patientInfo.name}
            </h1>
            <p className="text-white/40 font-medium mt-2 max-w-lg">
              Your autonomous recovery agent is analyzing your vitals and adherence to ensure optimal healing.
            </p>
          </div>

          {riskLevel.level === 'HIGH' && (
            <div className="glass-card !bg-red-500/10 border-red-500/20 flex items-center gap-4 py-4 px-6 animate-pulse">
              <Shield className="text-red-500 w-6 h-6" />
              <div>
                <p className="text-red-500 font-bold text-sm leading-tight">Critical Risk Detected</p>
                <p className="text-red-500/60 text-xs">{riskLevel.recommendation}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Primary Metrics Tier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 dash-reveal">
          <RecoveryScoreCard score={recoveryScore} phase={recoveryPhase} />
          <RiskLevelCard level={riskLevel.level} recommendation={riskLevel.recommendation} />
          <AdherenceCard adherence={adherence} />
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Main Controls Area */}
          <div className="xl:col-span-2 space-y-10 dash-reveal">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Activity className="text-primary w-5 h-5" />
                <h2 className="text-xl font-heading font-bold text-white tracking-tight uppercase tracking-widest text-[14px]">Symptom Telemetry</h2>
              </div>
              <SymptomInputPanel
                symptoms={symptoms}
                onSymptomChange={handleSymptomChange}
                onMedicationToggle={(v) => handleSymptomChange('medicationTaken', v)}
              />
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <Info className="text-primary w-5 h-5" />
                <h2 className="text-xl font-heading font-bold text-white tracking-tight uppercase tracking-widest text-[14px]">AI Strategy & Support</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SmartPrescriptionPanel 
                  recommendations={recommendations} 
                  priority={riskLevel.level === 'HIGH' ? 'URGENT' : 'NORMAL'} 
                />
                <DietRecommendationPanel recommendations={recommendations} />
              </div>
            </section>
          </div>

          {/* Side Panel: Checklist and Risk Details */}
          <div className="space-y-10 dash-reveal">
            <section>
              <h2 className="text-[14px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6 px-1">Daily Protocol</h2>
              <DailyChecklist items={checklist} onChecklistChange={handleChecklistChange} />
            </section>

            {riskLevel.factors.length > 0 && (
              <section className="glass rounded-2xl p-8 border border-white/5">
                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Informed Risk Vectors</h3>
                <div className="space-y-3">
                  {riskLevel.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/[0.08] transition-colors group">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-blue-glow" />
                      <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{factor}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
