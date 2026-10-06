import React from 'react';
import { Sparkles, Zap, Shield, Flame, Users } from 'lucide-react';

interface GameHUDProps {
  wave: number;
  maxWave: number;
  funds: number;
  purifiedCount: number;
  combo: number;
  health: number;
  maxHealth: number;
  rage: number;
  maxRage: number;
  onTriggerUlt: () => void;
  isUltReady: boolean;
  isFiring: boolean;
  remainingEnemies?: number;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  wave,
  maxWave,
  funds,
  purifiedCount,
  combo,
  health,
  maxHealth,
  rage,
  maxRage,
  onTriggerUlt,
  isUltReady,
  isFiring,
  remainingEnemies,
}) => {
  const healthPercent = Math.max(0, Math.min(100, (health / maxHealth) * 100));
  const ragePercent = Math.max(0, Math.min(100, (rage / maxRage) * 100));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-2 pointer-events-none select-none">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-xl">
        {/* Metric 1: Health / Zanna Sanctity */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Zanna 聖潔光盾</span>
            </span>
            <span className="font-mono tabular-nums text-cyan-300">
              {Math.ceil(health)} / {maxHealth}
            </span>
          </div>
          <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
            <div
              className={`h-full transition-all duration-200 rounded-full ${
                healthPercent > 50
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-400'
                  : healthPercent > 25
                  ? 'bg-gradient-to-r from-amber-500 to-orange-400'
                  : 'bg-gradient-to-r from-red-600 to-rose-400 animate-pulse'
              }`}
              style={{ width: `${healthPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Ult Meter / 勸你善良怒氣 */}
        <div className="flex flex-col gap-1 pointer-events-auto">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <Zap className={`w-3.5 h-3.5 ${isUltReady ? 'text-amber-400 animate-bounce' : 'text-slate-400'}`} />
              <span>超載雞鳴 (空白鍵)</span>
            </span>
            <span className="font-mono tabular-nums text-amber-300">
              {Math.floor(ragePercent)}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 flex-1 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
              <div
                className={`h-full transition-all duration-150 rounded-full ${
                  isUltReady
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 animate-pulse'
                    : 'bg-gradient-to-r from-amber-600 to-yellow-600'
                }`}
                style={{ width: `${ragePercent}%` }}
              />
            </div>
            <button
              onClick={onTriggerUlt}
              disabled={!isUltReady}
              className={`px-2.5 py-0.5 text-xs font-bold rounded transition-all transform ${
                isUltReady
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/50 hover:scale-105 active:scale-95 cursor-pointer animate-pulse'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              }`}
            >
              釋放！
            </button>
          </div>
        </div>

        {/* Metric 3: Wave & Reformed Stats */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>當前侵蝕進度</span>
            <span className="font-mono tabular-nums font-semibold text-slate-200">
              第 {wave} / {maxWave} 波
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
            <span className="flex items-center gap-1 text-slate-300">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>本波剩餘幹部</span>
            </span>
            <span
              className={`font-mono tabular-nums font-bold ${
                remainingEnemies !== undefined && remainingEnemies === 0
                  ? 'text-emerald-400 animate-pulse'
                  : remainingEnemies !== undefined && remainingEnemies <= 2
                  ? 'text-amber-400'
                  : 'text-slate-200'
              }`}
            >
              {remainingEnemies !== undefined ? `${remainingEnemies} 人` : `${purifiedCount} 人已感化`}
            </span>
          </div>
        </div>

        {/* Metric 4: Reclaimed Funds & Combo */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>追回社團公積金</span>
            <span className="font-mono tabular-nums font-bold text-amber-400">
              NT$ {funds.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="flex items-center gap-1 text-slate-400">
              <Flame className={`w-3.5 h-3.5 ${combo > 2 ? 'text-orange-500 animate-bounce' : 'text-slate-500'}`} />
              <span>良心連擊</span>
            </span>
            <span className={`font-mono tabular-nums font-bold ${combo > 4 ? 'text-orange-400 text-sm animate-pulse' : 'text-slate-300'}`}>
              {combo}x COMBO
            </span>
          </div>
        </div>
      </div>

      {/* Center Laser State Notification */}
      {isFiring && (
        <div className="text-center mt-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/30 uppercase animate-pulse">
            ⚡ 正義雷射光束灌注中 · 滌除貪婪妄想 ⚡
          </span>
        </div>
      )}
    </div>
  );
};
