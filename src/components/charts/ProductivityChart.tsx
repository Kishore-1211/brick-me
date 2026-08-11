import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import { productivityData } from '../../data/reports';

export default function ProductivityChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={productivityData} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} />
        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="score"
          name="Productivity Score"
          stroke="#321E48"
          strokeWidth={2}
          dot={<Dot r={4} fill="#65DCD5" stroke="#321E48" strokeWidth={1.5} />}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
