// Multi-site overview for the Owner/Admin management dashboard.

export interface SiteStat {
  id: string;
  name: string;
  labour: number;
  productivity: number;
  quality: number;
}

export const sites: SiteStat[] = [
  { id: 's1', name: 'Whitefield Villa', labour: 6, productivity: 88, quality: 94 },
  { id: 's2', name: 'Green Meadows Block A', labour: 8, productivity: 82, quality: 90 },
  { id: 's3', name: 'Skyline Tower', labour: 5, productivity: 79, quality: 88 },
  { id: 's4', name: 'Riverside Warehouse', labour: 4, productivity: 84, quality: 91 },
];
