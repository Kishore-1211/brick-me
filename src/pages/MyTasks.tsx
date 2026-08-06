import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { tasks } from '../data/tasks';
import type { TaskStatus, TaskPriority } from '../data/tasks';


const priorityVariant: Record<TaskPriority, 'red' | 'yellow' | 'green'> = {
  high: 'red',
  medium: 'yellow',
  low: 'green',
};

const columns: { key: TaskStatus; label: string; color: string }[] = [
  { key: 'todo', label: 'To Do', color: 'border-t-gray-300' },
  { key: 'in-progress', label: 'In Progress', color: 'border-t-indigo-500' },
  { key: 'done', label: 'Done', color: 'border-t-green-500' },
];

export default function MyTasks() {
  const { auth } = useAuth();
  const myTasks = tasks.filter(t => t.assigneeId === auth.employee?.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-medium text-gray-700">{myTasks.length}</span> tasks assigned to you
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(col => {
          const colTasks = myTasks.filter(t => t.status === col.key);
          return (
            <div key={col.key} className={`bg-white rounded-xl border-t-4 ${col.color} shadow-sm border border-gray-100 p-4`}>
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
