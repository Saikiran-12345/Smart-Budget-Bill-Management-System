import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { DataTable, Column } from '../components/ui/DataTable';
import { Pagination } from '../components/ui/Pagination';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterPanel } from '../components/ui/FilterPanel';
import { Badge } from '../components/ui/Badge';

import { useTransactions } from '../hooks/useTransactions';
import { useTableFilter } from '../hooks/useTableFilter';
import { UnifiedTransaction, TransactionType } from '../types/transaction';
import { formatCurrency } from '../math/formatters';
import { formatDateString } from '../math/dateUtils';
import { ListOrdered, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { transactions, totalTransactions } = useTransactions();

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
  } = useTableFilter<UnifiedTransaction>({
    data: transactions,
    searchFields: ['title', 'description', 'merchantOrBiller', 'category', 'referenceNumber'],
    defaultSortBy: 'date',
    defaultSortOrder: 'desc',
    itemsPerPage: 10,
  });

  const columns: Column<UnifiedTransaction>[] = [
    {
      key: 'title',
      header: 'Transaction Title',
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</div>
          <div className="text-[10px] text-slate-400">{item.description}</div>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
      render: (item) => {
        if (item.type === 'INCOME') return <Badge variant="success">INCOME</Badge>;
        if (item.type === 'EXPENSE') return <Badge variant="danger">EXPENSE</Badge>;
        if (item.type === 'BILL_PAYMENT') return <Badge variant="warning">BILL PAYMENT</Badge>;
        if (item.type === 'SAVINGS_DEPOSIT') return <Badge variant="info font-bold">SAVINGS</Badge>;
        return <Badge variant="neutral">{item.type}</Badge>;
      },
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      align: 'right',
      render: (item) => {
        const isCredit = item.type === 'INCOME';
        return (
          <span className={`font-bold ${isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
            {isCredit ? '+' : '-'}{formatCurrency(item.amount)}
          </span>
        );
      },
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      render: (item) => formatDateString(item.date),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (item) => <span className="text-xs text-slate-600 dark:text-slate-400">{item.category}</span>,
    },
    {
      key: 'paymentMethod',
      header: 'Method',
      render: (item) => <span className="text-xs text-slate-500">{item.paymentMethod || 'N/A'}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Unified Financial Ledger"
        description="Consolidated central record of all incomes, expenses, bill payments, and savings transactions."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Transactions"
          value={`${totalTransactions} Entries`}
          subtitle="Combined ledger size"
          icon={<ListOrdered className="h-5 w-5" />}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
        />
        <StatCard
          title="Credit Inflows"
          value={`${transactions.filter((t) => t.type === 'INCOME').length} Inflows`}
          subtitle="Income & deposits"
          icon={<ArrowUpRight className="h-5 w-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
        <StatCard
          title="Debit Outflows"
          value={`${transactions.filter((t) => t.type !== 'INCOME').length} Outflows`}
          subtitle="Expenses & bill payments"
          icon={<ArrowDownRight className="h-5 w-5" />}
          iconBgColor="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
        />
      </div>

      <div className="space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search unified transactions ledger..." />

        <FilterPanel
          filters={[
            {
              key: 'type',
              label: 'Transaction Type',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'All Types', value: 'ALL' },
                { label: 'Income', value: 'INCOME' },
                { label: 'Expense', value: 'EXPENSE' },
                { label: 'Bill Payment', value: 'BILL_PAYMENT' },
                { label: 'Savings Goal', value: 'SAVINGS_DEPOSIT' },
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
    </div>
  );
};
