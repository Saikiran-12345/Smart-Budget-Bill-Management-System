import { IncomeItem } from '../types/income';
import { ExpenseItem } from '../types/expense';
import { BillItem } from '../types/bill';
import { SavingsGoal } from '../types/savings';

export const ENTERPRISE_SAMPLE_INCOMES: IncomeItem[] = [
  { id: 'inc-101', source: 'Acme Corp Tech Salary', amount: 185000, date: '2026-08-01', category: 'Salary', description: 'Primary monthly salary payout', frequency: 'MONTHLY', status: 'RECEIVED', isRecurring: true, createdAt: '2026-08-01', updatedAt: '2026-08-01' },
  { id: 'inc-102', source: 'Upwork UI Consulting', amount: 45000, date: '2026-08-10', category: 'Freelance', description: 'Client mobile app design retainer', frequency: 'ONE_TIME', status: 'RECEIVED', isRecurring: false, createdAt: '2026-08-10', updatedAt: '2026-08-10' },
  { id: 'inc-103', source: 'HDFC Bank FD Interest', amount: 8500, date: '2026-08-15', category: 'Interest', description: 'Quarterly FD interest credit', frequency: 'QUARTERLY', status: 'RECEIVED', isRecurring: true, createdAt: '2026-08-15', updatedAt: '2026-08-15' },
  { id: 'inc-104', source: 'Residential Flat Rental', amount: 32000, date: '2026-08-05', category: 'Rental Income', description: '2BHK Apartment rent tenant credit', frequency: 'MONTHLY', status: 'RECEIVED', isRecurring: true, createdAt: '2026-08-05', updatedAt: '2026-08-05' },
  { id: 'inc-105', source: 'TCS Dividend Payout', amount: 6400, date: '2026-08-20', category: 'Dividends', description: 'Interim dividend yield credit', frequency: 'ONE_TIME', status: 'RECEIVED', isRecurring: false, createdAt: '2026-08-20', updatedAt: '2026-08-20' },
];

export const ENTERPRISE_SAMPLE_EXPENSES: ExpenseItem[] = [
  { id: 'exp-201', title: 'DLF Apartment Rent', amount: 38000, date: '2026-08-02', category: 'Housing', paymentMethod: 'Net Banking', description: 'Monthly flat rent payout', status: 'COMPLETED', createdAt: '2026-08-02', updatedAt: '2026-08-02' },
  { id: 'exp-202', title: 'Nature Basket Supermarket', amount: 6400, date: '2026-08-04', category: 'Groceries', paymentMethod: 'Credit Card', description: 'Weekly gourmet grocery refill', status: 'COMPLETED', createdAt: '2026-08-04', updatedAt: '2026-08-04' },
  { id: 'exp-203', title: 'Shell Petrol Station', amount: 3200, date: '2026-08-06', category: 'Transportation', paymentMethod: 'UPI', description: 'Hyundai Creta fuel tank fill', status: 'COMPLETED', createdAt: '2026-08-06', updatedAt: '2026-08-06' },
  { id: 'exp-204', title: 'Netflix 4K Premium', amount: 649, date: '2026-08-08', category: 'Subscriptions', paymentMethod: 'Credit Card', description: 'Monthly video streaming auto debit', status: 'COMPLETED', createdAt: '2026-08-08', updatedAt: '2026-08-08' },
  { id: 'exp-205', title: 'Apollo Pharmacy Meds', amount: 1850, date: '2026-08-12', category: 'Healthcare', paymentMethod: 'UPI', description: 'Monthly vitamins & health prescription', status: 'COMPLETED', createdAt: '2026-08-12', updatedAt: '2026-08-12' },
  { id: 'exp-206', title: 'Cult.Fit Gym Pass', amount: 2500, date: '2026-08-14', category: 'Fitness', paymentMethod: 'Credit Card', description: 'Monthly fitness center membership', status: 'COMPLETED', createdAt: '2026-08-14', updatedAt: '2026-08-14' },
  { id: 'exp-207', title: 'Toit Craft Brewery', amount: 4800, date: '2026-08-18', category: 'Dining Out', paymentMethod: 'Credit Card', description: 'Weekend dinner with team', status: 'COMPLETED', createdAt: '2026-08-18', updatedAt: '2026-08-18' },
];

export const ENTERPRISE_SAMPLE_BILLS: BillItem[] = [
  { id: 'bill-301', billName: 'HDFC Home Loan EMI', billerName: 'HDFC Bank Ltd.', category: 'Debt Payment', amount: 42500, dueDate: '2026-09-05', frequency: 'MONTHLY', status: 'UPCOMING', autoPay: true, reminderDaysBefore: 3, createdAt: '2026-08-01', updatedAt: '2026-08-01' },
  { id: 'bill-302', billName: 'BESCOM Electricity Bill', billerName: 'BESCOM', category: 'Utilities', amount: 3450, dueDate: '2026-09-10', frequency: 'MONTHLY', status: 'UPCOMING', autoPay: false, reminderDaysBefore: 5, createdAt: '2026-08-01', updatedAt: '2026-08-01' },
  { id: 'bill-303', billName: 'Airtel Fiber Broadband', billerName: 'Airtel', category: 'Utilities', amount: 1179, dueDate: '2026-09-12', frequency: 'MONTHLY', status: 'UPCOMING', autoPay: true, reminderDaysBefore: 2, createdAt: '2026-08-01', updatedAt: '2026-08-01' },
  { id: 'bill-304', billName: 'Care Health Insurance Premium', billerName: 'Care Insurance', category: 'Insurance', amount: 28500, dueDate: '2026-09-25', frequency: 'YEARLY', status: 'UPCOMING', autoPay: false, reminderDaysBefore: 15, createdAt: '2026-08-01', updatedAt: '2026-08-01' },
];

export const ENTERPRISE_SAMPLE_GOALS: SavingsGoal[] = [
  { id: 'goal-401', goalName: '6-Month Emergency Buffer', category: 'Emergency Fund', targetAmount: 360000, currentAmount: 240000, startDate: '2026-01-01', targetDate: '2026-12-31', priority: 'HIGH', status: 'IN_PROGRESS', monthlyTargetContribution: 20000, createdAt: '2026-01-01', updatedAt: '2026-08-01' },
  { id: 'goal-402', goalName: 'Japan Spring Vacation 2027', category: 'Travel', targetAmount: 250000, currentAmount: 120000, startDate: '2026-03-01', targetDate: '2027-04-01', priority: 'MEDIUM', status: 'IN_PROGRESS', monthlyTargetContribution: 15000, createdAt: '2026-03-01', updatedAt: '2026-08-01' },
];
