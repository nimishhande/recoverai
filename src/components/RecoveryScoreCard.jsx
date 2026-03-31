import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function RecoveryScoreCard({ score, phase }) {
  const scoreRef = useRef(null);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getColor = (s) => {
    if (s >= 80) return '#0066FF';
    if (s >= 60) return '#4D79FF';
    if (s >= 40) return '#FFD700';
    return '#FF6B6B';
  };

  useEffect(() => {
    if (scoreRef.current) {
        gsap.fromTo(scoreRef.current, { innerText: 0 }, {
            innerText: score,
            duration: 1.5,
            snap: { innerText: 1 },
            ease: 'power2.out'
        });
    }
  }, [score]);

  return (
    <div className="glass rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center text-center group hover:border-primary/20 transition-all duration-300">
      <div className="text-[12px] font-bold text-white/40 uppercase tracking-[0.3em] mb-8">Clinical Progress Score</div>
      
      <div className="relative w-40 h-40 mb-8">
        <svg width="160" height="160" className="transform -rotate-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <circle cx="80" cy="80" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <circle
            cx="80"
            cy="80"
            r="45"
            fill="none"
            stroke={getColor(score)}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
            style={{ filter: `drop-shadow(0 0 12px ${getColor(score)}50)` }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span ref={scoreRef} className="text-4xl font-heading font-black text-white leading-none tracking-tight">
                {score}
            </span>
            <span className="text-[14px] text-white/30 font-bold uppercase tracking-widest mt-1">/100</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full border border-white/5 group-hover:bg-white/[0.08] transition-all">
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">{phase}</span>
      </div>
    </div>
  );
}
