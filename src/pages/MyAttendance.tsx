import { Gift, Star } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { attendance } from '../data/attendance';
import type { AttendanceStatus } from '../data/attendance';
import { payroll } from '../data/payroll';

const BONUS_AMOUNT = 2000;
const CURRENT_MONTH = '2026-08';

const statusConfig: Record<AttendanceStatus, { label: string; variant: 'green' | 'red' | 'yellow' | 'blue'; rowClass: string }> = {
  present: { label: 'Present', variant: 'green', rowClass: '' },
  absent: { label: 'Absent', variant: 'red', rowClass: 'bg-red-50' },
  late: { label: 'Late', variant: 'yellow', rowClass: 'bg-yellow-50' },
  leave: { label: 'Leave', variant: 'blue', rowClass: 'bg-blue-50' },
};

export default function MyAttendance() {
  const { auth } = useAuth();
  const myRecords = attendance.filter(r => r.employeeId === auth.employee?.id);

  const present = myRecords.filter(r => r.status === 'present').length;
  const absent = myRecords.filter(r => r.status === 'absent').length;
  const late = myRecords.filter(r => r.status === 'late').length;
  const total = myRecords.length;

  // Full attendance = no absent records at all (late/leave are acceptable)
  const hasFullAttendance = total > 0 && absent === 0;
  const attendancePct = total > 0 ? Math.round((present / total) * 100) : 0;

  // Check if payroll bonus already awarded
  const myPayroll = payroll.find(r => r.employeeId === auth.employee?.id && r.month === CURRENT_MONTH);

  return (
    <div className="space-y-4">

      {/* ── Full Attendance Bonus Banner ── */}
      {hasFullAttendance && (
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl p-5 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Star size={18} className="fill-white" />
                <span className="text-sm font-bold uppercase tracking-wide">Full Attendance Bonus!</span>
              </div>
              <p className="text-2xl font-bold">+₹{BONUS_AMOUNT.toLocaleString('en-IN')}</p>
              <p className="text-amber-100 text-xs">
                You have 100% attendance for {CURRENT_MONTH}. This bonus will be added to your {CURRENT_MONTH} wages.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Gift size={52} className="text-white/30" />
            </div>
          </div>
          {/* Decorative dots */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
          <div className="absolute -bottom-6 -left-4 w-24 h-24 bg-white/10 rounded-full" />
        </div>
      )}

      {/* Near-perfect attendance nudge */}
      {!hasFullAttendance && absent === 0 && late > 0 && total > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
          <Star size={18} className="text-yellow-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-yellow-800">Almost there!</p>
            <p className="text-xs text-yellow-600">
              You have {late} late arrival{late > 1 ? 's' : ''}. Zero absences means you still qualify for the
              full attendance bonus — keep it up!
            </p>
          </div>
        </div>
      )}

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-700">{total}</p>
          <p className="text-xs text-gray-400 mt-0.5">Total Days</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{present}</p>
          <p className="text-xs text-green-500 mt-0.5">Present</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{absent}</p>
          <p className="text-xs text-red-400 mt-0.5">Absent</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-700">{late}</p>
          <p className="text-xs text-yellow-500 mt-0.5">Late</p>
        </div>
      </div>

      {/* Attendance rate bar */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Attendance Rate</span>
          <span className={`text-sm font-bold ${attendancePct === 100 ? 'text-green-600' : attendancePct >= 80 ? 'text-yellow-600' : 'text-red-500'}`}>
            {attendancePct}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${attendancePct === 100 ? 'bg-green-500' : attendancePct >= 80 ? 'bg-yellow-400' : 'bg-red-400'}`}
            style={{ width: `${attendancePct}%` }}
          />
        </div>
        {myPayroll && (
          <p className="text-xs text-gray-400 mt-2">
            Base wage this month: ₹{myPayroll.baseSalary.toLocaleString('en-IN')}
            {hasFullAttendance && <span className="text-green-600 font-medium"> + ₹{BONUS_AMOUNT.toLocaleString('en-IN')} bonus</span>}
          </p>
        )}
      </div>

      {/* ── Records table ── */}
      <Card>
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Attendance Records</h3>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[420px]">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Check In</th>
              <th className="px-5 py-3 font-medium">Check Out</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {myRecords.map(record => {
              const cfg = statusConfig[record.status];
              return (
                <tr key={record.id} className={cfg.rowClass}>
                  <td className="px-5 py-3 text-gray-700">{record.date}</td>
                  <td className="px-5 py-3 text-gray-500">{record.checkIn}</td>
                  <td className="px-5 py-3 text-gray-500">{record.checkOut}</td>
                  <td className="px-5 py-3">
                    <Badge label={cfg.label} variant={cfg.variant} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {myRecords.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No attendance records found.</p>
        )}
      </Card>
    </div>
  );
}
