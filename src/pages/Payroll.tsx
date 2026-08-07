import { useState } from 'react';
import { Lock, Calculator } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { payroll } from '../data/payroll';
import type { PayrollStatus } from '../data/payroll';
import { useRole } from '../hooks/useRole';
import { useLang } from '../context/LanguageContext';

const months = ['2026-08', '2026-07'];

export default function Payroll() {
  const { isAdmin } = useRole();
  const { t } = useLang();
  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [statuses, setStatuses] = useState<Record<string, PayrollStatus>>(
    () => Object.fromEntries(payroll.map(r => [r.id, r.status]))
  );

  const filtered = payroll.filter(r => r.month === selectedMonth);
  const total = filtered.reduce((sum, r) => sum + r.netPay, 0);

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;
  const mask = '₹ ••••';

  function markPaid(id: string) {
    setStatuses(prev => ({ ...prev, [id]: 'paid' }));
  }

  return (
    <div className="space-y-4">
      {!isAdmin && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs px-4 py-2.5 rounded-lg">
          <Lock size={13} /> {t('adminOnly')}
        </div>
      )}

      {/* Auto-calculation formula */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calculator size={16} className="text-indigo-600" />
          <h3 className="text-sm font-semibold text-gray-700">{t('payrollAutoCalc')}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium">{t('basicSalary')}</span>
          <span className="text-green-600 font-bold">+</span>
          <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-lg font-medium">{t('attendanceBonusLabel')}</span>
          <span className="text-green-600 font-bold">+</span>
          <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-lg font-medium">{t('productivityIncentive')}</span>
          <span className="text-red-500 font-bold">−</span>
          <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-lg font-medium">{t('advance')}</span>
          <span className="text-red-500 font-bold">−</span>
          <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-lg font-medium">{t('penalty')}</span>
          <span className="text-gray-400 font-bold">=</span>
          <span className="bg-indigo-600 text-white px-2.5 py-1 rounded-lg font-medium">{t('finalPayroll')}</span>
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-500 font-medium">{t('month')}:</label>
        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <Card>
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[820px]">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="px-4 py-3 font-medium">{t('worker')}</th>
              <th className="px-4 py-3 font-medium">
                {t('basicSalary')} {!isAdmin && <Lock size={11} className="inline ml-0.5 text-gray-300" />}
              </th>
              <th className="px-4 py-3 font-medium text-green-600">+ {t('attendanceBonusLabel')}</th>
              <th className="px-4 py-3 font-medium text-green-600">+ {t('productivityIncentive')}</th>
              <th className="px-4 py-3 font-medium text-red-500">− {t('advance')}</th>
              <th className="px-4 py-3 font-medium text-red-500">− {t('penalty')}</th>
              <th className="px-4 py-3 font-medium">{t('finalPayroll')}</th>
              <th className="px-4 py-3 font-medium">{t('status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(record => {
              const status = statuses[record.id];
              return (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{record.name}</td>
                  <td className="px-4 py-3 text-gray-600">{isAdmin ? fmt(record.baseSalary) : mask}</td>
                  <td className="px-4 py-3 text-green-600">{isAdmin ? `+${fmt(record.attendanceBonus)}` : mask}</td>
                  <td className="px-4 py-3 text-green-600">{isAdmin ? `+${fmt(record.productivityIncentive)}` : mask}</td>
                  <td className="px-4 py-3 text-red-500">{isAdmin ? `-${fmt(record.advance)}` : mask}</td>
                  <td className="px-4 py-3 text-red-500">{isAdmin ? `-${fmt(record.penalty)}` : mask}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{isAdmin ? fmt(record.netPay) : mask}</td>
                  <td className="px-4 py-3">
                    {isAdmin && status === 'pending' ? (
                      <button
                        onClick={() => markPaid(record.id)}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 hover:bg-green-100 hover:text-green-700 transition-colors"
                      >
                        {t('markPaid')}
                      </button>
                    ) : (
                      <Badge
                        label={status === 'paid' ? t('paid') : t('pending')}
                        variant={status === 'paid' ? 'green' : 'yellow'}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
            <tr className="bg-gray-50 font-semibold border-t border-gray-200">
              <td colSpan={6} className="px-4 py-3 text-gray-700">{t('totalWages')}</td>
              <td className="px-4 py-3 text-indigo-700">{isAdmin ? fmt(total) : mask}</td>
              <td />
            </tr>
          </tbody>
        </table>
        </div>
      </Card>
    </div>
  );
}
