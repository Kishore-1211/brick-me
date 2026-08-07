import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { payroll } from '../data/payroll';

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default function MyPayroll() {
  const { auth } = useAuth();
  const { t } = useLang();
  const myPayroll = payroll.filter(r => r.employeeId === auth.employee?.id);

  return (
    <div className="space-y-4">
      {myPayroll.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-indigo-600 font-medium">{t('netPay')}</p>
            <p className="text-3xl font-bold text-indigo-700">{fmt(myPayroll[0].netPay)}</p>
            <p className="text-xs text-indigo-400 mt-1">{myPayroll[0].month}</p>
          </div>
          <Badge label={myPayroll[0].status === 'paid' ? t('paid') : t('pending')} variant={myPayroll[0].status === 'paid' ? 'green' : 'yellow'} />
        </div>
      )}

      <Card>
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">{t('navMyWages')}</h3>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[520px]">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">{t('month')}</th>
              <th className="px-5 py-3 font-medium">{t('baseSalary')}</th>
              <th className="px-5 py-3 font-medium">{t('allowances')}</th>
              <th className="px-5 py-3 font-medium">{t('deductions')}</th>
              <th className="px-5 py-3 font-medium">{t('netPay')}</th>
              <th className="px-5 py-3 font-medium">{t('status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {myPayroll.map(record => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-medium text-gray-700">{record.month}</td>
                <td className="px-5 py-3 text-gray-600">{fmt(record.baseSalary)}</td>
                <td className="px-5 py-3 text-green-600">+{fmt(record.allowances)}</td>
                <td className="px-5 py-3 text-red-500">-{fmt(record.deductions)}</td>
                <td className="px-5 py-3 font-semibold text-gray-900">{fmt(record.netPay)}</td>
                <td className="px-5 py-3">
                  <Badge label={record.status === 'paid' ? t('paid') : t('pending')} variant={record.status === 'paid' ? 'green' : 'yellow'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {myPayroll.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">{t('noPayrollRecords')}</p>
        )}
      </Card>
    </div>
  );
}
