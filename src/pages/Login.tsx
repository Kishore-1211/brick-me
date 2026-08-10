import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Hammer, Ruler, Camera, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { users } from '../data/users';
import Button from '../components/ui/Button';
import Logo from '../components/ui/Logo';
import type { UserRole } from '../context/AuthContext';
import type { Lang } from '../i18n/translations';
import { languageNames } from '../i18n/translations';

const DEMO_OTP = '1234';
const langOrder: Lang[] = ['en', 'kn', 'ta', 'hi'];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t, lang, setLang } = useLang();

  const [role, setRole] = useState<UserRole | null>(null);
  const [password, setPassword] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(users[0].id);

  // Labour OTP flow
  const [labourStep, setLabourStep] = useState<'enter' | 'otp'>('enter');
  const [mobileOrId, setMobileOrId] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const activeWorkers = users.filter(u => u.status === 'active');

  const roles: { key: UserRole; label: string; subtitle: string; icon: typeof Building2; email: string }[] = [
    { key: 'admin', label: t('admin'), subtitle: t('companyDirector'), icon: Building2, email: 'admin@brickme.io' },
    { key: 'engineer', label: t('engineer'), subtitle: t('engineerSub'), icon: Ruler, email: 'engineer@brickme.io' },
    { key: 'labour', label: t('labour'), subtitle: t('viewYourRecords'), icon: Hammer, email: '' },
  ];
  const selectedRole = role ? roles.find(r => r.key === role)! : null;

  function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!role) return;
    if (role !== 'labour') {
      login(role, null);
      navigate(role === 'engineer' ? '/engineer-dashboard' : '/dashboard');
      return;
    }
    // labour
    if (labourStep === 'enter') {
      setOtpError('');
      setLabourStep('otp');
      return;
    }
    // otp step
    if (otp !== DEMO_OTP && otp.length !== 4) {
      setOtpError(t('enterOtp'));
      return;
    }
    const employee = users.find(u => u.id === selectedEmployeeId) ?? null;
    login('labour', employee, photo);
    navigate('/labour-home');
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-5">
          <Logo size={44} />
          <div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gray-900">Brick</span><span className="text-[#C0392B]">me</span>
            </span>
            <p className="text-xs text-gray-400 leading-none mt-0.5">{t('tagline')}</p>
          </div>
        </div>

        {/* Language selector — always available */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('language')}</label>
          <div className="grid grid-cols-4 gap-1.5">
            {langOrder.map(l => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  lang === l
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {languageNames[l]}
              </button>
            ))}
          </div>
        </div>

        {!role && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{t('signIn')}</h2>
            <p className="text-sm text-gray-500 mb-6">{t('selectRoleToContinue')}</p>
          </>
        )}

        {/* Role selector: all cards until one is picked, then only the chosen one, centered */}
        <div className={role ? 'flex justify-center mb-6' : 'grid grid-cols-3 gap-2 mb-6'}>
          {(role ? roles.filter(r => r.key === role) : roles).map(({ key, label, subtitle, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => { setRole(key); setLabourStep('enter'); }}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                role === key ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300 bg-white'
              } ${role ? 'w-44' : ''}`}
            >
              <Icon size={22} className={role === key ? 'text-indigo-600' : 'text-gray-400'} />
              <span className={`text-sm font-semibold leading-tight text-center ${role === key ? 'text-indigo-700' : 'text-gray-600'}`}>{label}</span>
              <span className="text-[10px] text-gray-400 text-center leading-tight">{subtitle}</span>
            </button>
          ))}
        </div>

        {role && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <button type="button" onClick={() => { setRole(null); setLabourStep('enter'); }}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            <ArrowLeft size={13} /> {t('selectRoleToContinue')}
          </button>
          {role !== 'labour' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                <input type="email" defaultValue={selectedRole?.email} key={role} required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('password')}</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-sm text-indigo-600 hover:underline">{t('forgotPassword')}</button>
              </div>
            </>
          )}

          {role === 'labour' && labourStep === 'enter' && (
            <>
              {/* Profile photo */}
              <div className="flex flex-col items-center gap-2">
                <label className="cursor-pointer">
                  {photo ? (
                    <img src={photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                      <Camera size={22} />
                    </div>
                  )}
                  <input type="file" accept="image/*" capture="user" onChange={handlePhoto} className="hidden" />
                </label>
                <span className="text-xs text-gray-400">{photo ? t('changePhoto') : t('addPhoto')}</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('selectYourName')}</label>
                <select value={selectedEmployeeId} onChange={e => setSelectedEmployeeId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  {activeWorkers.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} — {emp.role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('mobileOrEmployeeId')}</label>
                <input type="text" value={mobileOrId} onChange={e => setMobileOrId(e.target.value)}
                  placeholder={t('enterMobileOrId')} required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
            </>
          )}

          {role === 'labour' && labourStep === 'otp' && (
            <>
              <button type="button" onClick={() => setLabourStep('enter')}
                className="flex items-center gap-1 text-sm text-indigo-600 hover:underline">
                <ArrowLeft size={14} /> {t('changeNumber')}
              </button>
              <div className="bg-indigo-50 rounded-lg px-3 py-2 text-xs text-indigo-700">
                {t('otpSentTo')} <span className="font-semibold">{mobileOrId || '••••••'}</span>
                <br />
                {t('demoOtpIs')}: <span className="font-mono font-bold">{DEMO_OTP}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('otpVerification')}</label>
                <input type="text" inputMode="numeric" maxLength={4} value={otp}
                  onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setOtpError(''); }}
                  placeholder={t('enterOtp')} required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm tracking-[0.5em] text-center font-mono outline-none focus:ring-2 focus:ring-indigo-500" />
                {otpError && <p className="text-xs text-red-500 mt-1">{otpError}</p>}
              </div>
              <button type="button" onClick={() => setOtp(DEMO_OTP)} className="text-xs text-indigo-600 hover:underline">
                {t('resendOtp')}
              </button>
            </>
          )}

          <Button type="submit" className="w-full justify-center">
            {role === 'labour'
              ? (labourStep === 'enter' ? t('sendOtp') : t('verifyAndSignIn'))
              : t('signInAs', { role: selectedRole?.label ?? '' })}
          </Button>
        </form>
        )}
      </div>
    </div>
  );
}
