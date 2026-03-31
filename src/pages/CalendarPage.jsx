import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { Calendar as CalendarIcon, Target, Activity, CheckCircle, XCircle, Clock } from 'lucide-react';
import gsap from 'gsap';

export default function CalendarPage() {
  const containerRef = useRef(null);
  const [currentDate] = useState(new Date(2026, 2, 30)); // March 2026
  
  // Simulated data for prototype
  const [dailyData] = useState({
    1: { status: 'completed', score: 85, symptoms: { pain: 3, temp: 37, fatigue: 2 } },
    2: { status: 'completed', score: 82, symptoms: { pain: 2, temp: 37, fatigue: 3 } },
    3: { status: 'partial', score: 70, symptoms: { pain: 4, temp: 37.5, fatigue: 4 } },
    4: { status: 'completed', score: 78, symptoms: { pain: 3, temp: 37, fatigue: 2 } },
    5: { status: 'missed', score: 45, symptoms: { pain: 6, temp: 37.5, fatigue: 5 } },
    6: { status: 'completed', score: 81, symptoms: { pain: 2, temp: 37, fatigue: 3 } },
    7: { status: 'completed', score: 79, symptoms: { pain: 3, temp: 37, fatigue: 2 } },
    15: { status: 'completed', score: 88, symptoms: { pain: 1, temp: 37, fatigue: 1 } },
    20: { status: 'completed', score: 90, symptoms: { pain: 0, temp: 37, fatigue: 1 } },
  });
  
  const [selectedDay, setSelectedDay] = useState(30); // Default to "today"

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cal-stagger', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out'
      });
      
      gsap.from('.day-cell', {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: 'back.out(1.5)',
        delay: 0.3
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const getDaysInMonth = () => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = () => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-[#34D399]/10', border: 'border-[#34D399]/30', text: 'text-[#34D399]', icon: CheckCircle };
      case 'partial':
        return { bg: 'bg-[#FFD700]/10', border: 'border-[#FFD700]/30', text: 'text-[#FFD700]', icon: Clock };
      case 'missed':
        return { bg: 'bg-[#FF4D4D]/10', border: 'border-[#FF4D4D]/30', text: 'text-[#FF4D4D]', icon: XCircle };
      default:
        return { bg: 'bg-white/5', border: 'border-transparent', text: 'text-white/30', icon: null };
    }
  };

  const daysArray = Array(getFirstDayOfMonth()).fill(null).concat(
    Array.from({ length: getDaysInMonth() }, (_, i) => i + 1)
  );

  const selectedData = dailyData[selectedDay];
  const StatusIcon = selectedData ? getStatusConfig(selectedData.status).icon : Clock;
  const statusColors = selectedData ? getStatusConfig(selectedData.status) : getStatusConfig(null);

  // Stats calculation
  const completedDays = Object.values(dailyData).filter(d => d.status === 'completed').length;
  const avgScore = Math.round(Object.values(dailyData).reduce((sum, d) => sum + d.score, 0) / Object.keys(dailyData).length);

  return (
    <div ref={containerRef} className="min-h-screen bg-dark pt-32 pb-20 selection:bg-primary selection:text-white">
      <Header />
      
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 cal-stagger">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 glass-card !p-0 flex items-center justify-center border-primary/20 shadow-blue-glow">
                <CalendarIcon className="w-6 h-6 text-primary" />
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-primary/20">
                Temporal Tracker
              </span>
            </div>
            <h1 className="text-4xl font-heading font-black text-white tracking-tight">Recovery Timeline</h1>
            <p className="text-white/40 font-medium mt-2">Historical analysis of symptom progression and protocol adherence</p>
          </div>
          
          <div className="flex gap-4">
            <div className="glass-card !py-3 !px-6 border-white/5 text-center">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Avg Score</p>
              <p className="text-2xl font-black text-primary drop-shadow-[0_0_10px_rgba(0,102,255,0.5)]">{avgScore}</p>
            </div>
            <div className="glass-card !py-3 !px-6 border-white/5 text-center">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Perfect Days</p>
              <p className="text-2xl font-black text-[#34D399] drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">{completedDays}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Calendar View */}
          <div className="xl:col-span-2 glass-card border-white/5 cal-stagger relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h2 className="text-2xl font-heading font-bold text-white tracking-tight">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
            </div>
            
            <div className="grid grid-cols-7 gap-3 relative z-10">
              {/* Days Header */}
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                <div key={day} className="text-center font-bold text-[10px] text-white/30 uppercase tracking-[0.2em] pb-4">
                  {day}
                </div>
              ))}
              
              {/* Calendar Days */}
              {daysArray.map((day, idx) => {
                if (!day) return <div key={`empty-${idx}`} className="w-full aspect-square" />;
                
                const dayData = dailyData[day];
                const config = getStatusConfig(dayData?.status);
                const isSelected = selectedDay === day;
                const isToday = day === 30; // Hardcoded today for prototype
                
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay(day)}
                    className={`day-cell relative w-full aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group
                      ${config.bg} ${config.border} border
                      ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-dark scale-105 z-10 shadow-blue-glow' : 'hover:scale-105'}
                      ${isToday && !isSelected ? 'border-primary/50 border-dashed' : ''}
                    `}
                  >
                    <span className={`text-lg font-bold transition-colors ${dayData ? 'text-white' : 'text-white/30 group-hover:text-white/70'}`}>
                      {day}
                    </span>
                    
                    {dayData && (
                      <div className="absolute bottom-2 inset-x-0 flex flex-col items-center gap-1">
                        <span className={`text-[10px] font-black ${config.text} drop-shadow-lg`}>{dayData.score}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${config.bg.replace('/10', '')}`} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lateral Day Analysis Panel */}
          <div className="glass-card border-white/5 flex flex-col cal-stagger bg-gradient-to-b from-white/[0.03] to-transparent">
            {selectedData ? (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${statusColors.border} ${statusColors.bg}`}>
                    <StatusIcon className={`w-6 h-6 ${statusColors.text}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-black text-white">March {selectedDay}, 2026</h3>
                    <p className={`text-[11px] font-bold uppercase tracking-widest ${statusColors.text}`}>
                      Status: {selectedData.status}
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-8">
                  {/* Score */}
                  <div>
                     <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Recorded Progress Score</p>
                     <div className="flex items-baseline gap-2">
                        <span className={`text-6xl font-heading font-black ${statusColors.text} tracking-tighter`} style={{ textShadow: `0 0 20px ${statusColors.text.replace('text-[', '').replace(']', '')}40` }}>
                          {selectedData.score}
                        </span>
                        <span className="text-xl font-bold text-white/30">/100</span>
                     </div>
                  </div>

                  {/* Telemetry Snapshot */}
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Target className="w-3 h-3 text-primary" />
                      Telemetry Snapshot
                    </p>
                    
                    <div className="space-y-4">
                      {/* Pain */}
                      <div>
                        <div className="flex justify-between items-end mb-1.5">
                          <span className="text-xs font-semibold text-white/60">Pain Level</span>
                          <span className="text-xs font-bold text-red-400">{selectedData.symptoms.pain}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-red-400 rounded-full" style={{ width: `${(selectedData.symptoms.pain / 10) * 100}%` }} />
                        </div>
                      </div>
                      
                      {/* Temp */}
                      <div>
                        <div className="flex justify-between items-end mb-1.5">
                          <span className="text-xs font-semibold text-white/60">Core Temp</span>
                          <span className="text-xs font-bold text-yellow-500">{selectedData.symptoms.temp}°C</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${((selectedData.symptoms.temp - 35) / 7) * 100}%` }} />
                        </div>
                      </div>

                      {/* Fatigue */}
                      <div>
                        <div className="flex justify-between items-end mb-1.5">
                          <span className="text-xs font-semibold text-white/60">System Fatigue</span>
                          <span className="text-xs font-bold text-blue-400">{selectedData.symptoms.fatigue}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(selectedData.symptoms.fatigue / 10) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 text-centeropacity-50 h-full py-12">
                <Activity className="w-12 h-12 text-white/10 mb-4" />
                <p className="text-white/40 text-sm font-medium">No telemetry data recorded for March {selectedDay}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
