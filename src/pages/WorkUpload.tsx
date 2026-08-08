import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Camera, CheckCircle2, X } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { useWork } from '../context/WorkContext';
import { getAssignedWork } from '../data/labour';

type PhotoSlot = 'before' | 'during' | 'after';

export default function WorkUpload() {
  const { auth } = useAuth();
  const { t } = useLang();
  const { addSubmission } = useWork();
  const work = getAssignedWork(auth.employee?.id);

  const [taskId, setTaskId] = useState(work[0]?.id ?? '');
  const [photos, setPhotos] = useState<Record<PhotoSlot, string | null>>({ before: null, during: null, after: null });
  const [quantity, setQuantity] = useState('');
  const [hours, setHours] = useState('');
  const [issues, setIssues] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handlePhoto(slot: PhotoSlot, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhotos(prev => ({ ...prev, [slot]: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  const allPhotos = photos.before && photos.during && photos.after;
  const canSubmit = allPhotos && quantity.trim() && hours.trim();

  function handleSubmit() {
    const task = work.find(w => w.id === taskId);
    addSubmission({
      id: `ws${Date.now()}`,
      workerId: auth.employee?.id ?? 'unknown',
      workerName: auth.employee?.name ?? 'Worker',
      activity: task?.activity ?? '',
      target: task?.target ?? '',
      quantity,
      hours,
      issues,
      photos: [photos.before, photos.during, photos.after].filter(Boolean) as string[],
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    });
    setSubmitted(true);
  }

  function reset() {
    setPhotos({ before: null, during: null, after: null });
    setQuantity('');
    setHours('');
    setIssues('');
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-5 max-w-sm mx-auto">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 size={44} className="text-green-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{t('workSubmitted')}</h2>
          <p className="text-sm text-gray-500 mt-1">{t('workSubmittedMsg')}</p>
        </div>
        <Button variant="outline" size="sm" onClick={reset}>{t('submitAnother')}</Button>
      </div>
    );
  }

  const slots: { key: PhotoSlot; label: string }[] = [
    { key: 'before', label: t('beforePhoto') },
    { key: 'during', label: t('duringPhoto') },
    { key: 'after', label: t('afterPhoto') },
  ];

  return (
    <div className="space-y-4 max-w-2xl">
      <p className="text-sm text-gray-500">{t('workUploadIntro')}</p>

      <Card className="p-5 space-y-4">
        {/* Select task */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('selectTask')}</label>
          <select value={taskId} onChange={e => setTaskId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
            {work.map(w => <option key={w.id} value={w.id}>{w.activity} — {w.target}</option>)}
          </select>
        </div>

        {/* Photos */}
        <div className="grid grid-cols-3 gap-3">
          {slots.map(({ key, label }) => (
            <div key={key}>
              <p className="text-xs font-medium text-gray-500 mb-1.5">📸 {label}</p>
              <label className="relative block cursor-pointer aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors overflow-hidden">
                {photos[key] ? (
                  <>
                    <img src={photos[key]!} alt={label} className="w-full h-full object-cover" />
                    <button type="button"
                      onClick={e => { e.preventDefault(); setPhotos(prev => ({ ...prev, [key]: null })); }}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center">
                      <X size={11} />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-1">
                    <Camera size={20} />
                    <span className="text-[10px] text-center px-1">{t('tapToUpload')}</span>
                  </div>
                )}
                <input type="file" accept="image/*" capture="environment" onChange={e => handlePhoto(key, e)} className="hidden" />
              </label>
            </div>
          ))}
        </div>

        {/* Quantity + hours */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('quantityCompleted')}</label>
            <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder={t('quantityPlaceholder')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('hoursWorked')}</label>
            <input type="text" inputMode="decimal" value={hours} onChange={e => setHours(e.target.value)} placeholder={t('hoursPlaceholder')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        {/* Issues */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('issuesFaced')}</label>
          <textarea value={issues} onChange={e => setIssues(e.target.value)} placeholder={t('issuesPlaceholder')} rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>

        <Button className="w-full justify-center py-2.5" disabled={!canSubmit} onClick={handleSubmit}>
          <CheckCircle2 size={16} /> {t('submitForApproval')}
        </Button>
        {!canSubmit && <p className="text-center text-xs text-gray-400">{t('needAllPhotos')}</p>}
      </Card>
    </div>
  );
}
