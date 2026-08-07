// Labour-module mock data: assigned work, weekly performance, rewards.

export type WorkStatus = 'pending' | 'in-progress' | 'completed';

export interface AssignedWork {
  id: string;
  activity: string;
  target: string;
  status: WorkStatus;
}

export interface WeeklyPerformance {
  attendance: number;
  productivity: number;
  quality: number;
  safety: number;
  rank: number;
}

export const maxScores = { attendance: 25, productivity: 35, quality: 25, safety: 15 };
export const maxTotal = maxScores.attendance + maxScores.productivity + maxScores.quality + maxScores.safety; // 100

// Per-worker assigned work
export const assignedWork: Record<string, AssignedWork[]> = {
  u2: [
    { id: 'w1', activity: 'Brickwork', target: '100 sqft', status: 'pending' },
    { id: 'w2', activity: 'Material Shifting', target: '10 loads', status: 'completed' },
  ],
  u1: [
    { id: 'w3', activity: 'Formwork', target: '4 columns', status: 'in-progress' },
    { id: 'w4', activity: 'Site Supervision', target: 'Full day', status: 'pending' },
  ],
  u4: [
    { id: 'w5', activity: 'Plumbing', target: '6 units', status: 'in-progress' },
  ],
  u7: [
    { id: 'w6', activity: 'Welding', target: '8 columns', status: 'completed' },
    { id: 'w7', activity: 'Grinding', target: '20 joints', status: 'pending' },
  ],
  u8: [
    { id: 'w8', activity: 'Material Shifting', target: '15 loads', status: 'pending' },
    { id: 'w9', activity: 'Site Cleaning', target: 'Zone 2', status: 'completed' },
  ],
};

const defaultWork: AssignedWork[] = [
  { id: 'wd1', activity: 'Brickwork', target: '100 sqft', status: 'pending' },
  { id: 'wd2', activity: 'Material Shifting', target: '10 loads', status: 'completed' },
];

export function getAssignedWork(workerId?: string): AssignedWork[] {
  return (workerId && assignedWork[workerId]) || defaultWork;
}

// Per-worker weekly performance
export const workerPerformance: Record<string, WeeklyPerformance> = {
  u1: { attendance: 25, productivity: 30, quality: 22, safety: 13, rank: 3 },
  u2: { attendance: 25, productivity: 32, quality: 23, safety: 12, rank: 2 },
  u4: { attendance: 22, productivity: 28, quality: 20, safety: 11, rank: 6 },
  u6: { attendance: 25, productivity: 33, quality: 24, safety: 15, rank: 1 },
  u7: { attendance: 23, productivity: 30, quality: 21, safety: 12, rank: 5 },
  u8: { attendance: 24, productivity: 29, quality: 22, safety: 13, rank: 4 },
  u9: { attendance: 25, productivity: 31, quality: 23, safety: 14, rank: 2 },
};

const defaultPerformance: WeeklyPerformance = { attendance: 25, productivity: 32, quality: 23, safety: 12, rank: 2 };

export function getPerformance(workerId?: string): WeeklyPerformance {
  return (workerId && workerPerformance[workerId]) || defaultPerformance;
}

export function totalScore(p: WeeklyPerformance): number {
  return p.attendance + p.productivity + p.quality + p.safety;
}

// Weekly reward winners (workerId references src/data/users.ts)
export interface RewardWinner {
  titleKey: 'bestMason' | 'bestHelper' | 'qualityChampion';
  workerId: string;
  emoji: string;
}

export const weeklyWinners: RewardWinner[] = [
  { titleKey: 'bestMason', workerId: 'u2', emoji: '🧱' },
  { titleKey: 'bestHelper', workerId: 'u8', emoji: '🛠️' },
  { titleKey: 'qualityChampion', workerId: 'u6', emoji: '⭐' },
];

// Per-worker reward history
export interface RewardHistoryItem {
  id: string;
  labelKey: 'bestMason' | 'bestHelper' | 'qualityChampion';
  date: string;
  bonus: number;
}

export const rewardHistory: Record<string, RewardHistoryItem[]> = {
  u2: [
    { id: 'r1', labelKey: 'bestMason', date: '2026-08-01', bonus: 2000 },
    { id: 'r2', labelKey: 'bestMason', date: '2026-07-25', bonus: 1500 },
  ],
  u8: [
    { id: 'r3', labelKey: 'bestHelper', date: '2026-08-01', bonus: 1000 },
  ],
  u6: [
    { id: 'r4', labelKey: 'qualityChampion', date: '2026-08-01', bonus: 2500 },
    { id: 'r5', labelKey: 'qualityChampion', date: '2026-07-18', bonus: 2000 },
  ],
};

export function getRewardHistory(workerId?: string): RewardHistoryItem[] {
  return (workerId && rewardHistory[workerId]) || [];
}
