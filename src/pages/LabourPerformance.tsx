import { Trophy } from 'lucide-react';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { getPerformance, totalScore, maxScores, maxTotal } from '../data/labour';
import type { TranslationKey } from '../i18n/translations';

export default function LabourPerformance() {
  const { auth } = useAuth();
  const { t } = useLang();
  const perf = getPerformance(auth.employee?.id);
  const total = totalScore(perf);

  const rows: { key: TranslationKey; value: number; max: number; color: string }[] = [
    { key: 'attendanceScore', value: perf.attendance, max: maxScores.attendance, color: 'bg-green-500' },
    { key: 'productivityScore', value: perf.productivity, max: maxScores.productivity, color: 'bg-indigo-500' },
    { key: 'qualityScore', value: perf.quality, max: maxScores.quality, color: 'bg-blue-500' },
    { key: 'safetyScore', value: perf.safety, max: maxScores.safety, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-4 max-w-2xl">
      {/* Total + rank */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{t('weeklyScore')}</p>
            <p className="text-4xl font-bold stat-number">{total}<span className="text-lg text-gray-400">/{maxTotal}</span></p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mb-1">
              <Trophy size={26} className="text-amber-500" />
            </div>
            <p className="text-xs text-gray-400">{t('rank')}</p>
            <p className="text-lg font-bold stat-number">#{perf.rank}</p>
          </div>
        </div>
        <p className="text-sm text-green-600 font-medium mt-4">{t('keepItUp')}</p>
      </Card>

      {/* Breakdown */}
      <Card className="p-6 space-y-5">
        <h3 className="text-sm font-semibold text-gray-700">{t('weeklyScore')}</h3>
        {rows.map(row => (
          <div key={row.key}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-gray-600">{t(row.key)}</span>
              <span className="font-semibold text-gray-800">{row.value}<span className="text-gray-400 font-normal">/{row.max}</span></span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div className={`h-full rounded-full ${row.color}`} style={{ width: `${(row.value / row.max) * 100}%` }} />
            </div>
          </div>
        ))}
        <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">{t('total')}</span>
          <span className="text-lg font-bold text-gray-900">{total}<span className="text-sm text-gray-400 font-normal">/{maxTotal}</span></span>
        </div>
      </Card>
    </div>
  );
}
