import { useState } from 'react';
import Badge from '../components/ui/Badge';
import { tasks } from '../data/tasks';
import type { TaskStatus, TaskPriority } from '../data/tasks';

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

export default function Tasks() {
  const [priorityFilter, setPriorityFilter] = useState<'all' | TaskPriority>('all');

  const filtered = tasks.filter(t => priorityFilter === 'all' || t.priority === priorityFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
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
      </div>

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
