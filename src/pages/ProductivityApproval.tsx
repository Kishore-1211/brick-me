import { useState } from 'react';
import { Camera, Check, RefreshCw, Clock, Target, Award } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useLang } from '../context/LanguageContext';
import { productivitySubmissions, pointsFor } from '../data/productivity';
import type { ProductivityStatus } from '../data/productivity';
import type { TranslationKey } from '../i18n/translations';

const statusConfig: Record<ProductivityStatus, { key: TranslationKey; variant: 'green' | 'yellow' | 'blue' }> = {
  approved: { key: 'approved', variant: 'green' },
  correction: { key: 'correctionRequested', variant: 'yellow' },
  pending: { key: 'pendingReview', variant: 'blue' },
};

export default function ProductivityApproval() {
  const { t } = useLang();
  const [subs, setSubs] = useState(productivitySubmissions);

  function approve(id: string) {
    setSubs(prev => prev.map(s =>
      s.id === id ? { ...s, status: 'approved', points: pointsFor(s.completionPct) } : s
    ));
  }

  function requestCorrection(id: string) {
    setSubs(prev => prev.map(s =>
      s.id === id ? { ...s, status: 'correction', points: 0 } : s
    ));
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">{t('productivityIntro')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {subs.map(sub => {
          const cfg = statusConfig[sub.status];
          return (
            <Card key={sub.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {sub.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{sub.workerName}</p>
                      <p className="text-xs text-gray-400 truncate">{sub.project} · {sub.activity}</p>
                    </div>
                    <Badge label={t(cfg.key)} variant={cfg.variant} />
                  </div>

                  {/* Engineer checks */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Camera size={13} className="text-gray-400" />
                      {t('photos')}: <span className="font-medium text-gray-800">{sub.photos}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Clock size={13} className="text-gray-400" />
                      {t('duration')}: <span className="font-medium text-gray-800">{sub.workDuration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Target size={13} className="text-gray-400" />
                      {t('target')}: <span className="font-medium text-gray-800">{sub.target}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Check size={13} className="text-gray-400" />
                      {t('achieved')}: <span className="font-medium text-gray-800">{sub.quantityAchieved}</span>
                    </div>
                  </div>

                  {/* Completion bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                      <span>{t('quantityAchieved')}</span>
                      <span className="font-medium text-gray-700">{sub.completionPct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${sub.completionPct >= 100 ? 'bg-green-500' : sub.completionPct >= 70 ? 'bg-indigo-500' : 'bg-yellow-500'}`}
                        style={{ width: `${sub.completionPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Points + actions */}
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Award size={14} className="text-amber-500" />
                      <span className="text-gray-500">{t('points')}:</span>
                      <span className="font-semibold text-gray-800">
                        {sub.status === 'approved' ? sub.points : pointsFor(sub.completionPct)}
                      </span>
                      {sub.status !== 'approved' && <span className="text-[10px] text-gray-400">{t('onApproval')}</span>}
                    </div>

                    {sub.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => approve(sub.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors"
                        >
                          <Check size={13} /> {t('approveQuantity')}
                        </button>
                        <button
                          onClick={() => requestCorrection(sub.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                        >
                          <RefreshCw size={13} /> {t('requestCorrection')}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSubs(prev => prev.map(s => s.id === sub.id ? { ...s, status: 'pending', points: 0 } : s))}
                        className="text-xs text-indigo-600 hover:underline"
                      >
                        {t('reset')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
