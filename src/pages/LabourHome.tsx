import { Link } from 'react-router-dom';
import { Clock, Briefcase, Star, Trophy, ScanFace, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { attendance } from '../data/attendance';
import { getAssignedWork, getPerformance, totalScore, maxTotal } from '../data/labour';

export default function LabourHome() {
  const { auth } = useAuth();
  const { t } = useLang();
  const worker = auth.employee;

  // Latest attendance record for this worker
  const myRecords = attendance
    .filter(r => r.employeeId === worker?.id)
    .sort((a, b) => b.date.localeCompare(a.date));
  const today = myRecords[0];
  const checkedIn = today && today.checkIn !== '--';

  const work = getAssignedWork(worker?.id);
  const todayTask = work.find(w => w.status !== 'completed') ?? work[0];

  const perf = getPerformance(worker?.id);
  const score = totalScore(perf);
  const stars = Math.round((score / maxTotal) * 5);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? t('goodMorning') : hour < 17 ? t('goodAfternoon') : t('goodEvening');

  return (
    <div className="space-y-4 max-w-2xl">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {greeting} {worker?.name?.split(' ')[0] ?? ''} 👷
        </h2>
        <p className="text-sm text-gray-500">{worker?.role}</p>
      </div>

      {/* Today's Status */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">{t('todayStatus')}</h3>
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
            checkedIn ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}>
            <span className={`w-2 h-2 rounded-full ${checkedIn ? 'bg-green-500' : 'bg-gray-400'}`} />
            {checkedIn ? t('present') : t('notCheckedIn')}
          </span>
        </div>

        {checkedIn ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1"><Clock size={13} /> {t('loginTimeLabel')}</div>
              <p className="text-lg font-bold text-gray-800">{today.checkIn} AM</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1"><Clock size={13} /> {t('workingHoursLabel')}</div>
              <p className="text-lg font-bold text-gray-800">{today.workingHours.toFixed(1)} {t('hrs')}</p>
            </div>
          </div>
        ) : (
          <Link to="/check-in" className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
            <ScanFace size={16} /> {t('checkInNow')}
          </Link>
        )}
      </Card>

      {/* Today's Task */}
      <Link to="/my-work">
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <Briefcase size={18} className="text-indigo-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400">{t('todayTask')}</p>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {todayTask ? `${todayTask.activity} — ${todayTask.target}` : t('noTaskToday')}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
          </div>
        </Card>
      </Link>

      {/* Score + Rank */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/my-performance">
          <Card className="p-5 hover:shadow-md transition-shadow h-full">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1"><Star size={13} /> {t('myScore')}</div>
            <p className="text-2xl font-bold stat-number">{score}<span className="text-sm text-gray-400">/{maxTotal}</span></p>
            <p className="text-amber-400 text-sm mt-1">{'⭐'.repeat(stars)}</p>
          </Card>
        </Link>
        <Link to="/rewards">
          <Card className="p-5 hover:shadow-md transition-shadow h-full">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1"><Trophy size={13} /> {t('weeklyRank')}</div>
            <p className="text-2xl font-bold stat-number">#{perf.rank}</p>
            <p className="text-xs text-indigo-600 mt-1">{t('rewards')} →</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
