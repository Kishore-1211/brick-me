import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import People from '../pages/People';
import Attendance from '../pages/Attendance';
import Tasks from '../pages/Tasks';
import Performance from '../pages/Performance';
import Payroll from '../pages/Payroll';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import MyAttendance from '../pages/MyAttendance';
import MyTasks from '../pages/MyTasks';
import MyPayroll from '../pages/MyPayroll';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        {/* Site Manager routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/people" element={<People />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        {/* Labour routes */}
        <Route path="/my-attendance" element={<MyAttendance />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/my-payroll" element={<MyPayroll />} />
      </Route>
    </Routes>
  );
}
