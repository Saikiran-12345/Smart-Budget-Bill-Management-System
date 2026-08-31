import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { DataTable, Column } from '../components/ui/DataTable';
import { Pagination } from '../components/ui/Pagination';
import { SearchBar } from '../components/ui/SearchBar';
import { ActivityLogService } from '../services/activityLogService';
import { useTableFilter } from '../hooks/useTableFilter';
import { ActivityLogItem } from '../types/activity';
import { formatDateString } from '../math/dateUtils';
import { History, ShieldCheck } from 'lucide-react';

export const ActivityLogPage: React.FC = () => {
  const [logs] = useState<ActivityLogItem[]>(() => ActivityLogService.getAll());

  const {
    searchQuery,
    setSearchQuery,
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
  } = useTableFilter<ActivityLogItem>({
    data: logs,
    searchFields: ['action', 'module', 'description', 'userEmail'],
    defaultSortBy: 'timestamp',
    defaultSortOrder: 'desc',
    itemsPerPage: 10,
  });

  const columns: Column<ActivityLogItem>[] = [
    {
      key: 'action',
      header: 'Action Event',
      sortable: true,
      render: (item) => <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">{item.action}</span>,
    },
    {
      key: 'module',
      header: 'Module',
      sortable: true,
      render: (item) => <span className="rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 text-xs font-medium">{item.module}</span>,
    },
    {
      key: 'description',
      header: 'Description',
      render: (item) => <span className="text-xs text-slate-700 dark:text-slate-300">{item.description}</span>,
    },
    {
      key: 'userEmail',
      header: 'User',
      sortable: true,
      render: (item) => <span className="text-xs text-slate-500">{item.userEmail}</span>,
    },
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (item) => <span className="text-[10px] text-slate-400">{formatDateString(item.timestamp)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security & Activity Audit Log"
        description="Immutable local audit trail of all user actions, data mutations, logins, and backups."
      />

      <div className="space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search activity audit logs..." />

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
