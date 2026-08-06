import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Building2, HardHat, Hammer } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { users } from '../data/users';
import Button from '../components/ui/Button';
import type { UserRole } from '../context/AuthContext';

const roles: { key: UserRole; label: string; subtitle: string; icon: typeof Building2; email: string }[] = [
  { key: 'admin', label: 'Admin', subtitle: 'Company Director', icon: Building2, email: 'admin@brickme.io' },
  { key: 'manager', label: 'Site Manager', subtitle: 'Full site access', icon: HardHat, email: 'manager@brickme.io' },
  { key: 'labour', label: 'Labour', subtitle: 'View your records', icon: Hammer, email: '' },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState<UserRole>('admin');
  const [password, setPassword] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(users[0].id);

  const activeWorkers = users.filter(u => u.status === 'active');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (role === 'labour') {
      const employee = users.find(u => u.id === selectedEmployeeId) ?? null;
      login('labour', employee);
      navigate('/check-in');
    } else {
      login(role, null);
      navigate('/dashboard');
    }
  }

  const selectedRole = roles.find(r => r.key === role)!;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Layers size={22} className="text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Brickme</span>
            <p className="text-xs text-gray-400 leading-none mt-0.5">Construction Site Management</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h2>
        <p className="text-sm text-gray-500 mb-6">Select your role to continue</p>

        {/* Role selector — 3 cards */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {roles.map(({ key, label, subtitle, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setRole(key)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                role === key
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <Icon size={22} className={role === key ? 'text-indigo-600' : 'text-gray-400'} />
              <span className={`text-xs font-semibold leading-tight text-center ${role === key ? 'text-indigo-700' : 'text-gray-600'}`}>{label}</span>
              <span className="text-[10px] text-gray-400 text-center leading-tight">{subtitle}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {role !== 'labour' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={selectedRole.email}
                  key={role}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Your Name</label>
                <select
                  value={selectedEmployeeId}
                  onChange={e => setSelectedEmployeeId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {activeWorkers.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} — {emp.role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID / PIN</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your employee ID"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button type="button" className="text-sm text-indigo-600 hover:underline">Forgot password?</button>
          </div>

          <Button type="submit" className="w-full justify-center">
            Sign In as {selectedRole.label}
          </Button>
        </form>
      </div>
    </div>
  );
}
