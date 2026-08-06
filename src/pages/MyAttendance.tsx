import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { attendance } from '../data/attendance';
import type { AttendanceStatus } from '../data/attendance';

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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{present}</p>
          <p className="text-sm text-green-600">Present</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{absent}</p>
          <p className="text-sm text-red-600">Absent</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-700">{late}</p>
          <p className="text-sm text-yellow-600">Late</p>
        </div>
      </div>

      <Card>
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">My Attendance Records</h3>
        </div>
        <table className="w-full text-sm">
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
        {myRecords.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No attendance records found.</p>
        )}
      </Card>
    </div>
  );
}
