import React, { useState } from 'react';
import { X, CheckCircle2, Lock, Copy, Check, ShieldAlert, Award, Trophy, Gift, Sparkles, Coins } from 'lucide-react';
import { ClubRule, Achievement } from '../types/game';
import { ENEMY_TEMPLATES } from '../data/rules';

interface CodexModalProps {
  isOpen: boolean;
  onClose: () => void;
  rules: ClubRule[];
  achievements: Achievement[];
  onClaimReward: (id: string) => void;
  purifiedCount: number;
  funds: number;
  defaultTab?: 'rules' | 'achievements' | 'dossier' | 'petition';
}

export const CodexModal: React.FC<CodexModalProps> = ({
  isOpen,
  onClose,
  rules,
  achievements,
  onClaimReward,
  purifiedCount,
  funds,
  defaultTab = 'rules',
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'achievements' | 'dossier' | 'petition'>(defaultTab);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const unlockedCount = rules.filter((r) => r.unlocked).length;
  const unlockedAchievementsCount = achievements.filter((a) => a.unlocked).length;
  const unclaimedAchievementsCount = achievements.filter((a) => a.unlocked && !a.claimed).length;

  const petitionText = `【金融科技社 · 痛改前非良心改革連署書】
------------------------------------------------
我們是一群曾被貪婪蒙蔽心智的金融科技社員。
在正義聖靈咕咕雞 Zanna 的聖光雷射照射下，我們已洗滌污穢靈魂，
追回社團公積金 NT$ ${funds.toLocaleString()}，並感化了 ${purifiedCount} 名迷途幹部！

我們鄭重立誓恪守《金科社正義十誡》：
1. 社員不是韭菜，禁止假借社團名義吸金接盤。
2. 金融科技旨在普惠大眾，非內線投機遮羞布。
3. 嚴禁公款私用開 100 倍槓桿或抄底迷因幣。
4. 拒絕假實習真直銷，實習機會全數公開透明。
5. 莫造 PPT 空殼項目騙取學校補助與外部贊助。
6. 禁止黑話霸凌，回歸代碼與學術本質。
7. 虧損誠實認錯，絕不拉學弟妹墊背抬轎。
8. 社辦是研究殿堂，禁止私設礦機與非法換匯。
9. 尊重多元金融，拒絕邪教式代幣崇拜。
10. 科技向善，心中長存咕咕雞 Zanna 的正義雷射！

連署發起人：正義咕咕雞 Zanna & 全體醒悟社員
連署日期：${new Date().toLocaleDateString('zh-TW')}
「咯咯咯！勸你善良！」`;

  const handleCopyPetition = async () => {
    try {
      await navigator.clipboard.writeText(petitionText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📜</span>
            <div>
              <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>金融科技社 · 正義守則聖典與懺悔錄</span>
                <span className="text-xs font-normal text-slate-400">
                  (守則: {unlockedCount}/{rules.length} · 成就: {unlockedAchievementsCount}/{achievements.length})
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                以正義雷射感化貪婪社員，解鎖榮耀里程碑與社團憲章
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-950/30 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3.5 py-2 font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'rules'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>正義十誡守則</span>
            <span className="font-mono text-[11px]">({unlockedCount}/{rules.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-3.5 py-2 font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 relative ${
              activeTab === 'achievements'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>成就里程碑</span>
            <span className="font-mono text-[11px]">({unlockedAchievementsCount}/{achievements.length})</span>
            {unclaimedAchievementsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 animate-pulse">
                {unclaimedAchievementsCount} 可領
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-3.5 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'dossier'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            貪婪幹部圖鑑與黑歷史
          </button>

          <button
            onClick={() => setActiveTab('petition')}
            className={`px-3.5 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'petition'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            改革連署自白書
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB 1: RULES */}
          {activeTab === 'rules' && (
            <div className="space-y-4">
              <div className="bg-amber-950/30 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200/90 flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  提示：在戰鬥中用正義雷射徹底感化各類型的貪婪社員與 Boss，即可喚醒被蒙蔽的社團規則！
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className={`rounded-xl p-4 border transition-all ${
                      rule.unlocked
                        ? 'bg-slate-800/80 border-amber-500/40 shadow-sm shadow-amber-500/10'
                        : 'bg-slate-900/40 border-slate-800 opacity-70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        {rule.unlocked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                        <h3
                          className={`text-sm font-bold ${
                            rule.unlocked ? 'text-amber-300' : 'text-slate-400'
                          }`}
                        >
                          {rule.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-xs text-amber-200/70 mb-2 font-medium">
                      {rule.subtitle}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {rule.unlocked
                        ? rule.description
                        : '【尚未解鎖】感化更多貪婪幹部或擊敗當前波數，以揭示這條被塵封的正義守則。'}
                    </p>

                    {rule.unlocked && (
                      <div className="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800/80 text-[11px] text-amber-200/80 italic">
                        {rule.satiricalNote}
                        <div className="text-right text-[10px] text-slate-400 mt-1 not-italic">
                          —— 醒悟對象: {rule.reformedBy}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ACHIEVEMENTS (NEW FEATURE) */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              {/* Summary Stats Header */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">成就達成率</div>
                    <div className="text-base font-mono font-bold text-slate-100">
                      {unlockedAchievementsCount} / {achievements.length}
                      <span className="text-xs text-amber-400 ml-1.5 font-normal">
                        ({Math.round((unlockedAchievementsCount / achievements.length) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">成就回饋總公積金</div>
                    <div className="text-base font-mono font-bold text-emerald-400">
                      NT${' '}
                      {achievements
                        .filter((a) => a.claimed)
                        .reduce((sum, a) => sum + a.rewardFunds, 0)
                        .toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">待領取獎勵</div>
                    <div className="text-base font-mono font-bold text-cyan-300">
                      {unclaimedAchievementsCount} 項
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {achievements.map((item) => {
                  const progressPct = Math.min(100, Math.round((item.currentProgress / item.maxProgress) * 100));

                  return (
                    <div
                      key={item.id}
                      className={`rounded-xl p-4 border transition-all flex flex-col justify-between ${
                        item.unlocked
                          ? 'bg-slate-800/80 border-amber-500/40 shadow-sm shadow-amber-500/10'
                          : 'bg-slate-900/50 border-slate-800/90 opacity-75'
                      }`}
                    >
                      <div>
                        {/* Title Row */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0 border ${
                                item.unlocked
                                  ? 'bg-amber-500/20 border-amber-400/60 shadow-md shadow-amber-500/20'
                                  : 'bg-slate-800 border-slate-700 text-slate-500'
                              }`}
                            >
                              {item.icon}
                            </span>
                            <div>
                              <h4
                                className={`text-sm font-bold flex items-center gap-1.5 ${
                                  item.unlocked ? 'text-amber-300' : 'text-slate-300'
                                }`}
                              >
                                <span>{item.title}</span>
                              </h4>
                              <div className="text-[11px] text-slate-400">
                                {item.subtitle}
                              </div>
                            </div>
                          </div>

                          {/* Action Button / Status Badge */}
                          {item.unlocked ? (
                            item.claimed ? (
                              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg shrink-0">
                                <Check className="w-3.5 h-3.5" />
                                <span>已領取</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => onClaimReward(item.id)}
                                className="flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 px-3 py-1.5 rounded-lg shadow-md shadow-amber-500/30 active:scale-95 transition-all shrink-0 cursor-pointer animate-pulse"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>領取 NT${item.rewardFunds.toLocaleString()}</span>
                              </button>
                            )
                          ) : (
                            <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 shrink-0">
                              進行中
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-300 leading-relaxed mb-2">
                          {item.description}
                        </p>

                        {/* Lore Quote */}
                        <div className="text-[11px] text-amber-200/70 italic mb-3 bg-slate-950/50 p-2 rounded-lg border border-slate-800/60">
                          {item.flavorQuote}
                        </div>
                      </div>

                      {/* Progress Meter */}
                      <div className="space-y-1 pt-1 border-t border-slate-800/60">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">達成進度</span>
                          <span className="font-mono tabular-nums text-slate-200">
                            {item.unlocked
                              ? `${item.maxProgress} / ${item.maxProgress} ${item.progressFormat || ''}`
                              : `${item.currentProgress} / ${item.maxProgress} ${item.progressFormat || ''}`}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                          <div
                            className={`h-full transition-all duration-300 rounded-full ${
                              item.unlocked ? 'bg-amber-400' : 'bg-slate-500'
                            }`}
                            style={{ width: `${item.unlocked ? 100 : progressPct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: DOSSIER */}
          {activeTab === 'dossier' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                深入了解那些在金融科技社橫行霸道的典型貪婪角色，以及他們被咕咕雞 Zanna 感化前後的劇烈反差：
              </div>

              <div className="grid grid-cols-1 gap-4">
                {Object.values(ENEMY_TEMPLATES).map((template) => (
                  <div
                    key={template.type}
                    className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner"
                      style={{ backgroundColor: `${template.color}25`, border: `2px solid ${template.color}60` }}
                    >
                      {template.avatarIcon}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                          <span>{template.name}</span>
                          <span
                            className="text-[10px] px-2 py-0.5 rounded font-mono font-bold"
                            style={{ backgroundColor: `${template.color}30`, color: template.color }}
                          >
                            貪婪值: {template.baseGreed}
                          </span>
                        </h4>
                        <span className="text-xs text-amber-400 font-mono">
                          隨身社費: NT$ {template.fundDrop.toLocaleString()}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="text-red-400/90 flex items-start gap-1.5">
                          <span className="shrink-0 font-semibold">😈 囂張發言：</span>
                          <span className="italic">
                            「{template.quotePool[0]}」
                          </span>
                        </div>
                        <div className="text-emerald-400 flex items-start gap-1.5">
                          <span className="shrink-0 font-semibold">😇 醒悟懺悔：</span>
                          <span className="italic">
                            「{template.repentQuotePool[0]}」
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PETITION */}
          {activeTab === 'petition' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
                {petitionText}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCopyPetition}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-lg shadow-amber-500/20"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? '已複製到剪貼簿！' : '一鍵複製改革連署書'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>反思銘記於心，科技向善，勸你善良。</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-medium"
          >
            返回戰鬥
          </button>
        </div>
      </div>
    </div>
  );
};
