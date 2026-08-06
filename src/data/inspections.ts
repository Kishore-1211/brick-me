export type InspectionResult = 'passed' | 'correction' | 'failed';

export interface ChecklistItem {
  key: string;
  label: string;
}

// Brickwork quality checklist (from the Quality Inspection spec).
export const brickworkChecklist: ChecklistItem[] = [
  { key: 'line-level', label: 'Line & Level' },
  { key: 'plumb', label: 'Plumb' },
  { key: 'joint-thickness', label: 'Joint Thickness' },
  { key: 'mortar-quality', label: 'Mortar Quality' },
  { key: 'curing', label: 'Curing' },
];

export interface InspectionRecord {
  id: string;
  project: string;
  location: string;
  workerName: string;
  inspectedBy: string;
  date: string;
  result: InspectionResult;
  passedItems: number;
  totalItems: number;
}

export const inspections: InspectionRecord[] = [
  { id: 'q1', project: 'Whitefield Villa', location: 'East Wing — Wall 3', workerName: 'Ramesh Kumar', inspectedBy: 'Suresh Patel', date: '2026-08-05', result: 'passed', passedItems: 5, totalItems: 5 },
  { id: 'q2', project: 'Green Meadows Block A', location: 'Block B — Ground Floor', workerName: 'Mahesh Yadav', inspectedBy: 'Rajesh Nair', date: '2026-08-05', result: 'correction', passedItems: 3, totalItems: 5 },
  { id: 'q3', project: 'Skyline Tower', location: 'Floor 3 — Partition', workerName: 'Santosh Verma', inspectedBy: 'Suresh Patel', date: '2026-08-04', result: 'failed', passedItems: 1, totalItems: 5 },
  { id: 'q4', project: 'Riverside Warehouse', location: 'North Wall', workerName: 'Vikram Sharma', inspectedBy: 'Rajesh Nair', date: '2026-08-04', result: 'passed', passedItems: 5, totalItems: 5 },
];
