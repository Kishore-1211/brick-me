export type ProductivityStatus = 'pending' | 'approved' | 'correction';

export interface ProductivitySubmission {
  id: string;
  workerId: string;
  workerName: string;
  avatar: string;
  project: string;
  activity: string;
  target: string;
  quantityAchieved: string;
  completionPct: number;
  workDuration: string;
  photos: number;
  submittedAt: string;
  status: ProductivityStatus;
  points: number;
}

// Points are generated automatically: 10 pts per full task, scaled by completion %,
// rounded to the nearest 5. Correction requests earn 0 until re-approved.
export const productivitySubmissions: ProductivitySubmission[] = [
  { id: 'p1', workerId: 'u2', workerName: 'Ramesh Kumar', avatar: 'RK', project: 'Whitefield Villa', activity: 'Block Work', target: '120 Sq.ft', quantityAchieved: '120 Sq.ft', completionPct: 100, workDuration: '7h 40m', photos: 4, submittedAt: '2026-08-05 17:35', status: 'pending', points: 0 },
  { id: 'p2', workerId: 'u7', workerName: 'Vikram Sharma', avatar: 'VS', project: 'Riverside Warehouse', activity: 'Welding', target: '8 columns', quantityAchieved: '8 columns', completionPct: 100, workDuration: '9h 10m', photos: 6, submittedAt: '2026-08-05 18:05', status: 'approved', points: 10 },
  { id: 'p3', workerId: 'u4', workerName: 'Mahesh Yadav', avatar: 'MY', project: 'Green Meadows Block A', activity: 'Foundation', target: '6 units', quantityAchieved: '4 units', completionPct: 67, workDuration: '6h 20m', photos: 3, submittedAt: '2026-08-05 16:50', status: 'pending', points: 0 },
  { id: 'p4', workerId: 'u5', workerName: 'Ganesh Gupta', avatar: 'GG', project: 'Riverside Warehouse', activity: 'Waterproofing', target: '450 Sq.ft', quantityAchieved: '300 Sq.ft', completionPct: 67, workDuration: '5h 45m', photos: 2, submittedAt: '2026-08-05 15:30', status: 'correction', points: 0 },
  { id: 'p5', workerId: 'u9', workerName: 'Mohan Das', avatar: 'MD', project: 'Green Meadows Block A', activity: 'Welding', target: '12 trusses', quantityAchieved: '12 trusses', completionPct: 100, workDuration: '10h 15m', photos: 5, submittedAt: '2026-08-05 18:20', status: 'pending', points: 0 },
  { id: 'p6', workerId: 'u8', workerName: 'Santosh Verma', avatar: 'SV', project: 'Riverside Warehouse', activity: 'Foundation', target: '600 Sq.ft', quantityAchieved: '600 Sq.ft', completionPct: 100, workDuration: '10h 00m', photos: 4, submittedAt: '2026-08-05 17:00', status: 'approved', points: 10 },
];

// Automatic point rule surfaced in the UI.
export function pointsFor(completionPct: number): number {
  return Math.round((completionPct / 100) * 10 / 5) * 5;
}
