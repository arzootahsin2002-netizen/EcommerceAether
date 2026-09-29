'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Download,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckSquare,
  Square
} from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  accessor?: (row: T) => any;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  title?: string;
  searchPlaceholder?: string;
  searchFilter?: (row: T, query: string) => boolean;
  filterComponent?: React.ReactNode;
  onRowClick?: (row: T) => void;
  bulkActions?: {
    label: string;
    action: (selectedRows: T[]) => void;
    variant?: 'default' | 'danger';
  }[];
  exportFilename?: string;
  defaultRowsPerPage?: number;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
  rightAction?: React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  title,
  searchPlaceholder = 'Search records...',
  searchFilter,
  filterComponent,
  onRowClick,
  bulkActions,
  exportFilename = 'aether_export',
  defaultRowsPerPage = 10,
  emptyStateTitle = 'No records found',
  emptyStateMessage = 'Try adjusting your search criteria or resetting filters.',
  rightAction
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Search filtering
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    if (searchFilter) {
      return data.filter((row) => searchFilter(row, searchQuery.toLowerCase()));
    }
    return data.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery, searchFilter]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valA = col.accessor ? col.accessor(a) : (a as any)[sortKey];
      const valB = col.accessor ? col.accessor(b) : (b as any)[sortKey];

      if (valA === valB) return 0;
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
      if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection, columns]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / rowsPerPage));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSort = (key: string, sortable?: boolean) => {
    if (sortable === false) return;
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedData.length && paginatedData.length > 0) {
      setSelectedIds(new Set());
    } else {
      const newSet = new Set<string>();
      paginatedData.forEach((row) => newSet.add(keyExtractor(row)));
      setSelectedIds(newSet);
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleExportCSV = () => {
    if (sortedData.length === 0) return;
    const headers = columns.map((c) => `"${c.header}"`).join(',');
    const rows = sortedData.map((row) =>
      columns
        .map((c) => {
          const val = c.accessor ? c.accessor(row) : (row as any)[c.key];
          return `"${String(val ?? '').replace(/"/g, '""')}"`;
        })
        .join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${exportFilename}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedRowsList = useMemo(() => {
    return data.filter((row) => selectedIds.has(keyExtractor(row)));
  }, [data, selectedIds, keyExtractor]);

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs overflow-hidden">
      
      {/* Table Control Header */}
      <div className="p-4 sm:p-5 border-b border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-3">
          {title && (
            <h3 className="text-base font-bold font-serif text-zinc-950 mr-2">
              {title}
            </h3>
          )}

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-8 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-400 outline-none transition-all"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Custom Filter Slot */}
          {filterComponent}
        </div>

        {/* Right Actions & Export */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {rightAction}

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            title="Export to CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Bulk Action Bar if items selected */}
      {selectedIds.size > 0 && bulkActions && bulkActions.length > 0 && (
        <div className="bg-zinc-900 text-white px-5 py-2.5 flex items-center justify-between text-xs animate-fadeIn">
          <span className="font-bold">
            {selectedIds.size} {selectedIds.size === 1 ? 'row' : 'rows'} selected
          </span>
          <div className="flex items-center gap-2">
            {bulkActions.map((ba, idx) => (
              <button
                key={idx}
                onClick={() => {
                  ba.action(selectedRowsList);
                  setSelectedIds(new Set());
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  ba.variant === 'danger'
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                }`}
              >
                {ba.label}
              </button>
            ))}
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-zinc-400 hover:text-white px-2 py-1 text-[11px]"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-zinc-50/75 border-b border-zinc-100 text-zinc-500 font-bold uppercase tracking-wider text-[11px]">
              
              {bulkActions && (
                <th className="w-10 px-4 py-3.5">
                  <button
                    onClick={toggleSelectAll}
                    className="text-zinc-400 hover:text-zinc-800"
                  >
                    {selectedIds.size > 0 && selectedIds.size === paginatedData.length ? (
                      <CheckSquare className="w-4 h-4 text-zinc-900" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
              )}

              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key, col.sortable)}
                  className={`px-4 py-3.5 select-none whitespace-nowrap ${
                    col.sortable !== false ? 'cursor-pointer hover:text-zinc-950' : ''
                  } ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable !== false && (
                      <span className="text-zinc-400">
                        {sortKey === col.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-zinc-950" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-zinc-950" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3 h-3 text-zinc-300" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => {
                const id = keyExtractor(row);
                const isSelected = selectedIds.has(id);
                return (
                  <tr
                    key={id}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`hover:bg-zinc-50/80 transition-colors ${
                      onRowClick ? 'cursor-pointer' : ''
                    } ${isSelected ? 'bg-amber-50/40' : ''}`}
                  >
                    {bulkActions && (
                      <td className="px-4 py-3.5">
                        <button
                          onClick={(e) => toggleSelectRow(id, e)}
                          className="text-zinc-400 hover:text-zinc-800"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-zinc-900" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    )}

                    {columns.map((col) => (
                      <td key={col.key} className={`px-4 py-3.5 text-zinc-800 ${col.className || ''}`}>
                        {col.render
                          ? col.render(row)
                          : col.accessor
                          ? col.accessor(row)
                          : (row as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (bulkActions ? 1 : 0)}
                  className="py-16 text-center text-zinc-500"
                >
                  <div className="max-w-xs mx-auto space-y-2">
                    <Filter className="w-8 h-8 text-zinc-300 mx-auto stroke-1" />
                    <h4 className="text-sm font-bold text-zinc-800">{emptyStateTitle}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{emptyStateMessage}</p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-2 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Reset Search Filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <span>
            Showing{' '}
            <strong className="text-zinc-900">
              {sortedData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}
            </strong>{' '}
            to{' '}
            <strong className="text-zinc-900">
              {Math.min(currentPage * rowsPerPage, sortedData.length)}
            </strong>{' '}
            of <strong className="text-zinc-900">{sortedData.length}</strong> records
          </span>

          <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-200">
            <span>Rows:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-white border border-zinc-200 rounded-md font-semibold text-zinc-800 outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-zinc-200 hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-3 py-1 bg-white rounded-lg border border-zinc-200 font-bold text-zinc-900">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-zinc-200 hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
