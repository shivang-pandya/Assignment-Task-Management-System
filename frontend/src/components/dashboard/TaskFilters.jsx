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
            <HiOutlineSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500 text-sm"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
          {filters.search && (
            <button
              onClick={() => updateFilters({ search: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <HiOutlineX className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Actions right */}
        <div className="flex items-center space-x-2">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-1 border border-gray-300 dark:border-slate-700 flex">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              title="List View"
            >
              <HiOutlineViewList className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md ${viewMode === 'kanban' ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              title="Kanban View"
            >
              <HiOutlineViewBoards className="w-5 h-5" />
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
          className="block pl-3 pr-8 py-1.5 text-sm border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <select
          value={filters.priority}
          onChange={(e) => updateFilters({ priority: e.target.value })}
          className="block pl-3 pr-8 py-1.5 text-sm border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Priorities</option>
          {PRIORITY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <div className="flex items-center space-x-1 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 pr-1">
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilters({ sortBy: e.target.value })}
            className="block pl-3 pr-8 py-1.5 text-sm border-transparent bg-transparent text-gray-900 dark:text-white focus:ring-0 focus:border-transparent"
          >
            {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>)}
          </select>
          <button
            onClick={() => updateFilters({ order: filters.order === 'asc' ? 'desc' : 'asc' })}
            className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Toggle sort order"
          >
            {filters.order === 'asc' ? <HiOutlineSortAscending className="w-5 h-5" /> : <HiOutlineSortDescending className="w-5 h-5" />}
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
