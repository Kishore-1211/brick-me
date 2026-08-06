export type EmployeeStatus = 'active' | 'inactive';

export interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  email: string;
  phone: string;
  joinDate: string;
  salary: number;
  status: EmployeeStatus;
  avatar: string;
}

export const users: Employee[] = [
  { id: 'u1', name: 'Suresh Patel', department: 'Civil Works', role: 'Foreman', email: 'suresh@brickme.io', phone: '+91 98765 11001', joinDate: '2020-03-10', salary: 45000, status: 'active', avatar: 'SP' },
  { id: 'u2', name: 'Ramesh Kumar', department: 'Civil Works', role: 'Mason', email: 'ramesh@brickme.io', phone: '+91 87654 22002', joinDate: '2021-06-15', salary: 28000, status: 'active', avatar: 'RK' },
  { id: 'u3', name: 'Dinesh Singh', department: 'Electrical', role: 'Electrician', email: 'dinesh@brickme.io', phone: '+91 76543 33003', joinDate: '2022-01-20', salary: 32000, status: 'active', avatar: 'DS' },
  { id: 'u4', name: 'Mahesh Yadav', department: 'Plumbing', role: 'Plumber', email: 'mahesh@brickme.io', phone: '+91 65432 44004', joinDate: '2021-09-05', salary: 30000, status: 'active', avatar: 'MY' },
  { id: 'u5', name: 'Ganesh Gupta', department: 'Civil Works', role: 'Carpenter', email: 'ganesh@brickme.io', phone: '+91 54321 55005', joinDate: '2022-04-18', salary: 29000, status: 'active', avatar: 'GG' },
  { id: 'u6', name: 'Rajesh Nair', department: 'Safety & Compliance', role: 'Safety Officer', email: 'rnair@brickme.io', phone: '+91 43210 66006', joinDate: '2020-11-01', salary: 38000, status: 'active', avatar: 'RN' },
  { id: 'u7', name: 'Vikram Sharma', department: 'Civil Works', role: 'Welder', email: 'vikram@brickme.io', phone: '+91 32109 77007', joinDate: '2023-02-14', salary: 31000, status: 'active', avatar: 'VS' },
  { id: 'u8', name: 'Santosh Verma', department: 'Civil Works', role: 'Helper', email: 'santosh@brickme.io', phone: '+91 21098 88008', joinDate: '2023-07-01', salary: 18000, status: 'active', avatar: 'SV' },
  { id: 'u9', name: 'Mohan Das', department: 'Electrical', role: 'Crane Operator', email: 'mohan@brickme.io', phone: '+91 10987 99009', joinDate: '2021-12-10', salary: 42000, status: 'active', avatar: 'MD' },
  { id: 'u10', name: 'Anil Tiwari', department: 'Site Administration', role: 'Store Keeper', email: 'anil@brickme.io', phone: '+91 09876 10010', joinDate: '2022-08-22', salary: 22000, status: 'inactive', avatar: 'AT' },
];
