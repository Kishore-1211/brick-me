import { useState } from 'react';
import { MapPin, Check, X, Clock, Camera } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useLang } from '../context/LanguageContext';
import { attendance as seedAttendance } from '../data/attendance';
import type { AttendanceStatus, ApprovalStatus } from '../data/attendance';
import type { TranslationKey } from '../i18n/translations';

const statusConfig: Record<AttendanceStatus, { key: TranslationKey; variant: 'green' | 'red' | 'yellow' | 'blue' | 'gray' }> = {
  present: { key: 'present', variant: 'green' },
  absent: { key: 'absent', variant: 'red' },
  late: { key: 'late', variant: 'yellow' },
  leave: { key: 'leave', variant: 'blue' },
};

const approvalConfig: Record<ApprovalStatus, { key: TranslationKey; variant: 'green' | 'red' | 'yellow' }> = {
  approved: { key: 'approved', variant: 'green' },
  rejected: { key: 'rejected', variant: 'red' },
  pending: { key: 'pending', variant: 'yellow' },
};

// Deterministic per-worker selfie placeholder (real apps store the captured photo).
function selfieFor(record: { employeeId: string; status: AttendanceStatus }): string | null {
  if (record.status === 'absent' || record.status === 'leave') return null;
  return `https://i.pravatar.cc/320?u=${record.employeeId}`;
}

type SelfieView = { name: string; avatar: string; date: string; checkIn: string; onSite: boolean; url: string };

export default function Attendance() {
  const { t } = useLang();
  const [records, setRecords] = useState(seedAttendance);
  const [filterDate, setFilterDate] = useState('');
  const [selfieView, setSelfieView] = useState<SelfieView | null>(null);

  function setApproval(id: string, approval: ApprovalStatus) {
    setRecords(prev => prev.map(r => (r.id === id ? { ...r, approval } : r)));
  }

  const filtered = records.filter(r => !filterDate || r.date === filterDate);
  const pendingCount = filtered.filter(r => r.approval === 'pending').length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
        {filterDate && (
          <button onClick={() => setFilterDate('')} className="text-sm text-indigo-600 hover:underline">{t('clear')}</button>
        )}
        {pendingCount > 0 && (
          <span className="ml-auto text-xs font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
            {pendingCount} {t('pending')}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(record => {
          const cfg = statusConfig[record.status];
          const appr = approvalConfig[record.approval];
          return (
            <Card key={record.id} className="p-4">
              <div className="flex items-start gap-3">
                {/* Worker photo */}
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {record.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-gray-800 truncate">{record.employeeName}</p>
                    <Badge label={t(cfg.key)} variant={cfg.variant} />
                  </div>
                  <p className="text-xs text-gray-400">{record.date}</p>

                  {/* Details */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Clock size={13} className="text-gray-400" />
                      {t('loginTimeLabel')}: <span className="font-medium text-gray-800">{record.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Clock size={13} className="text-gray-400" />
                      {t('workingHoursLabel')}: <span className="font-medium text-gray-800">{record.workingHours > 0 ? `${record.workingHours.toFixed(1)}h` : '—'}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 text-gray-600">
                      <MapPin size={13} className={record.gps ? (record.gps.onSite ? 'text-green-500' : 'text-red-500') : 'text-gray-300'} />
                      {record.gps ? (
                        <span className={record.gps.onSite ? 'text-green-700' : 'text-red-600'}>
                          {record.gps.lat.toFixed(4)}, {record.gps.lng.toFixed(4)} — {record.gps.onSite ? t('verified') : t('outsidePerimeter')}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </div>
                    {selfieFor(record) ? (
                      <button
                        type="button"
                        onClick={() => setSelfieView({
                          name: record.employeeName, avatar: record.avatar, date: record.date,
                          checkIn: record.checkIn, onSite: !!record.gps?.onSite, url: selfieFor(record)!,
                        })}
                        className="col-span-2 flex items-center gap-1.5 text-indigo-600 hover:underline"
                      >
                        <Camera size={13} /> {t('selfieVerification')}
                      </button>
                    ) : (
                      <div className="col-span-2 flex items-center gap-1.5 text-gray-300">
                        <Camera size={13} /> {t('selfieVerification')}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex items-center gap-2">
                    {record.approval === 'pending' ? (
                      <>
                        <button
                          onClick={() => setApproval(record.id, 'approved')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors"
                        >
                          <Check size={13} /> {t('approve')}
                        </button>
                        <button
                          onClick={() => setApproval(record.id, 'rejected')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors"
                        >
                          <X size={13} /> {t('reject')}
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Badge label={t(appr.key)} variant={appr.variant} />
                        <button
                          onClick={() => setApproval(record.id, 'pending')}
                          className="text-xs text-indigo-600 hover:underline"
                        >
                          {t('undo')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-8">{t('noAttendanceRecords')}</p>
      )}

      {/* Selfie verification modal */}
      {selfieView && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelfieView(null)}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Camera size={15} className="text-indigo-600" /> {t('selfieVerification')}
              </h3>
              <button onClick={() => setSelfieView(null)} aria-label={t('close')}>
                <X size={18} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            {/* Photo (falls back to initials avatar if the image can't load) */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-6xl font-bold">{selfieView.avatar}</span>
              <img
                src={selfieView.url}
                alt={`${selfieView.name} selfie`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

            <div className="mt-4 space-y-1.5">
              <p className="font-semibold text-gray-800">{selfieView.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <Clock size={13} className="text-gray-400" /> {selfieView.date} · {t('loginTimeLabel')} {selfieView.checkIn}
              </p>
              <p className={`text-xs flex items-center gap-1.5 font-medium ${selfieView.onSite ? 'text-green-600' : 'text-red-500'}`}>
                <MapPin size={13} /> {selfieView.onSite ? t('verifiedOnSite') : t('outsidePerimeter')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
