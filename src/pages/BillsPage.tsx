import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { DataTable, Column } from '../components/ui/DataTable';
import { Pagination } from '../components/ui/Pagination';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterPanel } from '../components/ui/FilterPanel';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { BillFormModal } from '../components/features/bill/BillFormModal';
import { BillPaymentModal } from '../components/features/bill/BillPaymentModal';

import { useBills } from '../hooks/useBills';
import { useTableFilter } from '../hooks/useTableFilter';
import { BillItem } from '../types/bill';
import { formatCurrency } from '../math/formatters';
import { formatDateString } from '../math/dateUtils';
import { Receipt, Plus, Edit2, Trash2, CheckCircle2, AlertOctagon } from 'lucide-react';

export const BillsPage: React.FC = () => {
  const { bills, totalBillsAmount, overdueBills, upcomingBills, addBill, updateBill, deleteBill, payBill } = useBills();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState<BillItem | null>(null);
  const [selectedBillToPay, setSelectedBillToPay] = useState<BillItem | null>(null);

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
  } = useTableFilter<BillItem>({
    data: bills,
    searchFields: ['billName', 'billerName', 'notes', 'accountNumber'],
    defaultSortBy: 'dueDate',
    defaultSortOrder: 'asc',
    itemsPerPage: 10,
  });

  const columns: Column<BillItem>[] = [
    {
      key: 'billName',
      header: 'Bill Name & Vendor',
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">{item.billName}</div>
          <div className="text-[10px] text-slate-400">{item.billerName}</div>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      align: 'right',
      render: (item) => <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(item.amount)}</span>,
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (item) => formatDateString(item.dueDate),
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
          {item.status !== 'PAID' && (
            <Button
              variant="success"
              size="sm"
              icon={<CheckCircle2 className="h-3.5 w-3.5" />}
              onClick={() => {
                setSelectedBillToPay(item);
                setIsPayModalOpen(true);
              }}
            >
              Pay
            </Button>
          )}
          <button
            onClick={() => {
              setEditingBill(item);
              setIsModalOpen(true);
            }}
            className="p-1 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete bill reminder "${item.billName}"?`)) {
                deleteBill(item.id);
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
        title="Bill Management"
        description="Schedule upcoming due bills, recurring utility payments, and track overdue alerts."
        action={
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => {
              setEditingBill(null);
              setIsModalOpen(true);
            }}
          >
            Schedule New Bill
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Scheduled Bills"
          value={formatCurrency(totalBillsAmount)}
          subtitle={`${bills.length} total bill items`}
          icon={<Receipt className="h-5 w-5" />}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
        />
        <StatCard
          title="Overdue Bills"
          value={`${overdueBills.length} Bills`}
          subtitle="Immediate payment needed"
          icon={<AlertOctagon className="h-5 w-5" />}
          iconBgColor="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
        />
        <StatCard
          title="Due in 7 Days"
          value={`${upcomingBills.length} Bills`}
          subtitle="Upcoming reminders"
          icon={<Receipt className="h-5 w-5" />}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search bills by name, vendor..." />
        </div>

        <FilterPanel
          filters={[
            {
              key: 'status',
              label: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'All Statuses', value: 'ALL' },
                { label: 'Upcoming', value: 'UPCOMING' },
                { label: 'Pending', value: 'PENDING' },
                { label: 'Paid', value: 'PAID' },
                { label: 'Overdue', value: 'OVERDUE' },
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

      <BillFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingBill}
        onSubmit={(data) => {
          if (editingBill) {
            updateBill(editingBill.id, data);
          } else {
            addBill(data);
          }
        }}
      />

      <BillPaymentModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        bill={selectedBillToPay}
        onPay={(billId, amount, method, ref, notes) => {
          payBill(billId, amount, method, ref, notes);
        }}
      />
    </div>
  );
};
