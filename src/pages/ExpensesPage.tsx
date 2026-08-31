import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { DataTable, Column } from '../components/ui/DataTable';
import { Pagination } from '../components/ui/Pagination';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterPanel } from '../components/ui/FilterPanel';
import { Button } from '../components/ui/Button';
import { ExpenseFormModal } from '../components/features/expense/ExpenseFormModal';

import { useExpenses } from '../hooks/useExpenses';
import { useTableFilter } from '../hooks/useTableFilter';
import { ExpenseItem } from '../types/expense';
import { formatCurrency } from '../math/formatters';
import { formatDateString } from '../math/dateUtils';
import { CreditCard, Plus, Edit2, Trash2, ShoppingCart, Award } from 'lucide-react';

export const ExpensesPage: React.FC = () => {
  const { expenses, totalExpenses, dailyAverage, largestExpense, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    sortOrder,
    handleSort,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    totalRecords,
    paginatedData,
    resetFilters,
  } = useTableFilter<ExpenseItem>({
    data: expenses,
    searchFields: ['title', 'description', 'merchant', 'category'],
    defaultSortBy: 'date',
    defaultSortOrder: 'desc',
    itemsPerPage: 10,
  });

  const columns: Column<ExpenseItem>[] = [
    {
      key: 'title',
      header: 'Expense Item',
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</div>
          {item.merchant && <div className="text-[10px] text-slate-400">Merchant: {item.merchant}</div>}
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (item) => <span className="rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 text-xs font-medium">{item.category}</span>,
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      align: 'right',
      render: (item) => <span className="font-bold text-red-600 dark:text-red-400">{formatCurrency(item.amount)}</span>,
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      render: (item) => formatDateString(item.date),
    },
    {
      key: 'paymentMethod',
      header: 'Payment Method',
      sortable: true,
      render: (item) => <span className="text-xs text-slate-500">{item.paymentMethod}</span>,
    },
    {
      key: 'taxDeductible',
      header: 'Tax Tag',
      render: (item) => item.taxDeductible ? <span className="rounded bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0.5 font-bold">Tax Deductible</span> : null,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (item) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setEditingExpense(item);
              setIsModalOpen(true);
            }}
            className="p-1 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete expense record "${item.title}"?`)) {
                deleteExpense(item.id);
              }
            }}
            className="p-1 text-slate-500 hover:text-red-600 dark:hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expense Management"
        description="Comprehensive audit of all daily purchases, bill transactions, and category spending."
        action={
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => {
              setEditingExpense(null);
              setIsModalOpen(true);
            }}
          >
            Record Expense
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Outflow"
          value={formatCurrency(totalExpenses)}
          subtitle={`${expenses.length} expense items`}
          icon={<CreditCard className="h-5 w-5" />}
          iconBgColor="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
        />
        <StatCard
          title="Daily Average Expense"
          value={formatCurrency(dailyAverage)}
          subtitle="30-day moving average"
          icon={<ShoppingCart className="h-5 w-5" />}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
        />
        <StatCard
          title="Largest Transaction"
          value={largestExpense ? formatCurrency(largestExpense.amount) : '₹0'}
          subtitle={largestExpense ? largestExpense.title : 'None'}
          icon={<Award className="h-5 w-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search expenses by title, merchant..." />
        </div>

        <FilterPanel
          filters={[
            {
              key: 'category',
              label: 'Category',
              value: categoryFilter,
              onChange: setCategoryFilter,
              options: [
                { label: 'All Categories', value: 'ALL' },
                { label: 'Food', value: 'Food' },
                { label: 'Housing', value: 'Housing' },
                { label: 'Utilities', value: 'Utilities' },
                { label: 'Travel', value: 'Travel' },
                { label: 'Shopping', value: 'Shopping' },
                { label: 'Healthcare', value: 'Healthcare' },
              ],
            },
            {
              key: 'status',
              label: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'All Statuses', value: 'ALL' },
                { label: 'Completed', value: 'COMPLETED' },
                { label: 'Pending', value: 'PENDING' },
              ],
            },
          ]}
          onReset={resetFilters}
        />

        <DataTable
          columns={columns}
          data={paginatedData}
          keyExtractor={(item) => item.id}
          sortBy={sortBy as string}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      <ExpenseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingExpense}
        onSubmit={(data) => {
          if (editingExpense) {
            updateExpense(editingExpense.id, data);
          } else {
            addExpense(data);
          }
        }}
      />
    </div>
  );
};
