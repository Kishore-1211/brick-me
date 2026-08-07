export type PayrollStatus = 'paid' | 'pending';

export interface PayrollRecord {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  baseSalary: number;
  // Auto-calculation components: Final = base + attendanceBonus + productivityIncentive - advance - penalty
  attendanceBonus: number;
  productivityIncentive: number;
  advance: number;
  penalty: number;
  // Kept for backward compatibility (allowances = bonuses, deductions = advance + penalty)
  allowances: number;
  deductions: number;
  netPay: number;
  month: string;
  status: PayrollStatus;
}

function build(
  id: string, employeeId: string, name: string, department: string, month: string, status: PayrollStatus,
  baseSalary: number, attendanceBonus: number, productivityIncentive: number, advance: number, penalty: number,
): PayrollRecord {
  const allowances = attendanceBonus + productivityIncentive;
  const deductions = advance + penalty;
  return {
    id, employeeId, name, department, month, status,
    baseSalary, attendanceBonus, productivityIncentive, advance, penalty,
    allowances, deductions, netPay: baseSalary + allowances - deductions,
  };
}

export const payroll: PayrollRecord[] = [
  build('p1', 'u1', 'Suresh Patel', 'Civil Works', '2026-08', 'pending', 45000, 2500, 1500, 2500, 1000),
  build('p2', 'u2', 'Ramesh Kumar', 'Civil Works', '2026-08', 'pending', 28000, 1500, 1000, 1500, 500),
  build('p3', 'u3', 'Dinesh Singh', 'Electrical', '2026-08', 'paid', 32000, 2000, 1000, 1500, 1000),
  build('p4', 'u4', 'Mahesh Yadav', 'Plumbing', '2026-08', 'paid', 30000, 1500, 1000, 1500, 500),
  build('p5', 'u5', 'Ganesh Gupta', 'Civil Works', '2026-08', 'pending', 29000, 1500, 1000, 1500, 500),
  build('p6', 'u6', 'Rajesh Nair', 'Safety & Compliance', '2026-08', 'paid', 38000, 2000, 1500, 2000, 1000),
  build('p7', 'u7', 'Vikram Sharma', 'Civil Works', '2026-08', 'pending', 31000, 1500, 1000, 1500, 500),
  build('p8', 'u8', 'Santosh Verma', 'Civil Works', '2026-08', 'paid', 18000, 1000, 500, 700, 300),
  build('p9', 'u9', 'Mohan Das', 'Electrical', '2026-08', 'pending', 42000, 2000, 1500, 2000, 1000),
  // July records
  build('p10', 'u1', 'Suresh Patel', 'Civil Works', '2026-07', 'paid', 45000, 2500, 1500, 2500, 1000),
  build('p11', 'u2', 'Ramesh Kumar', 'Civil Works', '2026-07', 'paid', 28000, 1500, 1000, 1500, 500),
  build('p12', 'u3', 'Dinesh Singh', 'Electrical', '2026-07', 'paid', 32000, 2000, 1000, 1500, 1000),
  build('p13', 'u4', 'Mahesh Yadav', 'Plumbing', '2026-07', 'paid', 30000, 1500, 1000, 1500, 500),
];
