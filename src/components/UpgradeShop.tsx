import React from 'react';
import { UpgradeState } from '../types/game';
import { Zap, Shield, Sparkles, ArrowRight, Play, Coins } from 'lucide-react';

interface UpgradeShopProps {
  isOpen: boolean;
  funds: number;
  upgrades: UpgradeState;
  onUpgrade: (type: keyof UpgradeState, cost: number) => void;
  onStartNextWave: () => void;
  wave: number;
}

export const UpgradeShop: React.FC<UpgradeShopProps> = ({
  isOpen,
  funds,
  upgrades,
  onUpgrade,
  onStartNextWave,
  wave,
}) => {
  if (!isOpen) return null;

  const upgradeOptions = [
    {
      key: 'laserPower' as keyof UpgradeState,
      title: '正義雷射感化功率',
      desc: '提高每毫秒雷射削弱貪婪值的強度，更快讓幹部幡然醒悟！',
      currentLevel: upgrades.laserPower,
      cost: Math.floor(2500 * Math.pow(1.5, upgrades.laserPower - 1)),
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      statFormat: `Lv.${upgrades.laserPower} (+${(upgrades.laserPower * 25).toFixed(0)}% 感化DPS)`,
    },
    {
      key: 'laserWidth' as keyof UpgradeState,
      title: '聖光雷射稜鏡拓寬',
      desc: '擴大雷射光束照射直徑，同時覆蓋更多蜂擁而上的投機社員！',
      currentLevel: upgrades.laserWidth,
      cost: Math.floor(3500 * Math.pow(1.6, upgrades.laserWidth - 1)),
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      statFormat: `Lv.${upgrades.laserWidth} (光束寬度: ${12 + upgrades.laserWidth * 6}px)`,
    },
    {
      key: 'reverenceAura' as keyof UpgradeState,
      title: '聖靈咕咕雞良心力場',
      desc: '靠近 Zanna 的貪婪社員會因心中愧疚而大幅減速與後退！',
      currentLevel: upgrades.reverenceAura,
      cost: Math.floor(3000 * Math.pow(1.55, upgrades.reverenceAura - 1)),
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      statFormat: `Lv.${upgrades.reverenceAura} (範圍威懾減速: ${upgrades.reverenceAura * 15}%)`,
    },
    {
      key: 'rageGeneration' as keyof UpgradeState,
      title: '超載雞鳴共鳴核心',
      desc: '更快積累「勸你善良」超載大絕招怒氣，頻繁施展全屏淨化！',
      currentLevel: upgrades.rageGeneration,
      cost: Math.floor(4000 * Math.pow(1.7, upgrades.rageGeneration - 1)),
      icon: <Zap className="w-5 h-5 text-rose-400" />,
      statFormat: `Lv.${upgrades.rageGeneration} (怒氣積累速度: +${((upgrades.rageGeneration - 1) * 35).toFixed(0)}%)`,
    },
    {
      key: 'fundMultiplier' as keyof UpgradeState,
      title: '追回公積金記帳鏈',
      desc: '醒悟社員全數掏出私藏小金庫，追回更多被挪用的社費！',
      currentLevel: upgrades.fundMultiplier,
      cost: Math.floor(2000 * Math.pow(1.45, upgrades.fundMultiplier - 1)),
      icon: <Coins className="w-5 h-5 text-yellow-400" />,
      statFormat: `Lv.${upgrades.fundMultiplier} (社費回收率: +${((upgrades.fundMultiplier - 1) * 40).toFixed(0)}%)`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              第 {wave - 1} 波侵蝕已成功化解
            </div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2 mt-0.5">
              <span>🐔 Zanna 正義修煉工坊</span>
            </h2>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/60 border border-amber-500/40 rounded-xl text-amber-300 font-mono font-bold text-sm">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>NT$ {funds.toLocaleString()}</span>
          </div>
        </div>

        {/* Upgrade List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {upgradeOptions.map((opt) => {
            const canAfford = funds >= opt.cost;
            return (
              <div
                key={opt.key}
                className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-center justify-between gap-4 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                    {opt.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-200 flex items-center gap-2">
                      <span>{opt.title}</span>
                      <span className="text-[11px] font-mono text-cyan-400">
                        {opt.statFormat}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {opt.desc}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onUpgrade(opt.key, opt.cost)}
                  disabled={!canAfford}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
                    canAfford
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  }`}
                >
                  <span>升級</span>
                  <span className="font-mono">NT${opt.cost.toLocaleString()}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Next Wave CTA */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            下一波將面臨更強大與貪婪的幹部團伙！
          </div>
          <button
            onClick={onStartNextWave}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>迎戰第 {wave} 波</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
