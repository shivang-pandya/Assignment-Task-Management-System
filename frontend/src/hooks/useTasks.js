import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import useDebounce from './useDebounce';

export default function useTasks(initialFilters = {}) {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    sortBy: 'createdAt',
    order: 'desc',
    page: 1,
    limit: 10,
    ...initialFilters
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        ...filters,
        search: debouncedSearch
      };
      
      const response = await api.getTasks(params);
      if (response.success) {
        setTasks(response.data);
        setPagination(response.pagination);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.priority, filters.sortBy, filters.order, filters.page, filters.limit, debouncedSearch]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await api.getTaskStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: newFilters.page || 1 }));
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    fetchStats();
  };

  return {
    tasks,
    stats,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    refetchTasks: fetchTasks,
    refetchStats: fetchStats,
    removeTask
  };
}
