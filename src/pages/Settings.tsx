import { useState } from 'react';
import { Lock, Languages } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useRole } from '../hooks/useRole';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { languageNames, languageEnglishNames } from '../i18n/translations';
import type { Lang } from '../i18n/translations';

const profileDefaults = {
  admin: { name: 'Rajesh Kumar', email: 'admin@brickme.io', role: 'Admin / Director', phone: '+91 98765 00001' },
  manager: { name: 'Suresh Patel', email: 'manager@brickme.io', role: 'Site Manager', phone: '+91 87654 11002' },
  engineer: { name: 'Arjun Mehta', email: 'engineer@brickme.io', role: 'Site Engineer', phone: '+91 90000 33003' },
};

const langOrder: Lang[] = ['en', 'kn', 'ta', 'hi'];

export default function Settings() {
  const { isAdmin, role } = useRole();
  const { auth } = useAuth();
  const { t, lang, setLang } = useLang();

  const defaults = role === 'labour'
    ? { name: auth.employee?.name ?? 'Worker', email: auth.employee?.email ?? '', role: auth.employee?.role ?? t('labour'), phone: auth.employee?.phone ?? '' }
    : profileDefaults[role as 'admin' | 'manager' | 'engineer'];

  const [name, setName] = useState(defaults.name);
  const [email, setEmail] = useState(defaults.email);
  const [designation, setDesignation] = useState(defaults.role);
  const [phone, setPhone] = useState(defaults.phone);
  const [site, setSite] = useState('Brickme Construction Site — Mumbai');
  const [notifications, setNotifications] = useState({ email: true, tasks: true, payroll: false });
  const [saved, setSaved] = useState(false);

  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  const isLabour = role === 'labour';

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
          {t('settingsSaved')}
        </div>
      )}

      {/* Language Preference — available to everyone */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <Languages size={18} className="text-indigo-600" />
          <h3 className="text-base font-semibold text-gray-800">{t('languagePreference')}</h3>
        </div>
        <p className="text-xs text-gray-400 mb-4">{t('languagePreferenceDesc')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {langOrder.map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`py-2 rounded-lg text-sm font-semibold border transition-all ${
                lang === l ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <span className="block">{languageNames[l]}</span>
              <span className="block text-[10px] font-normal text-gray-400">{languageEnglishNames[l]}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Profile Card */}
      <Card className="p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">{t('myProfile')}</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold">{initials}</div>
          <div>
            <p className="font-semibold text-gray-800">{name}</p>
            <p className="text-sm text-indigo-600 font-medium">{designation}</p>
            <p className="text-xs text-gray-400">{email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')}</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')}</label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              disabled={!isAdmin}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${!isAdmin ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}`} />
            {!isAdmin && <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1"><Lock size={10} /> {t('adminOnly')}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('designation')}</label>
            <input type="text" value={designation} onChange={e => setDesignation(e.target.value)}
              disabled={!isAdmin}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${!isAdmin ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}`} />
            {!isAdmin && <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1"><Lock size={10} /> {t('adminOnly')}</p>}
          </div>
        </div>
      </Card>

      {/* Site Config — hidden for labour */}
      {!isLabour && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-800">{t('siteConfiguration')}</h3>
            {!isAdmin && (
              <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Lock size={11} /> {t('adminOnly')}
              </span>
            )}
          </div>

          {isAdmin ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('constructionSiteName')}</label>
              <input type="text" value={site} onChange={e => setSite(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
              <Lock size={16} className="text-gray-300 flex-shrink-0" />
              <p className="text-sm text-gray-500 font-medium">{site}</p>
            </div>
          )}
        </Card>
      )}

      {/* Preferences */}
      <Card className="p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">{t('preferences')}</h3>
        <div className="space-y-4">
          {([
            { key: 'email', label: t('emailNotifications') },
            { key: 'tasks', label: t('taskReminders') },
            { key: 'payroll', label: t('payrollAlerts') },
          ] as const).map(({ key, label }) => {
            const locked = key === 'payroll' && !isAdmin;
            return (
              <div key={key} className={`flex items-center justify-between py-2 ${locked ? 'opacity-40' : ''}`}>
                <p className="text-sm font-medium text-gray-800 flex items-center gap-1.5">
                  {label} {locked && <Lock size={11} className="text-gray-400" />}
                </p>
                <button
                  disabled={locked}
                  onClick={() => !locked && setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                  className={`relative w-10 h-5 rounded-full transition-colors ${notifications[key] && !locked ? 'bg-indigo-600' : 'bg-gray-200'} ${locked ? 'cursor-not-allowed' : ''}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[key] && !locked ? 'translate-x-5' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </Card>

      <Button onClick={handleSave}>{t('saveSettings')}</Button>
    </div>
  );
}
