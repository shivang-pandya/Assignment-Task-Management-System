import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as api from '../services/api';
import TaskDetail from '../components/tasks/TaskDetail';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ErrorState from '../components/common/ErrorState';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, isDeleting: false });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        const response = await api.getTaskById(id);
        if (response.success) {
          setTask(response.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load task details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDeleteClick = () => {
    setDeleteModal({ isOpen: true, isDeleting: false });
  };

  const handleConfirmDelete = async () => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    try {
      await api.deleteTask(id);
      toast.success('Task deleted successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to delete task');
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <TaskDetail task={task} onDeleteClick={handleDeleteClick} />
      
      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, isDeleting: false })}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task?.title}"? This action cannot be undone.`}
        isDeleting={deleteModal.isDeleting}
      />
    </div>
  );
}
