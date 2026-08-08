import { Building2, Users, TrendingUp, ShieldCheck } from 'lucide-react';
import Card from '../components/ui/Card';
import { useLang } from '../context/LanguageContext';
import { sites } from '../data/sites';

export default function ManagementOverview() {
  const { t } = useLang();

  const totalLabour = sites.reduce((s, x) => s + x.labour, 0);
  const avgProductivity = Math.round(sites.reduce((s, x) => s + x.productivity, 0) / sites.length);
  const avgQuality = Math.round(sites.reduce((s, x) => s + x.quality, 0) / sites.length);

  const cards = [
    { label: t('allSites'), value: sites.length, icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: t('labour'), value: totalLabour, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: t('productivityScore'), value: `${avgProductivity}%`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: t('qualityScore'), value: `${avgQuality}%`, icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  function bar(value: number) {
    return value >= 90 ? 'bg-green-500' : value >= 80 ? 'bg-indigo-500' : 'bg-yellow-500';
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon size={20} className={color} />
              </div>
            </div>
            <p className="text-3xl font-bold stat-number">{value}</p>
          </Card>
        ))}
      </div>

      {/* All sites table */}
      <Card>
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">{t('allSites')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">{t('site')}</th>
                <th className="px-5 py-3 font-medium">{t('labour')}</th>
                <th className="px-5 py-3 font-medium">{t('productivityScore')}</th>
                <th className="px-5 py-3 font-medium">{t('qualityScore')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sites.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-800">{s.name}</td>
                  <td className="px-5 py-3 text-gray-500">{s.labour}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${bar(s.productivity)}`} style={{ width: `${s.productivity}%` }} />
                      </div>
                      <span className="text-gray-700 font-medium">{s.productivity}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${bar(s.quality)}`} style={{ width: `${s.quality}%` }} />
                      </div>
                      <span className="text-gray-700 font-medium">{s.quality}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
