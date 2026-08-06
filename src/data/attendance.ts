export type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
}

export const attendance: AttendanceRecord[] = [
  { id: 'a1', employeeId: 'u1', employeeName: 'Suresh Patel', date: '2026-08-05', checkIn: '07:02', checkOut: '17:05', status: 'present' },
  { id: 'a2', employeeId: 'u2', employeeName: 'Ramesh Kumar', date: '2026-08-05', checkIn: '07:45', checkOut: '17:30', status: 'late' },
  { id: 'a3', employeeId: 'u3', employeeName: 'Dinesh Singh', date: '2026-08-05', checkIn: '--', checkOut: '--', status: 'absent' },
  { id: 'a4', employeeId: 'u4', employeeName: 'Mahesh Yadav', date: '2026-08-05', checkIn: '06:55', checkOut: '16:58', status: 'present' },
  { id: 'a5', employeeId: 'u5', employeeName: 'Ganesh Gupta', date: '2026-08-05', checkIn: '--', checkOut: '--', status: 'leave' },
  { id: 'a6', employeeId: 'u6', employeeName: 'Rajesh Nair', date: '2026-08-05', checkIn: '07:00', checkOut: '17:10', status: 'present' },
  { id: 'a7', employeeId: 'u7', employeeName: 'Vikram Sharma', date: '2026-08-05', checkIn: '08:15', checkOut: '18:00', status: 'late' },
  { id: 'a8', employeeId: 'u8', employeeName: 'Santosh Verma', date: '2026-08-05', checkIn: '07:00', checkOut: '17:00', status: 'present' },
  { id: 'a9', employeeId: 'u9', employeeName: 'Mohan Das', date: '2026-08-05', checkIn: '06:50', checkOut: '17:05', status: 'present' },
  { id: 'a10', employeeId: 'u1', employeeName: 'Suresh Patel', date: '2026-08-04', checkIn: '07:10', checkOut: '17:00', status: 'present' },
  { id: 'a11', employeeId: 'u2', employeeName: 'Ramesh Kumar', date: '2026-08-04', checkIn: '07:00', checkOut: '16:55', status: 'present' },
  { id: 'a12', employeeId: 'u3', employeeName: 'Dinesh Singh', date: '2026-08-04', checkIn: '07:30', checkOut: '17:15', status: 'late' },
  { id: 'a13', employeeId: 'u4', employeeName: 'Mahesh Yadav', date: '2026-08-04', checkIn: '--', checkOut: '--', status: 'absent' },
  { id: 'a14', employeeId: 'u6', employeeName: 'Rajesh Nair', date: '2026-08-04', checkIn: '06:58', checkOut: '17:02', status: 'present' },
  { id: 'a15', employeeId: 'u9', employeeName: 'Mohan Das', date: '2026-08-04', checkIn: '07:05', checkOut: '17:30', status: 'present' },
];

export const weeklyAttendance = [
  { day: 'Mon', present: 7, absent: 1, late: 2 },
  { day: 'Tue', present: 8, absent: 0, late: 2 },
  { day: 'Wed', present: 6, absent: 2, late: 2 },
  { day: 'Thu', present: 7, absent: 1, late: 2 },
  { day: 'Fri', present: 5, absent: 2, late: 3 },
];
