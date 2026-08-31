import { IncomeItem } from '../types/income';
import { ExpenseItem } from '../types/expense';
import { BillItem } from '../types/bill';
import { BudgetItem } from '../types/budget';
import { SavingsGoal } from '../types/savings';
import { FinancialReportData, ReportType } from '../types/report';
import { formatDateString } from './dateUtils';
import { formatCurrency } from './formatters';

export const generateFinancialReportData = (
  reportType: ReportType,
  startDate: string,
  endDate: string,
  data: {
    incomes: IncomeItem[];
    expenses: ExpenseItem[];
    bills: BillItem[];
    budgets: BudgetItem[];
    savingsGoals: SavingsGoal[];
  }
): FinancialReportData => {
  const reportId = `RPT-${Date.now()}`;
  const generatedAt = new Date().toISOString();

  let title = 'Financial Audit Report';
  let summaryMetrics: Record<string, number | string> = {};
  let tableColumns: string[] = [];
  let tableRows: Record<string, any>[] = [];
  let notes: string[] = [];

  if (reportType === 'INCOME_REPORT') {
    title = 'Income & Revenue Audit Report';
    const filteredIncomes = data.incomes.filter(
      (i) => i.date >= startDate && i.date <= endDate
    );
    const totalIncome = filteredIncomes.reduce((s, i) => s + i.amount, 0);

    summaryMetrics = {
      'Report Period': `${formatDateString(startDate)} to ${formatDateString(endDate)}`,
      'Total Records': filteredIncomes.length,
      'Total Income': formatCurrency(totalIncome),
      'Average Transaction': formatCurrency(filteredIncomes.length ? totalIncome / filteredIncomes.length : 0),
    };

    tableColumns = ['ID', 'Date', 'Source', 'Category', 'Amount', 'Frequency', 'Status'];
    tableRows = filteredIncomes.map((inc) => ({
      ID: inc.id,
      Date: formatDateString(inc.date),
      Source: inc.source,
      Category: inc.category,
      Amount: formatCurrency(inc.amount),
      Frequency: inc.frequency,
      Status: inc.status,
    }));
    notes.push('Income data verified from internal local receipts.');
  } else if (reportType === 'EXPENSE_REPORT') {
    title = 'Expense & Cash Outflow Report';
    const filteredExpenses = data.expenses.filter(
      (e) => e.date >= startDate && e.date <= endDate
    );
    const totalExpenses = filteredExpenses.reduce((s, e) => s + e.amount, 0);

    summaryMetrics = {
      'Report Period': `${formatDateString(startDate)} to ${formatDateString(endDate)}`,
      'Total Records': filteredExpenses.length,
      'Total Expenditure': formatCurrency(totalExpenses),
      'Tax Deductible Expenses': formatCurrency(filteredExpenses.filter((e) => e.taxDeductible).reduce((s, e) => s + e.amount, 0)),
    };

    tableColumns = ['ID', 'Date', 'Title', 'Category', 'Merchant', 'Payment Method', 'Amount'];
    tableRows = filteredExpenses.map((exp) => ({
      ID: exp.id,
      Date: formatDateString(exp.date),
      Title: exp.title,
      Category: exp.category,
      Merchant: exp.merchant || '-',
      'Payment Method': exp.paymentMethod,
      Amount: formatCurrency(exp.amount),
    }));
    notes.push('Includes all tax-deductible tagged transactions.');
  } else {
    // Default Audit Summary
    const totalInc = data.incomes.reduce((s, i) => s + i.amount, 0);
    const totalExp = data.expenses.reduce((s, e) => s + e.amount, 0);
    summaryMetrics = {
      'Gross Income': formatCurrency(totalInc),
      'Gross Expenses': formatCurrency(totalExp),
      'Net Cashflow': formatCurrency(totalInc - totalExp),
    };
    tableColumns = ['Module', 'Count', 'Status'];
    tableRows = [
      { Module: 'Income Records', Count: data.incomes.length, Status: 'Active' },
      { Module: 'Expense Records', Count: data.expenses.length, Status: 'Active' },
      { Module: 'Active Bills', Count: data.bills.length, Status: 'Active' },
      { Module: 'Savings Goals', Count: data.savingsGoals.length, Status: 'Active' },
    ];
  }

  return {
    header: {
      reportId,
      title,
      generatedAt: formatDateString(generatedAt),
      periodStart: formatDateString(startDate),
      periodEnd: formatDateString(endDate),
      generatedBy: 'Smart Budget System',
    },
    summaryMetrics,
    tableColumns,
    tableRows,
    notes,
  };
};
