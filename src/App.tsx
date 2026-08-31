import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { AppProvider } from './context/AppContext';

import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { ErrorBoundary } from './components/layout/ErrorBoundary';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { IncomePage } from './pages/IncomePage';
import { ExpensesPage } from './pages/ExpensesPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BillsPage } from './pages/BillsPage';
import { BillPaymentsPage } from './pages/BillPaymentsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { BudgetPage } from './pages/BudgetPage';
import { SavingsPage } from './pages/SavingsPage';
import { FIREPlannerPage } from './pages/FIREPlannerPage';
import { LoansAndDebtsPage } from './pages/LoansAndDebtsPage';
import { RealEstateROIPage } from './pages/RealEstateROIPage';
import { RentVsBuyPage } from './pages/RentVsBuyPage';
import { PresumptiveTaxPage } from './pages/PresumptiveTaxPage';
import { CollegeFundPlannerPage } from './pages/CollegeFundPlannerPage';
import { SalaryCalculatorPage } from './pages/SalaryCalculatorPage';
import { TaxCalculatorPage } from './pages/TaxCalculatorPage';
import { CryptoYieldPage } from './pages/CryptoYieldPage';
import { DebtConsolidationPage } from './pages/DebtConsolidationPage';
import { VacationPlannerPage } from './pages/VacationPlannerPage';
import { SummaryPage } from './pages/SummaryPage';
import { CalendarPage } from './pages/CalendarPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ReportsPage } from './pages/ReportsPage';
import { DataManagementPage } from './pages/DataManagementPage';
import { SettingsPage } from './pages/SettingsPage';
import { ActivityLogPage } from './pages/ActivityLogPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <AppProvider>
              <Router>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedLayout>
                        <Navigate to="/dashboard" replace />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedLayout>
                        <DashboardPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/income"
                    element={
                      <ProtectedLayout>
                        <IncomePage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/expenses"
                    element={
                      <ProtectedLayout>
                        <ExpensesPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/categories"
                    element={
                      <ProtectedLayout>
                        <CategoriesPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/bills"
                    element={
                      <ProtectedLayout>
                        <BillsPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/bill-payments"
                    element={
                      <ProtectedLayout>
                        <BillPaymentsPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/transactions"
                    element={
                      <ProtectedLayout>
                        <TransactionsPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/budgets"
                    element={
                      <ProtectedLayout>
                        <BudgetPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/savings"
                    element={
                      <ProtectedLayout>
                        <SavingsPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/fire"
                    element={
                      <ProtectedLayout>
                        <FIREPlannerPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/loans"
                    element={
                      <ProtectedLayout>
                        <LoansAndDebtsPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/real-estate"
                    element={
                      <ProtectedLayout>
                        <RealEstateROIPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/rent-vs-buy"
                    element={
                      <ProtectedLayout>
                        <RentVsBuyPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/presumptive-tax"
                    element={
                      <ProtectedLayout>
                        <PresumptiveTaxPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/college-fund"
                    element={
                      <ProtectedLayout>
                        <CollegeFundPlannerPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/salary-calc"
                    element={
                      <ProtectedLayout>
                        <SalaryCalculatorPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/tax-calc"
                    element={
                      <ProtectedLayout>
                        <TaxCalculatorPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/crypto-yield"
                    element={
                      <ProtectedLayout>
                        <CryptoYieldPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/debt-consolidation"
                    element={
                      <ProtectedLayout>
                        <DebtConsolidationPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/vacation-planner"
                    element={
                      <ProtectedLayout>
                        <VacationPlannerPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/summary"
                    element={
                      <ProtectedLayout>
                        <SummaryPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/calendar"
                    element={
                      <ProtectedLayout>
                        <CalendarPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/notifications"
                    element={
                      <ProtectedLayout>
                        <NotificationsPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <ProtectedLayout>
                        <AnalyticsPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedLayout>
                        <ReportsPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/data-management"
                    element={
                      <ProtectedLayout>
                        <DataManagementPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/activity-log"
                    element={
                      <ProtectedLayout>
                        <ActivityLogPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedLayout>
                        <SettingsPage />
                      </ProtectedLayout>
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Router>
            </AppProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
