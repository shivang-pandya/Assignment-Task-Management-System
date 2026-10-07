import React from 'react';
import { HiOutlineSearch, HiOutlineX, HiOutlineViewList, HiOutlineViewBoards, HiOutlineSortAscending, HiOutlineSortDescending, HiOutlinePlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, SORT_OPTIONS } from '../../utils/constants';
import Button from '../common/Button';

export default function TaskFilters({ filters, updateFilters, viewMode, setViewMode }) {
  const navigate = useNavigate();
  const hasActiveFilters = filters.status || filters.priority || filters.search;

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineSearch className="h-4 w-4 text-zinc-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-10 py-2 border border-black/10 dark:border-white/10 rounded-lg bg-white dark:bg-[#121212] text-zinc-900 dark:text-white focus:ring-0 focus:border-black/20 dark:focus:border-white/20 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
          {filters.search && (
            <button
              onClick={() => updateFilters({ search: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              <HiOutlineX className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Actions right */}
        <div className="flex items-center space-x-2">
          <div className="bg-white dark:bg-[#121212] rounded-lg p-1 border border-black/10 dark:border-white/10 flex shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
              title="List View"
            >
              <HiOutlineViewList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'kanban' ? 'bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
              title="Kanban View"
            >
              <HiOutlineViewBoards className="w-4 h-4" />
            </button>
          </div>
          <Button onClick={() => navigate('/tasks/new')} icon={HiOutlinePlus}>
            Create Task
          </Button>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.status}
          onChange={(e) => updateFilters({ status: e.target.value })}
          className="block pl-3 pr-8 py-1.5 text-sm border border-black/10 dark:border-white/10 rounded-lg bg-white dark:bg-[#121212] text-zinc-900 dark:text-white focus:ring-0 focus:border-black/20 dark:focus:border-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <select
          value={filters.priority}
          onChange={(e) => updateFilters({ priority: e.target.value })}
          className="block pl-3 pr-8 py-1.5 text-sm border border-black/10 dark:border-white/10 rounded-lg bg-white dark:bg-[#121212] text-zinc-900 dark:text-white focus:ring-0 focus:border-black/20 dark:focus:border-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <option value="">All Priorities</option>
          {PRIORITY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <div className="flex items-center space-x-1 border border-black/10 dark:border-white/10 rounded-lg bg-white dark:bg-[#121212] pr-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilters({ sortBy: e.target.value })}
            className="block pl-3 pr-8 py-1.5 text-sm border-transparent bg-transparent text-zinc-900 dark:text-white focus:ring-0 focus:border-transparent"
          >
            {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>)}
          </select>
          <button
            onClick={() => updateFilters({ order: filters.order === 'asc' ? 'desc' : 'asc' })}
            className="p-1.5 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            title="Toggle sort order"
          >
            {filters.order === 'asc' ? <HiOutlineSortAscending className="w-4 h-4" /> : <HiOutlineSortDescending className="w-4 h-4" />}
          </button>
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => updateFilters({ status: '', priority: '', search: '' })}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline decoration-dotted"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
