import { useState, useCallback, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { TopNav } from './components/TopNav';
import { GameHUD } from './components/GameHUD';
import { GameCanvas, GameCanvasStatsEvent } from './components/GameCanvas';
import { CodexModal } from './components/CodexModal';
import { UpgradeShop } from './components/UpgradeShop';
import { StoryIntroModal } from './components/StoryIntroModal';
import { GameOverModal } from './components/GameOverModal';
import { AchievementToast } from './components/AchievementToast';
import { INITIAL_CLUB_RULES } from './data/rules';
import { INITIAL_ACHIEVEMENTS } from './data/achievements';
import { UpgradeState, ClubRule, Achievement } from './types/game';
import { sound } from './utils/audio';
import { Zap, ShieldAlert, Trophy } from 'lucide-react';

const MAX_WAVES = 5;

export default function App() {
  const [gameState, setGameState] = useState<'TITLE' | 'PLAYING' | 'SHOP' | 'GAMEOVER' | 'VICTORY'>('TITLE');
  const [wave, setWave] = useState<number>(1);
  const [health, setHealth] = useState<number>(100);
  const [funds, setFunds] = useState<number>(0);
  const [rage, setRage] = useState<number>(0);
  const [purifiedCount, setPurifiedCount] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [isFiring, setIsFiring] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCodexOpen, setIsCodexOpen] = useState<boolean>(false);
  const [codexDefaultTab, setCodexDefaultTab] = useState<'rules' | 'achievements' | 'dossier' | 'petition'>('rules');
  const [triggerUltSignal, setTriggerUltSignal] = useState<number>(0);
  const [activeToast, setActiveToast] = useState<Achievement | null>(null);
  const [remainingEnemies, setRemainingEnemies] = useState<number>(6);

  const [rules, setRules] = useState<ClubRule[]>(() => {
    // Unlock rule 1 by default so player gets a taste of the satirical code of ethics
    return INITIAL_CLUB_RULES.map((r, idx) => (idx === 0 ? { ...r, unlocked: true } : r));
  });

  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  // References for live statistical tracking
  const laserFiredTicksRef = useRef<number>(0);
  const laserHitTicksRef = useRef<number>(0);
  const pacifistSecRef = useRef<number>(0);
  const ultUsedCountRef = useRef<number>(0);

  const [upgrades, setUpgrades] = useState<UpgradeState>({
    laserPower: 1,
    laserWidth: 1,
    rageGeneration: 1,
    reverenceAura: 1,
    fundMultiplier: 1,
  });

  // Sound toggle
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Start game from intro
  const handleStartGame = () => {
    setGameState('PLAYING');
    sound.startBGM();
    sound.playCluck();
  };

  // Trigger achievement unlock notification
  const triggerUnlockAchievement = useCallback((achievementId: string) => {
    setAchievements((prev) => {
      const target = prev.find((a) => a.id === achievementId);
      if (!target || target.unlocked) return prev;

      sound.playRuleUnlockFanfare();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: 0.85, y: 0.2 },
      });

      const updated = prev.map((a) => (a.id === achievementId ? { ...a, unlocked: true } : a));
      const newlyUnlocked = updated.find((a) => a.id === achievementId);
      if (newlyUnlocked) {
        setActiveToast(newlyUnlocked);
      }
      return updated;
    });
  }, []);

  // Claim reward funds for an achievement
  const handleClaimReward = (id: string) => {
    setAchievements((prev) =>
      prev.map((a) => {
        if (a.id === id && a.unlocked && !a.claimed) {
          setFunds((f) => f + a.rewardFunds);
          sound.playCoin();
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { x: 0.5, y: 0.5 },
          });
          return { ...a, claimed: true };
        }
        return a;
      })
    );
  };

  // Milestone Checks based on live state changes
  // 1. Combo Master
  useEffect(() => {
    if (combo > 0) {
      setAchievements((prev) =>
        prev.map((a) => {
          if (a.id === 'combo_master') {
            const nextProgress = Math.max(a.currentProgress, combo);
            if (nextProgress >= a.maxProgress && !a.unlocked) {
              triggerUnlockAchievement('combo_master');
            }
            return { ...a, currentProgress: nextProgress };
          }
          return a;
        })
      );
    }
  }, [combo, triggerUnlockAchievement]);

  // 2. Treasury Guardian
  useEffect(() => {
    setAchievements((prev) =>
      prev.map((a) => {
        if (a.id === 'treasury_guardian') {
          const nextProgress = Math.max(a.currentProgress, funds);
          if (nextProgress >= a.maxProgress && !a.unlocked) {
            triggerUnlockAchievement('treasury_guardian');
          }
          return { ...a, currentProgress: nextProgress };
        }
        return a;
      })
    );
  }, [funds, triggerUnlockAchievement]);

  // 3. Virtue Evangelist
  useEffect(() => {
    setAchievements((prev) =>
      prev.map((a) => {
        if (a.id === 'virtue_evangelist') {
          const nextProgress = Math.max(a.currentProgress, purifiedCount);
          if (nextProgress >= a.maxProgress && !a.unlocked) {
            triggerUnlockAchievement('virtue_evangelist');
          }
          return { ...a, currentProgress: nextProgress };
        }
        return a;
      })
    );
  }, [purifiedCount, triggerUnlockAchievement]);

  // 4. Decalogue Master
  useEffect(() => {
    const unlockedRulesCount = rules.filter((r) => r.unlocked).length;
    setAchievements((prev) =>
      prev.map((a) => {
        if (a.id === 'decalogue_master') {
          const nextProgress = unlockedRulesCount;
          if (nextProgress >= a.maxProgress && !a.unlocked) {
            triggerUnlockAchievement('decalogue_master');
          }
          return { ...a, currentProgress: nextProgress };
        }
        return a;
      })
    );
  }, [rules, triggerUnlockAchievement]);

  // Handle fine-grained stats events from GameCanvas
  const handleCanvasStatsEvent = useCallback(
    (event: GameCanvasStatsEvent) => {
      // 1. Laser tick & Accuracy calculation
      if (event.type === 'laser_tick') {
        laserFiredTicksRef.current++;
        if (event.hit) {
          laserHitTicksRef.current++;
        }
        // If fired regular laser, reset pacifist streak
        pacifistSecRef.current = 0;

        // If at least 3 seconds of continuous laser fired (approx 150-180 ticks)
        if (laserFiredTicksRef.current >= 150) {
          const accuracyPct = Math.round((laserHitTicksRef.current / laserFiredTicksRef.current) * 100);
          setAchievements((prev) =>
            prev.map((a) => {
              if (a.id === 'accuracy_100') {
                const nextProg = Math.max(a.currentProgress, accuracyPct);
                if (nextProg >= a.maxProgress && !a.unlocked) {
                  triggerUnlockAchievement('accuracy_100');
                }
                return { ...a, currentProgress: nextProg };
              }
              return a;
            })
          );
        }
      }

      // 2. Pacifist Monk: not firing regular laser
      if (event.type === 'pacifist_tick' && event.dtSec) {
        pacifistSecRef.current += event.dtSec;
        const currentSec = Math.floor(pacifistSecRef.current);
        setAchievements((prev) =>
          prev.map((a) => {
            if (a.id === 'pacifist_monk') {
              const nextProg = Math.max(a.currentProgress, currentSec);
              if (nextProg >= a.maxProgress && !a.unlocked) {
                triggerUnlockAchievement('pacifist_monk');
              }
              return { ...a, currentProgress: nextProg };
            }
            return a;
          })
        );
      }

      // 3. Ult used
      if (event.type === 'ult_used') {
        ultUsedCountRef.current++;
        const currentCount = ultUsedCountRef.current;
        setAchievements((prev) =>
          prev.map((a) => {
            if (a.id === 'overload_crow') {
              const nextProg = Math.max(a.currentProgress, currentCount);
              if (nextProg >= a.maxProgress && !a.unlocked) {
                triggerUnlockAchievement('overload_crow');
              }
              return { ...a, currentProgress: nextProg };
            }
            return a;
          })
        );
      }

      // 4. Boss purified
      if (event.type === 'boss_purified') {
        setAchievements((prev) =>
          prev.map((a) => {
            if (a.id === 'boss_reformer') {
              if (!a.unlocked) {
                triggerUnlockAchievement('boss_reformer');
              }
              return { ...a, currentProgress: 1 };
            }
            return a;
          })
        );
      }

      // 5. Untouchable wave clear (health == 100)
      if (event.type === 'wave_clear_health' && event.health !== undefined) {
        if (event.health >= 100) {
          setAchievements((prev) =>
            prev.map((a) => {
              if (a.id === 'untouchable_virtue') {
                if (!a.unlocked) {
                  triggerUnlockAchievement('untouchable_virtue');
                }
                return { ...a, currentProgress: 1 };
              }
              return a;
            })
          );
        }
      }
    },
    [triggerUnlockAchievement]
  );

  // Reset entire game
  const handleRestart = useCallback(() => {
    setWave(1);
    setHealth(100);
    setFunds(0);
    setRage(0);
    setPurifiedCount(0);
    setCombo(0);
    setMaxCombo(0);
    laserFiredTicksRef.current = 0;
    laserHitTicksRef.current = 0;
    pacifistSecRef.current = 0;
    ultUsedCountRef.current = 0;
    setUpgrades({
      laserPower: 1,
      laserWidth: 1,
      rageGeneration: 1,
      reverenceAura: 1,
      fundMultiplier: 1,
    });
    setRules((prev) => prev.map((r, idx) => ({ ...r, unlocked: idx === 0 })));
    setGameState('PLAYING');
    sound.startBGM();
    sound.playCluck();
  }, []);

  // Wave completion handler
  const handleWaveComplete = useCallback(() => {
    sound.stopLaser();
    setIsFiring(false);
    // Recover some health on wave clear
    setHealth((h) => Math.min(100, h + 30));
    setGameState('SHOP');
    sound.playRepentChime();
  }, []);

  // Game over / victory handler
  const handleGameOver = useCallback((victory: boolean) => {
    sound.stopLaser();
    setIsFiring(false);
    setGameState(victory ? 'VICTORY' : 'GAMEOVER');
  }, []);

  // Handle upgrade purchases
  const handleUpgrade = (type: keyof UpgradeState, cost: number) => {
    if (funds >= cost) {
      setFunds((f) => f - cost);
      setUpgrades((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
      sound.playCoin();
    }
  };

  // Proceed to next wave
  const handleStartNextWave = () => {
    setWave((w) => w + 1);
    setGameState('PLAYING');
    sound.playCluck();
  };

  // Trigger ult from UI
  const handleTriggerUlt = () => {
    if (rage >= 100) {
      setTriggerUltSignal((prev) => prev + 1);
    }
  };

  // Key listener for shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'c' || e.key === 'C') {
        setCodexDefaultTab('rules');
        setIsCodexOpen((prev) => !prev);
      } else if (e.key === 'a' || e.key === 'A') {
        setCodexDefaultTab('achievements');
        setIsCodexOpen(true);
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const unlockedRulesCount = rules.filter((r) => r.unlocked).length;
  const unlockedAchievementsCount = achievements.filter((a) => a.unlocked).length;
  const unclaimedAchievementsCount = achievements.filter((a) => a.unlocked && !a.claimed).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* 3-Zone Top Navigation Contract with Achievement Indicator */}
      <TopNav
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenCodex={() => {
          setCodexDefaultTab('rules');
          setIsCodexOpen(true);
        }}
        onRestart={handleRestart}
        unlockedRulesCount={unlockedRulesCount}
        totalRulesCount={rules.length}
        unlockedAchievementsCount={unlockedAchievementsCount}
        totalAchievementsCount={achievements.length}
        unclaimedAchievementsCount={unclaimedAchievementsCount}
      />

      {/* Floating Achievement Toast Notification */}
      <AchievementToast
        achievement={activeToast}
        onClose={() => setActiveToast(null)}
        onOpenCodex={() => {
          setCodexDefaultTab('achievements');
          setIsCodexOpen(true);
        }}
      />

      {/* Main Playing Area */}
      <main className="flex-1 flex flex-col items-center justify-between p-2 sm:p-4 max-w-6xl w-full mx-auto relative">
        {/* HUD Overlay Bar */}
        <GameHUD
          wave={wave}
          maxWave={MAX_WAVES}
          funds={funds}
          purifiedCount={purifiedCount}
          combo={combo}
          health={health}
          maxHealth={100}
          rage={rage}
          maxRage={100}
          onTriggerUlt={handleTriggerUlt}
          isUltReady={rage >= 100}
          isFiring={isFiring}
          remainingEnemies={remainingEnemies}
        />

        {/* Center Game Arena Canvas */}
        <div className="w-full flex-1 flex items-center justify-center relative min-h-[460px] sm:min-h-[520px] my-2">
          <GameCanvas
            wave={wave}
            maxWave={MAX_WAVES}
            upgrades={upgrades}
            health={health}
            setHealth={setHealth}
            funds={funds}
            setFunds={setFunds}
            rage={rage}
            setRage={setRage}
            purifiedCount={purifiedCount}
            setPurifiedCount={setPurifiedCount}
            combo={combo}
            setCombo={setCombo}
            setMaxCombo={setMaxCombo}
            rules={rules}
            setRules={setRules}
            onWaveComplete={handleWaveComplete}
            onGameOver={handleGameOver}
            isFiring={isFiring}
            setIsFiring={setIsFiring}
            triggerUltSignal={triggerUltSignal}
            onStatsEvent={handleCanvasStatsEvent}
            gameState={gameState}
            setRemainingEnemies={setRemainingEnemies}
          />
        </div>

        {/* Bottom Quick Control Bar */}
        <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 px-3 py-2 bg-slate-900/60 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>操作指引：</span>
            </span>
            <span className="text-slate-300">
              按住滑鼠發射雷射 · 空白鍵全屏雞鳴 · [A] 查看榮耀成就
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span
              className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
              onClick={() => {
                setCodexDefaultTab('achievements');
                setIsCodexOpen(true);
              }}
            >
              <Trophy className="w-3 h-3 text-cyan-400" />
              <span>[A] 榮耀成就 ({unlockedAchievementsCount}/{achievements.length})</span>
            </span>
            <span
              className="hover:text-amber-300 transition-colors cursor-pointer"
              onClick={() => {
                setCodexDefaultTab('rules');
                setIsCodexOpen(true);
              }}
            >
              [C] 守則反思錄
            </span>
            <span className="hover:text-amber-300 transition-colors cursor-pointer" onClick={handleToggleMute}>
              [M] 靜音切換
            </span>
            <span className="text-slate-400 flex items-center gap-1 hidden md:flex">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              <span>金融科技請回歸正道 · 勸你善良</span>
            </span>
          </div>
        </div>
      </main>

      {/* Intro Modal */}
      <StoryIntroModal
        isOpen={gameState === 'TITLE'}
        onStartGame={handleStartGame}
      />

      {/* Upgrade Shop between waves */}
      <UpgradeShop
        isOpen={gameState === 'SHOP'}
        funds={funds}
        upgrades={upgrades}
        onUpgrade={handleUpgrade}
        onStartNextWave={handleStartNextWave}
        wave={wave + 1}
      />

      {/* Game Over / Victory Modal */}
      <GameOverModal
        isVictory={gameState === 'VICTORY'}
        isOpen={gameState === 'GAMEOVER' || gameState === 'VICTORY'}
        onRestart={handleRestart}
        onOpenCodex={() => {
          setCodexDefaultTab('rules');
          setIsCodexOpen(true);
        }}
        funds={funds}
        purifiedCount={purifiedCount}
        maxCombo={maxCombo}
        unlockedRulesCount={unlockedRulesCount}
        totalRulesCount={rules.length}
      />

      {/* Rules & Reflections Codex Modal (includes Achievements Section) */}
      <CodexModal
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
        rules={rules}
        achievements={achievements}
        onClaimReward={handleClaimReward}
        purifiedCount={purifiedCount}
        funds={funds}
        defaultTab={codexDefaultTab}
      />
    </div>
  );
}
