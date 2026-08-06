import { useState } from 'react';
import { Search, Lock } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { users } from '../data/users';
import type { EmployeeStatus } from '../data/users';
import { useRole } from '../hooks/useRole';

const departments = ['All', 'Civil Works', 'Electrical', 'Plumbing', 'Safety & Compliance', 'Site Administration'];

export default function People() {
  const { isAdmin } = useRole();
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');
  const [statuses, setStatuses] = useState<Record<string, EmployeeStatus>>(
    () => Object.fromEntries(users.map(u => [u.id, u.status]))
  );

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === 'All' || u.department === dept;
    return matchSearch && matchDept;
  });

  function toggleStatus(id: string) {
    setStatuses(prev => ({ ...prev, [id]: prev[id] === 'active' ? 'inactive' : 'active' }));
  }

  return (
    <div className="space-y-4">
      {!isAdmin && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs px-4 py-2.5 rounded-lg">
          <Lock size={13} /> Worker status changes require Admin access.
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search workers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <select
          value={dept}
          onChange={e => setDept(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">Worker</th>
              <th className="px-5 py-3 font-medium">Department</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">
                Status {!isAdmin && <Lock size={11} className="inline ml-1 text-gray-300" />}
              </th>
              <th className="px-5 py-3 font-medium">Join Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(emp => {
              const status = statuses[emp.id];
              return (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{emp.avatar}</div>
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-400">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{emp.department}</td>
                  <td className="px-5 py-3 text-gray-500">{emp.role}</td>
                  <td className="px-5 py-3">
                    {isAdmin ? (
                      <button
                        onClick={() => toggleStatus(emp.id)}
                        title="Click to toggle status"
                        className="group flex items-center gap-1.5"
                      >
                        <Badge
                          label={status === 'active' ? 'On Site' : 'Off Site'}
                          variant={status === 'active' ? 'green' : 'gray'}
                        />
                        <span className="text-[10px] text-gray-300 group-hover:text-indigo-400 transition-colors">toggle</span>
                      </button>
                    ) : (
                      <Badge
                        label={status === 'active' ? 'On Site' : 'Off Site'}
                        variant={status === 'active' ? 'green' : 'gray'}
                      />
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{emp.joinDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No workers found.</p>
        )}
      </Card>
    </div>
  );
}
