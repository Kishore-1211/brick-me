export type PayrollStatus = 'paid' | 'pending';

export interface PayrollRecord {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  month: string;
  status: PayrollStatus;
}

export const payroll: PayrollRecord[] = [
  { id: 'p1', employeeId: 'u1', name: 'Suresh Patel', department: 'Civil Works', baseSalary: 45000, allowances: 4000, deductions: 3500, netPay: 45500, month: '2026-08', status: 'pending' },
  { id: 'p2', employeeId: 'u2', name: 'Ramesh Kumar', department: 'Civil Works', baseSalary: 28000, allowances: 2500, deductions: 2000, netPay: 28500, month: '2026-08', status: 'pending' },
  { id: 'p3', employeeId: 'u3', name: 'Dinesh Singh', department: 'Electrical', baseSalary: 32000, allowances: 3000, deductions: 2500, netPay: 32500, month: '2026-08', status: 'paid' },
  { id: 'p4', employeeId: 'u4', name: 'Mahesh Yadav', department: 'Plumbing', baseSalary: 30000, allowances: 2500, deductions: 2000, netPay: 30500, month: '2026-08', status: 'paid' },
  { id: 'p5', employeeId: 'u5', name: 'Ganesh Gupta', department: 'Civil Works', baseSalary: 29000, allowances: 2500, deductions: 2000, netPay: 29500, month: '2026-08', status: 'pending' },
  { id: 'p6', employeeId: 'u6', name: 'Rajesh Nair', department: 'Safety & Compliance', baseSalary: 38000, allowances: 3500, deductions: 3000, netPay: 38500, month: '2026-08', status: 'paid' },
  { id: 'p7', employeeId: 'u7', name: 'Vikram Sharma', department: 'Civil Works', baseSalary: 31000, allowances: 2500, deductions: 2000, netPay: 31500, month: '2026-08', status: 'pending' },
  { id: 'p8', employeeId: 'u8', name: 'Santosh Verma', department: 'Civil Works', baseSalary: 18000, allowances: 1500, deductions: 1000, netPay: 18500, month: '2026-08', status: 'paid' },
  { id: 'p9', employeeId: 'u9', name: 'Mohan Das', department: 'Electrical', baseSalary: 42000, allowances: 3500, deductions: 3000, netPay: 42500, month: '2026-08', status: 'pending' },
  // July records
  { id: 'p10', employeeId: 'u1', name: 'Suresh Patel', department: 'Civil Works', baseSalary: 45000, allowances: 4000, deductions: 3500, netPay: 45500, month: '2026-07', status: 'paid' },
  { id: 'p11', employeeId: 'u2', name: 'Ramesh Kumar', department: 'Civil Works', baseSalary: 28000, allowances: 2500, deductions: 2000, netPay: 28500, month: '2026-07', status: 'paid' },
  { id: 'p12', employeeId: 'u3', name: 'Dinesh Singh', department: 'Electrical', baseSalary: 32000, allowances: 3000, deductions: 2500, netPay: 32500, month: '2026-07', status: 'paid' },
  { id: 'p13', employeeId: 'u4', name: 'Mahesh Yadav', department: 'Plumbing', baseSalary: 30000, allowances: 2500, deductions: 2000, netPay: 30500, month: '2026-07', status: 'paid' },
];
