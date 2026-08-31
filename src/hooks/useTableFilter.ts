import { useState, useMemo } from 'react';

export interface UseTableFilterProps<T> {
  data: T[];
  searchFields: (keyof T | string)[];
  defaultSortBy?: keyof T | string;
  defaultSortOrder?: 'asc' | 'desc';
  itemsPerPage?: number;
}

export function useTableFilter<T extends Record<string, any>>({
  data,
  searchFields,
  defaultSortBy,
  defaultSortOrder = 'desc',
  itemsPerPage = 10,
}: UseTableFilterProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<keyof T | string | undefined>(defaultSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(defaultSortOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredData = useMemo(() => {
    let result = [...data];

    // 1. Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        return searchFields.some((field) => {
          const val = item[field];
          if (val === null || val === undefined) return false;
          return String(val).toLowerCase().includes(q);
        });
      });
    }

    // 2. Category Filter
    if (categoryFilter !== 'ALL') {
      result = result.filter((item) => {
        const cat = item.category || item.categoryName;
        return cat && String(cat).toLowerCase() === categoryFilter.toLowerCase();
      });
    }

    // 3. Status Filter
    if (statusFilter !== 'ALL') {
      result = result.filter((item) => {
        return item.status && String(item.status).toLowerCase() === statusFilter.toLowerCase();
      });
    }

    // 4. Sorting
    if (sortBy) {
      const isDesc = sortOrder === 'desc';
      result.sort((a, b) => {
        let valA = a[sortBy] ?? '';
        let valB = b[sortBy] ?? '';

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return isDesc ? 1 : -1;
        if (valA > valB) return isDesc ? -1 : 1;
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, searchFields, categoryFilter, statusFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSort = (field: keyof T | string) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('ALL');
    setStatusFilter('ALL');
    setCurrentPage(1);
  };

  return {
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
    totalRecords: filteredData.length,
    filteredData,
    paginatedData,
    resetFilters,
  };
}
