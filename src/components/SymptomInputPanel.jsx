import { Thermometer, Activity, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export default function SymptomInputPanel({ symptoms, onSymptomChange, onMedicationToggle }) {
  const sliders = [
    { label: 'Pain Intensity', field: 'pain', min: 0, max: 10, unit: '/10', icon: AlertCircle, color: '#FF6B6B' },
    { label: 'Temperature', field: 'temperature', min: 35, max: 42, step: 0.1, unit: '°C', icon: Thermometer, color: '#FFD700' },
    { label: 'Fatigue Level', field: 'fatigue', min: 0, max: 10, unit: '/10', icon: Activity, color: '#4D79FF' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Telemetry Sliders */}
      <div className="glass-card flex flex-col gap-8 flex-1">
        {sliders.map((s, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-white/40 group">
              <div className="flex items-center gap-2 group-hover:text-primary transition-colors">
                <s.icon className="w-4 h-4 shadow-blue-glow" style={{ color: symptoms[s.field] > (s.max * 0.7) ? s.color : '#0066FF' }} />
                {s.label}
              </div>
              <div className="text-white font-black text-xl">
                {symptoms[s.field]}{s.unit}
              </div>
            </div>
            
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step || 1}
              value={symptoms[s.field]}
              onChange={(e) => onSymptomChange(s.field, parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary transition-all hover:bg-white/20"
              style={{
                background: `linear-gradient(to right, ${s.color} ${(symptoms[s.field] - s.min) / (s.max - s.min) * 100}%, rgba(255,255,255,0.1) 0%)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Medication Switcher */}
      <div className="glass-card flex flex-col justify-center items-center text-center group cursor-pointer hover:border-primary/30" onClick={() => onMedicationToggle(!symptoms.medicationTaken)}>
        <div className={`w-28 h-28 rounded-full flex items-center justify-center border-4 mb-6 transition-all duration-500 scale-110
          ${symptoms.medicationTaken ? 'bg-primary/10 border-primary shadow-blue-glow' : 'bg-white/5 border-white/10 group-hover:bg-white/[0.08]'}`}>
          <CheckCircle className={`w-12 h-12 transition-all ${symptoms.medicationTaken ? 'text-primary' : 'text-white/20'}`} />
        </div>
        <div>
          <h3 className={`text-2xl font-heading font-black mb-1 transition-all ${symptoms.medicationTaken ? 'text-white' : 'text-white/40'}`}>
            {symptoms.medicationTaken ? 'Dose Taken' : 'Pending Dose'}
          </h3>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">Daily Medication Logic</p>
        </div>
        
        <button className={`mt-8 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all
          ${symptoms.medicationTaken ? 'bg-primary text-white border-primary' : 'border-white/10 text-white/50 group-hover:border-primary group-hover:text-primary'}`}>
          {symptoms.medicationTaken ? 'Reset Status' : 'Mark as Taken'}
        </button>
      </div>
    </div>
  );
}
