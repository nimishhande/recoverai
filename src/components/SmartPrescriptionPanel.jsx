import { Check, X, AlertOctagon } from 'lucide-react';

export default function SmartPrescriptionPanel({ recommendations, priority }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT':
        return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]' };
      case 'HIGH':
        return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', glow: 'shadow-[0_0_15px_rgba(234,179,8,0.3)]' };
      default:
        return { bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary', glow: 'shadow-blue-glow' };
    }
  };
  
  const colors = getPriorityColor(priority);
  
  return (
    <div className="glass-card flex flex-col h-full border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[12px] font-bold text-white/40 uppercase tracking-[0.3em]">AI Prescription</h3>
      </div>
      
      <div className={`p-5 mb-8 rounded-xl border ${colors.border} ${colors.bg} ${colors.glow} flex gap-4 transition-all duration-300 hover:scale-[1.02]`}>
        <AlertOctagon className={`w-8 h-8 ${colors.text} shrink-0`} />
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${colors.text} mb-1`}>
            Priority Rating: {priority}
          </p>
          <p className="text-[13px] text-white/80 leading-relaxed font-medium">{recommendations.consultDoctor}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 mt-auto">
        {/* Approved Actions */}
        <div>
          <h4 className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Approved Protocol
          </h4>
          <ul className="space-y-3">
            {recommendations.whatToDo.map((action, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[13px] text-white/60 group">
                <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="leading-snug">{action}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Prohibited Actions */}
        <div>
          <h4 className="text-[11px] font-bold text-red-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
            Restricted Actions
          </h4>
          <ul className="space-y-3">
            {recommendations.whatToAvoid.map((precaution, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[13px] text-white/50 group">
                <div className="p-1 rounded-full bg-red-400/10 text-red-400 mt-0.5 group-hover:bg-red-400 group-hover:text-white transition-colors">
                  <X className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="leading-snug">{precaution}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
