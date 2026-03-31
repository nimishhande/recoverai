import { AlertTriangle, ShieldCheck, ShieldAlert, AlertCircle } from 'lucide-react';

export default function RiskLevelCard({ level, recommendation }) {
  const getSeverity = () => {
    switch (level) {
      case 'HIGH':
        return { color: '#FF4D4D', icon: ShieldAlert, label: 'Critical Risk', bg: 'bg-red-500/10', border: 'border-red-500/20' };
      case 'MEDIUM':
        return { color: '#FFD700', icon: AlertTriangle, label: 'Moderate Concern', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
      case 'LOW':
      default:
        return { color: '#0066FF', icon: ShieldCheck, label: 'Nominal Health', bg: 'bg-primary/10', border: 'border-primary/20' };
    }
  };

  const s = getSeverity();

  return (
    <div className={`glass rounded-2xl p-8 border flex flex-col items-center justify-center text-center group transition-all duration-500 ${s.border} ${s.bg}`}>
      <div className="text-[12px] font-bold text-white/40 uppercase tracking-[0.3em] mb-8">System Risk Assessment</div>
      
      <div className="relative mb-8">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent w-2/3 animate-glow-rotate duration-2000" />
        </div>
        
        <div className="w-40 h-40 rounded-full border border-white/5 flex items-center justify-center relative">
          <s.icon className="w-16 h-16 transition-all duration-1000 group-hover:scale-110" style={{ color: s.color, filter: `drop-shadow(0 0 15px ${s.color}60)` }} />
          {/* Pulsing Outer Ring */}
          <div className="absolute inset-0 rounded-full animate-pulse border-2" style={{ borderColor: `${s.color}20`, opacity: level === 'HIGH' ? 1 : 0.4 }} />
          {/* Active Sector Indicators */}
          <div className="absolute top-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color, left: '50%', transform: 'translateX(-50%) translate-y(-50%)' }} />
          <div className="absolute bottom-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color, left: '50%', transform: 'translateX(-50%) translate-y(50%)' }} />
        </div>
      </div>
      
      <h3 className="text-2xl font-heading font-black text-white mb-2 uppercase tracking-tight">{s.label}</h3>
      <p className="text-xs font-medium text-white/40 max-w-[200px] leading-snug">{recommendation}</p>
    </div>
  );
}
