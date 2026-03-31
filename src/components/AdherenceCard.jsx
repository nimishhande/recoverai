import { Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdherenceCard({ adherence }) {
  const getAdherenceColor = (adherence) => {
    if (adherence >= 80) return '#0066FF'; // Tech Blue
    if (adherence >= 60) return '#00D1FF'; // Cyan
    if (adherence >= 40) return '#FFD700'; // Gold
    return '#FF4D4D'; // Red
  };
  
  const getAdherenceLabel = (adherence) => {
    if (adherence >= 80) return 'Optimal Protocol';
    if (adherence >= 60) return 'Acceptable Variance';
    if (adherence >= 40) return 'Protocol Deviation';
    return 'Critical Non-Compliance';
  };
  
  const color = getAdherenceColor(adherence);
  
  return (
    <div className="glass rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center text-center group transition-all duration-300 hover:border-primary/20 bg-gradient-to-br from-white/[0.02] to-transparent">
      <div className="text-[12px] font-bold text-white/40 uppercase tracking-[0.3em] mb-8">Protocol Adherence Rate</div>
      
      <div className="flex items-center justify-between w-full">
        <div className="text-left flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 shadow-blue-glow" style={{ color }} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{getAdherenceLabel(adherence)}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-heading font-black text-white tracking-tight" style={{ textShadow: `0 0 20px ${color}40` }}>
              {adherence}
            </span>
            <span className="text-xl font-bold text-white/40">%</span>
          </div>
        </div>
        
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90 drop-shadow-lg">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeDasharray={`${(adherence / 100) * 314} 314`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
             <CheckCircle2 className="w-6 h-6" style={{ color }} />
          </div>
        </div>
      </div>
    </div>
  );
}
