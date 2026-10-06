export interface Enemy {
  id: string;
  x: number;
  y: number;
  type: 'crypto_gambler' | 'pyramid_senior' | 'ppt_vaporware' | 'leek_officer' | 'boss_president';
  name: string;
  avatarIcon: string;
  quote: string;
  repentQuote: string;
  ruleIdUnlock: number;
  maxGreed: number;
  currentGreed: number;
  speed: number;
  radius: number;
  isPurified: boolean;
  purifiedTimer: number;
  angle: number;
  color: string;
  points: number;
  fundDrop: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  shape?: 'circle' | 'spark' | 'star' | 'coin';
}

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
  fontSize?: number;
}

export interface ClubRule {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  satiricalNote: string;
  reformedBy: string;
  unlocked: boolean;
}

export interface UpgradeState {
  laserPower: number; // damage per tick
  laserWidth: number; // beam thickness
  rageGeneration: number; // ult build rate
  reverenceAura: number; // passive slowdown / knockback aura
  fundMultiplier: number;
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  flavorQuote: string;
  icon: string;
  rewardFunds: number;
  unlocked: boolean;
  claimed: boolean;
  currentProgress: number;
  maxProgress: number;
  progressFormat?: string;
}

export interface GameStats {
  laserFiredTicks: number;
  laserHitTicks: number;
  maxCombo: number;
  totalFundsEarned: number;
  purifiedCount: number;
  ultUsedCount: number;
  bossPurified: boolean;
  fullHealthWaveCleared: boolean;
  pacifistTimeSec: number;
}

export type GameStateMode = 'TITLE' | 'PLAYING' | 'SHOP' | 'PAUSED' | 'VICTORY' | 'GAMEOVER';
