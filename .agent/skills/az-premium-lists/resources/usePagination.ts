import { useMemo, useState } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  initialRowsPerPage?: number;
  filterFn?: (item: T, query: string) => boolean;
}

export function usePagination<T>({
  data,
  initialRowsPerPage = 10,
  filterFn,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);

  // Filtrage
  const filteredData = useMemo(() => {
    if (!searchQuery || !filterFn) return data;
    return data.filter((item) => filterFn(item, searchQuery));
  }, [data, searchQuery, filterFn]);

  // Tri
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  return {
    paginatedData,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    totalItems: sortedData.length,
    searchQuery,
    setSearchQuery,
    setSortConfig,
    sortConfig,
  };
}
