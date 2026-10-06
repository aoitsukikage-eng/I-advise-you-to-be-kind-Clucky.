import React from 'react';
import { Volume2, VolumeX, BookOpen, RotateCcw, ShieldCheck, Trophy } from 'lucide-react';

interface TopNavProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenCodex: () => void;
  onRestart: () => void;
  unlockedRulesCount: number;
  totalRulesCount: number;
  unlockedAchievementsCount?: number;
  totalAchievementsCount?: number;
  unclaimedAchievementsCount?: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  isMuted,
  onToggleMute,
  onOpenCodex,
  onRestart,
  unlockedRulesCount,
  totalRulesCount,
  unlockedAchievementsCount = 0,
  totalAchievementsCount = 0,
  unclaimedAchievementsCount = 0,
}) => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight text-amber-400 select-none flex items-center gap-2">
          <span className="text-2xl">🐔</span>
          <span>勸你善良咕咕雞</span>
        </span>
        <span className="text-xs text-slate-400 hidden sm:inline-block">
          · 守護金融科技社的正義聖靈 Zanna
        </span>
      </div>

      {/* Zone 2: Navigation / Info items */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <div className="flex items-center gap-1.5 text-xs text-amber-200/90">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>正義守則:</span>
          <span className="font-mono tabular-nums font-bold text-amber-300">
            {unlockedRulesCount}/{totalRulesCount}
          </span>
        </div>
        <span className="text-slate-600">·</span>
        <div className="flex items-center gap-1.5 text-xs text-cyan-200/90">
          <Trophy className="w-4 h-4 text-cyan-400" />
          <span>榮耀成就:</span>
          <span className="font-mono tabular-nums font-bold text-cyan-300">
            {unlockedAchievementsCount}/{totalAchievementsCount}
          </span>
        </div>
        <span className="text-slate-600">·</span>
        <span className="text-xs text-slate-400">
          滑鼠按住發射正義雷射 · 空白鍵釋放超載雞鳴
        </span>
      </div>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenCodex}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/40 rounded-lg hover:bg-amber-900/60 transition-colors whitespace-nowrap relative"
          title="查看社團反思錄與規則"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>社團規則與成就</span>
          {unclaimedAchievementsCount > 0 && (
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 animate-pulse">
              {unclaimedAchievementsCount}
            </span>
          )}
        </button>

        <button
          onClick={onToggleMute}
          className="p-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          title={isMuted ? '開啟音效' : '靜音'}
          aria-label={isMuted ? '開啟音效' : '靜音'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        <button
          onClick={onRestart}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
          title="重新開始"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">重置關卡</span>
        </button>
      </div>
    </header>
  );
};

