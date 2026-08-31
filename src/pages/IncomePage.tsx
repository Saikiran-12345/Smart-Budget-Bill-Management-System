import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { DataTable, Column } from '../components/ui/DataTable';
import { Pagination } from '../components/ui/Pagination';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterPanel } from '../components/ui/FilterPanel';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { IncomeFormModal } from '../components/features/income/IncomeFormModal';

import { useIncome } from '../hooks/useIncome';
import { useTableFilter } from '../hooks/useTableFilter';
import { IncomeItem } from '../types/income';
import { formatCurrency } from '../math/formatters';
import { formatDateString } from '../math/dateUtils';
import { TrendingUp, Plus, Edit2, Trash2, Calendar, DollarSign } from 'lucide-react';

export const IncomePage: React.FC = () => {
  const { incomes, totalIncome, projectedAnnualIncome, addIncome, updateIncome, deleteIncome } = useIncome();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState<IncomeItem | null>(null);

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
  } = useTableFilter<IncomeItem>({
    data: incomes,
    searchFields: ['source', 'description', 'referenceNumber', 'category'],
    defaultSortBy: 'date',
    defaultSortOrder: 'desc',
    itemsPerPage: 10,
  });

  const columns: Column<IncomeItem>[] = [
    {
      key: 'source',
      header: 'Income Source',
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">{item.source}</div>
          {item.referenceNumber && <div className="text-[10px] text-slate-400">Ref: {item.referenceNumber}</div>}
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (item) => <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 text-xs font-medium">{item.category}</span>,
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      align: 'right',
      render: (item) => <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(item.amount)}</span>,
    },
    {
      key: 'date',
      header: 'Credit Date',
      sortable: true,
      render: (item) => formatDateString(item.date),
    },
    {
      key: 'frequency',
      header: 'Frequency',
      sortable: true,
      render: (item) => <span className="text-xs text-slate-500">{item.frequency}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (item) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setEditingIncome(item);
              setIsModalOpen(true);
            }}
            className="p-1 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete income record from ${item.source}?`)) {
                deleteIncome(item.id);
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
        title="Income Management"
        description="Track all salary credits, freelance earnings, investments, bonuses, and side hustles."
        action={
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => {
              setEditingIncome(null);
              setIsModalOpen(true);
            }}
          >
            Add New Income
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Recorded Income"
          value={formatCurrency(totalIncome)}
          subtitle={`${incomes.length} total entries`}
          icon={<TrendingUp className="h-5 w-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
        <StatCard
          title="Projected Annualized"
          value={formatCurrency(projectedAnnualIncome)}
          subtitle="Based on recurring schedules"
          icon={<DollarSign className="h-5 w-5" />}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
        />
        <StatCard
          title="Average Credit"
          value={formatCurrency(incomes.length > 0 ? totalIncome / incomes.length : 0)}
          subtitle="Per income entry"
          icon={<Calendar className="h-5 w-5" />}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search income source, ref #..." />
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
                { label: 'Salary', value: 'Salary' },
                { label: 'Freelance', value: 'Freelance' },
                { label: 'Business', value: 'Business' },
                { label: 'Bonus', value: 'Bonus' },
                { label: 'Investment', value: 'Investment' },
              ],
            },
            {
              key: 'status',
              label: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'All Statuses', value: 'ALL' },
                { label: 'Received', value: 'RECEIVED' },
                { label: 'Pending', value: 'PENDING' },
                { label: 'Scheduled', value: 'SCHEDULED' },
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

      <IncomeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingIncome}
        onSubmit={(data) => {
          if (editingIncome) {
            updateIncome(editingIncome.id, data);
          } else {
            addIncome(data);
          }
        }}
      />
    </div>
  );
};
