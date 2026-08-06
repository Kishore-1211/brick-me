import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { tasks as seedTasks, projects, activities } from '../data/tasks';
import type { Task, TaskStatus, TaskPriority } from '../data/tasks';
import { users } from '../data/users';

const columns: { key: TaskStatus; label: string }[] = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
];

const priorityVariant: Record<TaskPriority, 'red' | 'yellow' | 'green'> = {
  high: 'red',
  medium: 'yellow',
  low: 'green',
};

const columnColors: Record<TaskStatus, string> = {
  'todo': 'border-t-gray-300',
  'in-progress': 'border-t-indigo-500',
  'done': 'border-t-green-500',
};

const emptyForm = {
  project: projects[0],
  assigneeId: users[0].id,
  activity: activities[0],
  target: '',
  dueDate: '',
  priority: 'medium' as TaskPriority,
};

export default function Tasks() {
  const [taskList, setTaskList] = useState<Task[]>(seedTasks);
  const [priorityFilter, setPriorityFilter] = useState<'all' | TaskPriority>('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = taskList.filter(t => priorityFilter === 'all' || t.priority === priorityFilter);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const worker = users.find(u => u.id === form.assigneeId)!;
    const newTask: Task = {
      id: `t${Date.now()}`,
      title: `${form.activity} — ${form.project}`,
      description: `${form.activity} allocated to ${worker.name}. Target: ${form.target || 'N/A'}.`,
      assigneeId: worker.id,
      assigneeName: worker.name,
      dueDate: form.dueDate || 'TBD',
      priority: form.priority,
      status: 'todo',
      project: form.project,
      activity: form.activity,
      target: form.target || 'N/A',
    };
    setTaskList(prev => [newTask, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-500">Filter by priority:</span>
        {(['all', 'high', 'medium', 'low'] as const).map(p => (
          <button
            key={p}
            onClick={() => setPriorityFilter(p)}
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
              priorityFilter === p
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {p}
          </button>
        ))}
        <Button size="sm" className="ml-auto" onClick={() => setShowForm(s => !s)}>
          {showForm ? <X size={15} /> : <Plus size={15} />}
          {showForm ? 'Close' : 'Allocate Work'}
        </Button>
      </div>

      {/* Work Allocation — Create task */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">Create Task</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="text-xs font-medium text-gray-500 space-y-1 block">
              Project
              <select
                value={form.project}
                onChange={e => setForm({ ...form, project: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {projects.map(p => <option key={p}>{p}</option>)}
              </select>
            </label>

            <label className="text-xs font-medium text-gray-500 space-y-1 block">
              Worker
              <select
                value={form.assigneeId}
                onChange={e => setForm({ ...form, assigneeId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {users.map(u => <option key={u.id} value={u.id}>{u.name} — {u.role}</option>)}
              </select>
            </label>

            <label className="text-xs font-medium text-gray-500 space-y-1 block">
              Activity
              <select
                value={form.activity}
                onChange={e => setForm({ ...form, activity: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {activities.map(a => <option key={a}>{a}</option>)}
              </select>
            </label>

            <label className="text-xs font-medium text-gray-500 space-y-1 block">
              Target
              <input
                type="text"
                value={form.target}
                onChange={e => setForm({ ...form, target: e.target.value })}
                placeholder="e.g. 120 Sq.ft"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </label>

            <label className="text-xs font-medium text-gray-500 space-y-1 block">
              Deadline
              <input
                type="date"
                value={form.dueDate}
                onChange={e => setForm({ ...form, dueDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </label>

            <label className="text-xs font-medium text-gray-500 space-y-1 block">
              Priority
              <select
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value as TaskPriority })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white capitalize"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm">Create Task</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(col => {
          const colTasks = filtered.filter(t => t.status === col.key);
          return (
            <div key={col.key} className={`bg-white rounded-xl border-t-4 ${columnColors[col.key]} shadow-sm border border-gray-100 p-4`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">{col.label}</h3>
                <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center font-medium">{colTasks.length}</span>
              </div>
              <div className="space-y-3">
                {colTasks.map(task => (
                  <div key={task.id} className="bg-gray-50 rounded-lg p-3 space-y-2 border border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{task.title}</p>
                    <p className="text-xs text-gray-400">{task.description}</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[10px] font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">{task.project}</span>
                      <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{task.activity}</span>
                      <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">🎯 {task.target}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge label={task.priority} variant={priorityVariant[task.priority]} />
                      <span className="text-xs text-gray-400">{task.dueDate}</span>
                    </div>
                    <p className="text-xs text-gray-500">👤 {task.assigneeName}</p>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <p className="text-xs text-gray-300 text-center py-4">No tasks</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
