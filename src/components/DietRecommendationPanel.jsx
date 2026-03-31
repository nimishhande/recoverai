import { Leaf, Droplets, Check, X } from 'lucide-react';

export default function DietRecommendationPanel({ recommendations }) {
  return (
    <div className="glass-card flex flex-col h-full border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[12px] font-bold text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
          Nutritional Intelligence
        </h3>
        <Leaf className="w-4 h-4 text-primary opacity-50" />
      </div>

      <div className="flex-1 grid grid-rows-2 gap-6">
        {/* Approved Foods */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04] group hover:border-primary/20">
          <h4 className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform" />
            Synthesized Bio-Fuels
          </h4>
          <ul className="space-y-3">
            {recommendations.recommendedFoods.map((food, idx) => (
              <li key={idx} className="flex items-center gap-3 text-[13px] text-white/70">
                <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />
                <span className="font-medium">{food}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prohibited Foods */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04] group hover:border-red-400/20">
          <h4 className="text-[11px] font-bold text-red-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full group-hover:scale-150 transition-transform" />
            Metabolic Toxins
          </h4>
          <ul className="space-y-3">
            {recommendations.foodsToAvoid.map((food, idx) => (
              <li key={idx} className="flex items-center gap-3 text-[13px] text-white/50">
                <X className="w-3.5 h-3.5 text-red-400 stroke-[3]" />
                <span className="font-medium">{food}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
