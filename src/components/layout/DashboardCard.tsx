import type { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change: string;
  color: string;
}

export default function DashboardCard({ title, value, icon, change, color }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold stat-number mb-1">{value}</p>
      <p className="text-xs text-gray-400">{change}</p>
    </div>
  );
}
