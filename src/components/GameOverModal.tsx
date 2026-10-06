import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, BookOpen, Trophy, Skull, Coins, Sparkles, Flame } from 'lucide-react';

interface GameOverModalProps {
  isVictory: boolean;
  isOpen: boolean;
  onRestart: () => void;
  onOpenCodex: () => void;
  funds: number;
  purifiedCount: number;
  maxCombo: number;
  unlockedRulesCount: number;
  totalRulesCount: number;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isVictory,
  isOpen,
  onRestart,
  onOpenCodex,
  funds,
  purifiedCount,
  maxCombo,
  unlockedRulesCount,
  totalRulesCount,
}) => {
  useEffect(() => {
    if (isOpen && isVictory) {
      // Fire confetti burst!
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
        });
      }, 300);
    }
  }, [isOpen, isVictory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 flex flex-col items-center text-center">
        {/* Top Icon */}
        <div
          className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-4 shadow-xl ${
            isVictory
              ? 'bg-amber-500/20 border-2 border-amber-400 shadow-amber-500/20 text-amber-300'
              : 'bg-red-500/20 border-2 border-red-500/40 shadow-red-500/10 text-red-400'
          }`}
        >
          {isVictory ? <Trophy className="w-10 h-10" /> : <Skull className="w-10 h-10" />}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black mb-1">
          {isVictory ? (
            <span className="text-amber-400">大獲全勝！金科社重回正軌！</span>
          ) : (
            <span className="text-rose-400">聖潔護盾破裂！貪婪暫時得逞</span>
          )}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-md leading-relaxed">
          {isVictory
            ? '在咕咕雞 Zanna 的正義雷射照耀下，包括前社長查爾斯在內的所有貪婪幹部全數痛改前非，社團公積金全額追回，十條正義守則深植人心！'
            : '貪婪的迷因幣狂徒攻破了防線，但 Zanna 的正義之魂不滅！重整旗鼓，再次用正義雷射感化他們吧！'}
        </p>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-3 mb-6 text-left">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>追回社團公積金</span>
            </div>
            <div className="text-base sm:text-lg font-mono font-black text-amber-400 mt-0.5">
              NT$ {funds.toLocaleString()}
            </div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>感化貪婪社員</span>
            </div>
            <div className="text-base sm:text-lg font-mono font-black text-emerald-400 mt-0.5">
              {purifiedCount} 人
            </div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>最高良心連擊</span>
            </div>
            <div className="text-base sm:text-lg font-mono font-black text-orange-400 mt-0.5">
              {maxCombo}x COMBO
            </div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>守則解鎖進度</span>
            </div>
            <div className="text-base sm:text-lg font-mono font-black text-cyan-400 mt-0.5">
              {unlockedRulesCount} / {totalRulesCount} 條
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <button
            onClick={onOpenCodex}
            className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>查看社團規則反思錄</span>
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isVictory ? '再次守護社團！' : '重新召喚 Zanna'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
