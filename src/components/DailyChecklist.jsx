import { CheckCircle2, Circle } from 'lucide-react';

export default function DailyChecklist({ items, onChecklistChange }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <label 
          key={index} 
          className="group relative flex items-center p-5 glass rounded-2xl cursor-pointer hover:bg-white/[0.08] transition-all duration-300 border border-white/5 overflow-hidden"
        >
          {/* Animated Background Progress */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-primary/10 transition-all duration-500 ease-out z-0" 
            style={{ width: item.completed ? '100%' : '0%' }}
          />
          
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onChecklistChange(index)}
            className="sr-only"
          />
          
          <div className="relative z-10 flex items-center gap-4 w-full">
            <div className={`transition-all duration-300 ${item.completed ? 'text-primary scale-110 shadow-blue-glow rounded-full' : 'text-white/20 group-hover:text-white/50'}`}>
              {item.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </div>
            
            <span className={`text-[14px] font-medium transition-all duration-300 ${item.completed ? 'text-white/60 line-through decoration-primary/50' : 'text-white group-hover:text-primary'}`}>
              {item.task}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
}
