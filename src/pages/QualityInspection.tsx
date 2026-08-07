import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { CheckSquare, Square, Upload, X, ClipboardCheck } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useLang } from '../context/LanguageContext';
import { brickworkChecklist, inspections as seedInspections } from '../data/inspections';
import type { InspectionResult, InspectionRecord } from '../data/inspections';
import type { TranslationKey } from '../i18n/translations';

const resultConfig: Record<InspectionResult, { key: TranslationKey; variant: 'green' | 'yellow' | 'red'; dot: string }> = {
  passed: { key: 'passed', variant: 'green', dot: 'bg-green-500' },
  correction: { key: 'correction', variant: 'yellow', dot: 'bg-yellow-500' },
  failed: { key: 'failed', variant: 'red', dot: 'bg-red-500' },
};

const checklistKey: Record<string, TranslationKey> = {
  'line-level': 'lineLevel',
  'plumb': 'plumb',
  'joint-thickness': 'jointThickness',
  'mortar-quality': 'mortarQuality',
  'curing': 'curing',
};

export default function QualityInspection() {
  const { t } = useLang();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [photos, setPhotos] = useState<string[]>([]);
  const [project, setProject] = useState('');
  const [location, setLocation] = useState('');
  const [history, setHistory] = useState<InspectionRecord[]>(seedInspections);

  function toggle(key: string) {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function handlePhotos(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setPhotos(prev => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
  }

  const passedItems = brickworkChecklist.filter(i => checked[i.key]).length;
  const totalItems = brickworkChecklist.length;

  function submit(result: InspectionResult) {
    const record: InspectionRecord = {
      id: `q${Date.now()}`,
      project: project || 'Unspecified project',
      location: location || 'Unspecified location',
      workerName: '—',
      inspectedBy: 'Site Manager',
      date: new Date().toISOString().slice(0, 10),
      result,
      passedItems,
      totalItems,
    };
    setHistory(prev => [record, ...prev]);
    // reset form
    setChecked({});
    setPhotos([]);
    setProject('');
    setLocation('');
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Inspection form */}
        <Card className="p-5 lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <ClipboardCheck size={16} className="text-indigo-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700">{t('brickworkChecklist')}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={project}
              onChange={e => setProject(e.target.value)}
              placeholder={t('project')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder={t('location')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          {/* Checklist */}
          <div className="space-y-1">
            {brickworkChecklist.map(item => (
              <button
                key={item.key}
                onClick={() => toggle(item.key)}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {checked[item.key]
                  ? <CheckSquare size={18} className="text-green-600 flex-shrink-0" />
                  : <Square size={18} className="text-gray-300 flex-shrink-0" />}
                <span className={`text-sm ${checked[item.key] ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>{t(checklistKey[item.key])}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400">{passedItems} / {totalItems} {t('checksPassed')}</p>

          {/* Photo upload */}
          <div className="border-t border-gray-100 pt-4">
            <label className="inline-flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <Upload size={14} /> {t('uploadInspectionPhotos')}
              <input type="file" accept="image/*" multiple onChange={handlePhotos} className="hidden" />
            </label>
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {photos.map((src, i) => (
                  <div key={i} className="relative">
                    <img src={src} alt={`Inspection ${i + 1}`} className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                    <button
                      onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Final result */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-medium text-gray-500 mb-2">{t('finalResult')}</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => submit('passed')}>
                <span className="w-2.5 h-2.5 rounded-full bg-white/90" /> {t('passed')}
              </Button>
              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600" onClick={() => submit('correction')}>
                <span className="w-2.5 h-2.5 rounded-full bg-white/90" /> {t('correction')}
              </Button>
              <Button size="sm" variant="danger" onClick={() => submit('failed')}>
                <span className="w-2.5 h-2.5 rounded-full bg-white/90" /> {t('failed')}
              </Button>
            </div>
          </div>
        </Card>

        {/* History */}
        <Card className="p-5 lg:col-span-2 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">{t('recentInspections')}</h3>
          <div className="space-y-2">
            {history.map(rec => {
              const cfg = resultConfig[rec.result];
              return (
                <div key={rec.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                      <p className="text-sm font-medium text-gray-800 truncate">{rec.location}</p>
                    </div>
                    <Badge label={t(cfg.key)} variant={cfg.variant} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{rec.project} · {rec.date}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{rec.passedItems}/{rec.totalItems} · {t('inspector')}: {rec.inspectedBy}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
