import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { weeklyAttendance } from '../../data/attendance';

export default function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={weeklyAttendance} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="present" name="Present" fill="#26A69D" radius={[4, 4, 0, 0]} />
        <Bar dataKey="late" name="Late" fill="#43637E" radius={[4, 4, 0, 0]} />
        <Bar dataKey="absent" name="Absent" fill="#C4CDD4" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
