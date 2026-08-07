import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { getAssignedWork } from '../data/labour';
import type { WorkStatus } from '../data/labour';

export default function MyWork() {
  const { auth } = useAuth();
  const { t } = useLang();
  const work = getAssignedWork(auth.employee?.id);

  const statusConfig: Record<WorkStatus, { label: string; variant: 'green' | 'yellow' | 'blue' }> = {
    completed: { label: t('completed'), variant: 'green' },
    'in-progress': { label: t('inProgress'), variant: 'blue' },
    pending: { label: t('pending'), variant: 'yellow' },
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{work.length}</span> {t('tasksAssignedToYou')}
        </p>
        <Link to="/work-upload" className="inline-flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:underline">
          <Upload size={15} /> {t('uploadCompletion')}
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[420px]">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">{t('activity')}</th>
                <th className="px-5 py-3 font-medium">{t('target')}</th>
                <th className="px-5 py-3 font-medium">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {work.map(item => {
                const cfg = statusConfig[item.status];
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-800">{item.activity}</td>
                    <td className="px-5 py-3 text-gray-500">{item.target}</td>
                    <td className="px-5 py-3"><Badge label={cfg.label} variant={cfg.variant} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {work.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">{t('noWorkAssigned')}</p>
        )}
      </Card>
    </div>
  );
}
