export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assigneeName: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export const tasks: Task[] = [
  { id: 't1', title: 'Lay foundation — Block B', description: 'Concrete pouring and levelling for Block B foundation', assigneeId: 'u2', assigneeName: 'Ramesh Kumar', dueDate: '2026-08-10', priority: 'high', status: 'in-progress' },
  { id: 't2', title: 'Install electrical wiring — Floor 3', description: 'Run conduit and pull cables for Floor 3 lighting and outlets', assigneeId: 'u3', assigneeName: 'Dinesh Singh', dueDate: '2026-08-15', priority: 'high', status: 'todo' },
  { id: 't3', title: 'Safety inspection — scaffolding', description: 'Inspect all scaffolding joints and load ratings on east side', assigneeId: 'u6', assigneeName: 'Rajesh Nair', dueDate: '2026-08-07', priority: 'high', status: 'done' },
  { id: 't4', title: 'Plumbing — restrooms Block A', description: 'Install soil pipes and fix sanitary fittings in Block A restrooms', assigneeId: 'u4', assigneeName: 'Mahesh Yadav', dueDate: '2026-08-18', priority: 'medium', status: 'in-progress' },
  { id: 't5', title: 'Erect scaffolding — Floor 5', description: 'Set up scaffolding on the west facade for plastering work', assigneeId: 'u1', assigneeName: 'Suresh Patel', dueDate: '2026-08-12', priority: 'high', status: 'todo' },
  { id: 't6', title: 'Brick masonry — East Wing', description: 'Complete brick laying for all external walls of the East Wing', assigneeId: 'u2', assigneeName: 'Ramesh Kumar', dueDate: '2026-08-20', priority: 'high', status: 'in-progress' },
  { id: 't7', title: 'Install roof trusses — Block C', description: 'Lift and bolt pre-fabricated steel roof trusses on Block C', assigneeId: 'u9', assigneeName: 'Mohan Das', dueDate: '2026-08-22', priority: 'high', status: 'todo' },
  { id: 't8', title: 'Waterproofing — basement', description: 'Apply bitumen membrane waterproofing to all basement walls', assigneeId: 'u5', assigneeName: 'Ganesh Gupta', dueDate: '2026-08-25', priority: 'medium', status: 'todo' },
  { id: 't9', title: 'Weld steel columns — Zone 3', description: 'Weld reinforcement joints on structural steel columns in Zone 3', assigneeId: 'u7', assigneeName: 'Vikram Sharma', dueDate: '2026-08-09', priority: 'high', status: 'done' },
  { id: 't10', title: 'Grade and compact soil — Zone 2', description: 'Flatten and compact sub-grade soil before slab casting', assigneeId: 'u8', assigneeName: 'Santosh Verma', dueDate: '2026-08-08', priority: 'medium', status: 'done' },
  { id: 't11', title: 'Install fire safety equipment', description: 'Mount extinguishers, hose reels and alarm panels per floor', assigneeId: 'u6', assigneeName: 'Rajesh Nair', dueDate: '2026-09-01', priority: 'medium', status: 'todo' },
  { id: 't12', title: 'Paint exterior walls — North Block', description: 'Apply two coats weatherproof paint on all North Block exteriors', assigneeId: 'u5', assigneeName: 'Ganesh Gupta', dueDate: '2026-09-10', priority: 'low', status: 'todo' },
  { id: 't13', title: 'Fit formwork — Column C-4', description: 'Set up and oil formwork shutters for Column C-4 pour', assigneeId: 'u1', assigneeName: 'Suresh Patel', dueDate: '2026-08-06', priority: 'high', status: 'done' },
  { id: 't14', title: 'Material inventory update', description: 'Count and log cement, steel, and aggregate stock in store', assigneeId: 'u10', assigneeName: 'Anil Tiwari', dueDate: '2026-08-10', priority: 'medium', status: 'in-progress' },
  { id: 't15', title: 'Clean and clear debris — Site B', description: 'Remove construction debris from Site B access road', assigneeId: 'u8', assigneeName: 'Santosh Verma', dueDate: '2026-08-09', priority: 'low', status: 'done' },
];
