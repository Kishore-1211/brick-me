export type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
  workingHours: number;
  gps: { lat: number; lng: number; onSite: boolean } | null;
  approval: ApprovalStatus;
}

export const attendance: AttendanceRecord[] = [
  { id: 'a1', employeeId: 'u1', employeeName: 'Suresh Patel', avatar: 'SP', date: '2026-08-05', checkIn: '07:02', checkOut: '17:05', status: 'present', workingHours: 10.0, gps: { lat: 19.0762, lng: 72.8779, onSite: true }, approval: 'approved' },
  { id: 'a2', employeeId: 'u2', employeeName: 'Ramesh Kumar', avatar: 'RK', date: '2026-08-05', checkIn: '07:45', checkOut: '17:30', status: 'late', workingHours: 9.75, gps: { lat: 19.0758, lng: 72.8781, onSite: true }, approval: 'pending' },
  { id: 'a3', employeeId: 'u3', employeeName: 'Dinesh Singh', avatar: 'DS', date: '2026-08-05', checkIn: '--', checkOut: '--', status: 'absent', workingHours: 0, gps: null, approval: 'pending' },
  { id: 'a4', employeeId: 'u4', employeeName: 'Mahesh Yadav', avatar: 'MY', date: '2026-08-05', checkIn: '06:55', checkOut: '16:58', status: 'present', workingHours: 10.05, gps: { lat: 19.0761, lng: 72.8775, onSite: true }, approval: 'pending' },
  { id: 'a5', employeeId: 'u5', employeeName: 'Ganesh Gupta', avatar: 'GG', date: '2026-08-05', checkIn: '--', checkOut: '--', status: 'leave', workingHours: 0, gps: null, approval: 'approved' },
  { id: 'a6', employeeId: 'u6', employeeName: 'Rajesh Nair', avatar: 'RN', date: '2026-08-05', checkIn: '07:00', checkOut: '17:10', status: 'present', workingHours: 10.17, gps: { lat: 19.0759, lng: 72.8780, onSite: true }, approval: 'pending' },
  { id: 'a7', employeeId: 'u7', employeeName: 'Vikram Sharma', avatar: 'VS', date: '2026-08-05', checkIn: '08:15', checkOut: '18:00', status: 'late', workingHours: 9.75, gps: { lat: 19.0840, lng: 72.8810, onSite: false }, approval: 'pending' },
  { id: 'a8', employeeId: 'u8', employeeName: 'Santosh Verma', avatar: 'SV', date: '2026-08-05', checkIn: '07:00', checkOut: '17:00', status: 'present', workingHours: 10.0, gps: { lat: 19.0763, lng: 72.8778, onSite: true }, approval: 'pending' },
  { id: 'a9', employeeId: 'u9', employeeName: 'Mohan Das', avatar: 'MD', date: '2026-08-05', checkIn: '06:50', checkOut: '17:05', status: 'present', workingHours: 10.25, gps: { lat: 19.0760, lng: 72.8777, onSite: true }, approval: 'approved' },
  { id: 'a10', employeeId: 'u1', employeeName: 'Suresh Patel', avatar: 'SP', date: '2026-08-04', checkIn: '07:10', checkOut: '17:00', status: 'present', workingHours: 9.83, gps: { lat: 19.0762, lng: 72.8779, onSite: true }, approval: 'approved' },
  { id: 'a11', employeeId: 'u2', employeeName: 'Ramesh Kumar', avatar: 'RK', date: '2026-08-04', checkIn: '07:00', checkOut: '16:55', status: 'present', workingHours: 9.92, gps: { lat: 19.0758, lng: 72.8781, onSite: true }, approval: 'approved' },
  { id: 'a12', employeeId: 'u3', employeeName: 'Dinesh Singh', avatar: 'DS', date: '2026-08-04', checkIn: '07:30', checkOut: '17:15', status: 'late', workingHours: 9.75, gps: { lat: 19.0757, lng: 72.8783, onSite: true }, approval: 'approved' },
  { id: 'a13', employeeId: 'u4', employeeName: 'Mahesh Yadav', avatar: 'MY', date: '2026-08-04', checkIn: '--', checkOut: '--', status: 'absent', workingHours: 0, gps: null, approval: 'rejected' },
  { id: 'a14', employeeId: 'u6', employeeName: 'Rajesh Nair', avatar: 'RN', date: '2026-08-04', checkIn: '06:58', checkOut: '17:02', status: 'present', workingHours: 10.07, gps: { lat: 19.0759, lng: 72.8780, onSite: true }, approval: 'approved' },
  { id: 'a15', employeeId: 'u9', employeeName: 'Mohan Das', avatar: 'MD', date: '2026-08-04', checkIn: '07:05', checkOut: '17:30', status: 'present', workingHours: 10.42, gps: { lat: 19.0760, lng: 72.8777, onSite: true }, approval: 'approved' },
];

export const weeklyAttendance = [
  { day: 'Mon', present: 7, absent: 1, late: 2 },
  { day: 'Tue', present: 8, absent: 0, late: 2 },
  { day: 'Wed', present: 6, absent: 2, late: 2 },
  { day: 'Thu', present: 7, absent: 1, late: 2 },
  { day: 'Fri', present: 5, absent: 2, late: 3 },
];
