import { useState } from 'react';
import { MapPin, Check, X, Clock, Camera } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { attendance as seedAttendance } from '../data/attendance';
import type { AttendanceStatus, ApprovalStatus } from '../data/attendance';

const statusConfig: Record<AttendanceStatus, { label: string; variant: 'green' | 'red' | 'yellow' | 'blue' | 'gray' }> = {
  present: { label: 'Present', variant: 'green' },
  absent: { label: 'Absent', variant: 'red' },
  late: { label: 'Late', variant: 'yellow' },
  leave: { label: 'Leave', variant: 'blue' },
};

const approvalConfig: Record<ApprovalStatus, { label: string; variant: 'green' | 'red' | 'yellow' }> = {
  approved: { label: 'Approved', variant: 'green' },
  rejected: { label: 'Rejected', variant: 'red' },
  pending: { label: 'Pending', variant: 'yellow' },
};

export default function Attendance() {
  const [records, setRecords] = useState(seedAttendance);
  const [filterDate, setFilterDate] = useState('');

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
          <button onClick={() => setFilterDate('')} className="text-sm text-indigo-600 hover:underline">Clear</button>
        )}
        {pendingCount > 0 && (
          <span className="ml-auto text-xs font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
            {pendingCount} pending approval{pendingCount > 1 ? 's' : ''}
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
                    <Badge label={cfg.label} variant={cfg.variant} />
                  </div>
                  <p className="text-xs text-gray-400">{record.date}</p>

                  {/* Details */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Clock size={13} className="text-gray-400" />
                      Login: <span className="font-medium text-gray-800">{record.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Clock size={13} className="text-gray-400" />
                      Hours: <span className="font-medium text-gray-800">{record.workingHours > 0 ? `${record.workingHours.toFixed(1)}h` : '—'}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 text-gray-600">
                      <MapPin size={13} className={record.gps ? (record.gps.onSite ? 'text-green-500' : 'text-red-500') : 'text-gray-300'} />
                      {record.gps ? (
                        <span className={record.gps.onSite ? 'text-green-700' : 'text-red-600'}>
                          {record.gps.lat.toFixed(4)}, {record.gps.lng.toFixed(4)} — {record.gps.onSite ? 'On site' : 'Off site'}
                        </span>
                      ) : (
                        <span className="text-gray-400">No GPS data</span>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 text-gray-400">
                      <Camera size={13} /> Selfie captured at check-in
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex items-center gap-2">
                    {record.approval === 'pending' ? (
                      <>
                        <button
                          onClick={() => setApproval(record.id, 'approved')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors"
                        >
                          <Check size={13} /> Approve
                        </button>
                        <button
                          onClick={() => setApproval(record.id, 'rejected')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors"
                        >
                          <X size={13} /> Reject
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Badge label={appr.label} variant={appr.variant} />
                        <button
                          onClick={() => setApproval(record.id, 'pending')}
                          className="text-xs text-indigo-600 hover:underline"
                        >
                          Undo
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
        <p className="text-center text-gray-400 text-sm py-8">No records for selected date.</p>
      )}
    </div>
  );
}
