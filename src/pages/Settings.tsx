import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Settings() {
  const [name, setName] = useState('Rajesh Kumar');
  const [email, setEmail] = useState('rajesh@brickme.io');
  const [role, setRole] = useState('Site Manager');
  const [phone, setPhone] = useState('+91 98765 00001');
  const [site, setSite] = useState('Brickme Construction Site — Mumbai');
  const [notifications, setNotifications] = useState({ email: true, tasks: true, payroll: false });
  const [saved, setSaved] = useState(false);

  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
          Settings saved successfully.
        </div>
      )}

      <Card className="p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Admin Profile</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold">{initials}</div>
            <div>
              <p className="font-semibold text-gray-800">{name}</p>
              <p className="text-sm text-indigo-600 font-medium">{role}</p>
              <p className="text-xs text-gray-400">{site}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role / Designation</label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Construction Site</label>
            <input
              type="text"
              value={site}
              onChange={e => setSite(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Preferences</h3>
        <div className="space-y-4">
          {([
            { key: 'email', label: 'Email notifications', desc: 'Receive updates via email' },
            { key: 'tasks', label: 'Task reminders', desc: 'Get notified about upcoming deadlines' },
            { key: 'payroll', label: 'Payroll alerts', desc: 'Alerts when payroll is due' },
          ] as const).map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                className={`relative w-10 h-5 rounded-full transition-colors ${notifications[key] ? 'bg-indigo-600' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[key] ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Button onClick={handleSave}>Save Settings</Button>
    </div>
  );
}
