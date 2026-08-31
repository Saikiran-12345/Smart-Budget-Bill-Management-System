import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { IncomeItem } from '../types/income';
import { ExpenseItem } from '../types/expense';
import { Category } from '../types/category';
import { BillItem } from '../types/bill';
import { BillPayment } from '../types/payment';
import { BudgetItem } from '../types/budget';
import { SavingsGoal, SavingsTransaction } from '../types/savings';
import { SystemSettings } from '../types/settings';

import { IncomeService } from '../services/incomeService';
import { ExpenseService } from '../services/expenseService';
import { CategoryService } from '../services/categoryService';
import { BillService } from '../services/billService';
import { PaymentService } from '../services/paymentService';
import { BudgetService } from '../services/budgetService';
import { SavingsService } from '../services/savingsService';
import { SettingsService } from '../services/settingsService';

interface AppContextType {
  incomes: IncomeItem[];
  expenses: ExpenseItem[];
  categories: Category[];
  bills: BillItem[];
  payments: BillPayment[];
  budgets: BudgetItem[];
  savingsGoals: SavingsGoal[];
  savingsTransactions: SavingsTransaction[];
  settings: SystemSettings;
  refreshAllData: () => void;
  updateSettings: (updates: Partial<SystemSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incomes, setIncomes] = useState<IncomeItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [bills, setBills] = useState<BillItem[]>([]);
  const [payments, setPayments] = useState<BillPayment[]>([]);
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [savingsTransactions, setSavingsTransactions] = useState<SavingsTransaction[]>([]);
  const [settings, setSettings] = useState<SystemSettings>(() => SettingsService.getSettings());

  const refreshAllData = useCallback(() => {
    setIncomes(IncomeService.getAll());
    setExpenses(ExpenseService.getAll());
    setCategories(CategoryService.getAll());
    setBills(BillService.getAll());
    setPayments(PaymentService.getAll());
    setBudgets(BudgetService.getAll());
    setSavingsGoals(SavingsService.getAllGoals());
    setSavingsTransactions(SavingsService.getAllTransactions());
    setSettings(SettingsService.getSettings());
  }, []);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  const updateSettings = (updates: Partial<SystemSettings>) => {
    const updated = SettingsService.updateSettings(updates);
    setSettings(updated);
  };

  return (
    <AppContext.Provider
      value={{
        incomes,
        expenses,
        categories,
        bills,
        payments,
        budgets,
        savingsGoals,
        savingsTransactions,
        settings,
        refreshAllData,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
