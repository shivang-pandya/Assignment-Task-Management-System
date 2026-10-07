import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTasks from '../hooks/useTasks';
import * as api from '../services/api';
import StatsCards from '../components/dashboard/StatsCards';
import TaskFilters from '../components/dashboard/TaskFilters';
import TaskList from '../components/dashboard/TaskList';
import KanbanBoard from '../components/dashboard/KanbanBoard';
import Pagination from '../components/common/Pagination';
import ConfirmDialog from '../components/common/ConfirmDialog';

export default function Dashboard() {
  const { tasks, stats, loading, error, pagination, filters, updateFilters, refetchTasks, refetchStats, removeTask } = useTasks();
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'kanban'
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, task: null, isDeleting: false });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleDeleteClick = (task) => {
    setDeleteModal({ isOpen: true, task, isDeleting: false });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.task) return;
    
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    try {
      await api.deleteTask(deleteModal.task.id);
      toast.success('Task deleted successfully');
      removeTask(deleteModal.task.id);
      if (tasks.length === 1 && pagination.page > 1) {
        updateFilters({ page: pagination.page - 1 });
      } else {
        refetchTasks();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete task');
    } finally {
      setDeleteModal({ isOpen: false, task: null, isDeleting: false });
    }
  };

  return (
    <div className="py-2">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {getGreeting()}!
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Here's what's happening with your tasks today.
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-4 sm:p-6 mb-6">
        <TaskFilters 
          filters={filters} 
          updateFilters={updateFilters} 
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <div className="mt-6">
          {viewMode === 'list' ? (
            <TaskList 
              tasks={tasks} 
              loading={loading} 
              error={error} 
              onRetry={refetchTasks}
              onDeleteClick={handleDeleteClick}
            />
          ) : (
            <KanbanBoard 
              tasks={tasks} 
              onDeleteClick={handleDeleteClick}
            />
          )}
        </div>
      </div>

      {viewMode === 'list' && pagination.totalPages > 1 && !loading && !error && (
        <Pagination 
          currentPage={pagination.page} 
          totalPages={pagination.totalPages} 
          totalItems={pagination.total} 
          limit={pagination.limit}
          onPageChange={(page) => updateFilters({ page })} 
        />
      )}

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, task: null, isDeleting: false })}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteModal.task?.title}"? This action cannot be undone.`}
        isDeleting={deleteModal.isDeleting}
      />
    </div>
  );
}
