import React, { useEffect } from 'react';
import { Trophy, ArrowRight, X } from 'lucide-react';
import { Achievement } from '../types/game';

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
  onOpenCodex: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  onClose,
  onOpenCodex,
}) => {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(() => {
        onClose();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className="fixed top-16 right-4 sm:right-6 z-50 animate-bounce duration-300">
      <div className="bg-slate-900/95 border-2 border-amber-400 rounded-xl p-3.5 shadow-2xl shadow-amber-500/20 backdrop-blur-md text-slate-100 flex items-center gap-3.5 max-w-sm">
        <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-2xl shrink-0">
          {achievement.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>榮耀成就達成！</span>
          </div>
          <div className="text-sm font-bold text-slate-100 truncate">
            {achievement.title}
          </div>
          <div className="text-xs text-amber-200/90 font-mono">
            獎勵: +NT${achievement.rewardFunds.toLocaleString()}
          </div>
        </div>

        <div className="flex flex-col gap-1 shrink-0">
          <button
            onClick={() => {
              onOpenCodex();
              onClose();
            }}
            className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] rounded transition-all flex items-center gap-1 cursor-pointer active:scale-95"
          >
            <span>查看</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 text-center"
            aria-label="關閉"
          >
            <X className="w-3.5 h-3.5 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
