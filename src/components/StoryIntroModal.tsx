import React from 'react';
import { Sparkles, Zap, Shield, HeartHandshake } from 'lucide-react';

interface StoryIntroModalProps {
  isOpen: boolean;
  onStartGame: () => void;
}

export const StoryIntroModal: React.FC<StoryIntroModalProps> = ({
  isOpen,
  onStartGame,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 flex flex-col">
        {/* Character Badge */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-lg shadow-amber-500/20 shrink-0">
            🐔
          </div>
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              正義降臨 · 勸你善良
            </div>
            <h1 className="text-2xl font-black text-slate-100">
              勸你善良咕咕雞 <span className="text-amber-400">Zanna</span>
            </h1>
          </div>
        </div>

        {/* Story Prose */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          <p>
            🔥 <strong className="text-red-400">我們受夠金融科技社了！</strong>
            原本該是探討演算法與普惠金融的社團，如今全被這幫貪婪幹部搞爛了——成天開 100 倍槓桿炒迷因幣、搞假實習老鼠會拉下線、用空頭 PPT 騙贊助，甚至還把大家繳的社費全部拿去合約爆倉！
          </p>
          <p>
            ✨ 感應到全體社員的憤怒與哀號，社團創始守護神——
            <strong className="text-amber-300">聖靈咕咕雞「Zanna（贊娜）」</strong>降臨了！
          </p>
          <p className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs text-amber-200/90">
            ⚡ <strong>作戰指南：</strong>
            <br />
            1. <strong>滑鼠移動瞄準</strong>並<strong>按住左鍵</strong>，Zanna 會噴出洶湧的「正義雷射光」！
            <br />
            2. 被雷射擊中的貪婪社員會被<strong>善良感化</strong>，痛改前非並歸還挪用的社費！
            <br />
            3. 感化社員可積聚怒氣，按 <strong>空白鍵 (Space)</strong> 釋放<strong>「全屏超載雞鳴」</strong>大絕招！
            <br />
            4. 隨波數逐步解鎖<strong>《金科社正義十誡》</strong>，重振社團風氣！
          </p>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800 mb-6 text-center text-xs">
          <div className="flex flex-col items-center gap-1 text-slate-300">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="font-semibold">正義雙核雷射</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-slate-300">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold">超載雞鳴全屏大絕</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-slate-300">
            <HeartHandshake className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold">感化貪婪社員醒悟</span>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartGame}
          className="w-full py-3 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm sm:text-base rounded-xl transition-all shadow-xl shadow-amber-500/25 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>🐔 召喚 Zanna，噴射正義雷射！</span>
        </button>
      </div>
    </div>
  );
};
