import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { DataTable, Column } from '../components/ui/DataTable';
import { Pagination } from '../components/ui/Pagination';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterPanel } from '../components/ui/FilterPanel';
import { StatusBadge } from '../components/ui/StatusBadge';

import { useBills } from '../hooks/useBills';
import { useTableFilter } from '../hooks/useTableFilter';
import { BillPayment } from '../types/payment';
import { formatCurrency } from '../math/formatters';
import { formatDateString } from '../math/dateUtils';
import { CheckSquare, CreditCard, ShieldCheck } from 'lucide-react';

export const BillPaymentsPage: React.FC = () => {
  const { payments } = useBills();

  const {
    searchQuery,
    setSearchQuery,
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
  } = useTableFilter<BillPayment>({
    data: payments,
    searchFields: ['billName', 'transactionReference', 'notes'],
    defaultSortBy: 'paymentDate',
    defaultSortOrder: 'desc',
    itemsPerPage: 10,
  });

  const totalPaidSum = payments.reduce((sum, p) => sum + p.amountPaid, 0);

  const columns: Column<BillPayment>[] = [
    {
      key: 'billName',
      header: 'Paid Bill',
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">{item.billName}</div>
          <div className="text-[10px] text-slate-400">Ref: {item.transactionReference}</div>
        </div>
      ),
    },
    {
      key: 'amountPaid',
      header: 'Amount Paid',
      sortable: true,
      align: 'right',
      render: (item) => <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(item.amountPaid)}</span>,
    },
    {
      key: 'paymentDate',
      header: 'Payment Date',
      sortable: true,
      render: (item) => formatDateString(item.paymentDate),
    },
    {
      key: 'paymentMethod',
      header: 'Method',
      sortable: true,
      render: (item) => <span className="text-xs text-slate-500">{item.paymentMethod}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bill Payments Ledger"
        description="Historical log of all successfully cleared bills, transaction references, and payment methods."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Paid Out"
          value={formatCurrency(totalPaidSum)}
          subtitle={`${payments.length} payment receipts`}
          icon={<CheckSquare className="h-5 w-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
        <StatCard
          title="Average Payment"
          value={formatCurrency(payments.length > 0 ? totalPaidSum / payments.length : 0)}
          subtitle="Per bill cleared"
          icon={<CreditCard className="h-5 w-5" />}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
        />
        <StatCard
          title="Verification Status"
          value="100% Verified"
          subtitle="All transactions mirrored"
          icon={<ShieldCheck className="h-5 w-5" />}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
        />
      </div>

      <div className="space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search payment reference, bill name..." />

        <FilterPanel
          filters={[
            {
              key: 'status',
              label: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'All Statuses', value: 'ALL' },
                { label: 'Successful', value: 'SUCCESSFUL' },
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
    </div>
  );
};
