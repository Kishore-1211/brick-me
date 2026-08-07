import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import EngineerDashboard from '../pages/EngineerDashboard';
import ManagementOverview from '../pages/ManagementOverview';
import People from '../pages/People';
import Attendance from '../pages/Attendance';
import Tasks from '../pages/Tasks';
import ProductivityApproval from '../pages/ProductivityApproval';
import QualityInspection from '../pages/QualityInspection';
import Performance from '../pages/Performance';
import Payroll from '../pages/Payroll';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import MyAttendance from '../pages/MyAttendance';
import MyPayroll from '../pages/MyPayroll';
import CheckIn from '../pages/CheckIn';
import LabourHome from '../pages/LabourHome';
import MyWork from '../pages/MyWork';
import WorkUpload from '../pages/WorkUpload';
import LabourPerformance from '../pages/LabourPerformance';
import Rewards from '../pages/Rewards';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        {/* Site Manager routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/engineer-dashboard" element={<EngineerDashboard />} />
        <Route path="/overview" element={<ManagementOverview />} />
        <Route path="/people" element={<People />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/productivity" element={<ProductivityApproval />} />
        <Route path="/quality" element={<QualityInspection />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        {/* Labour routes */}
        <Route path="/labour-home" element={<LabourHome />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/my-attendance" element={<MyAttendance />} />
        <Route path="/my-work" element={<MyWork />} />
        <Route path="/work-upload" element={<WorkUpload />} />
        <Route path="/my-performance" element={<LabourPerformance />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/my-payroll" element={<MyPayroll />} />
      </Route>
    </Routes>
  );
}
