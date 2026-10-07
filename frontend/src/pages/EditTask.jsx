import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as api from '../services/api';
import TaskForm from '../components/tasks/TaskForm';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import ErrorState from '../components/common/ErrorState';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        const response = await api.getTaskById(id);
        if (response.success) {
          setTask(response.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load task');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await api.updateTask(id, data);
      toast.success('Task updated successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to update task');
    } finally {
      setIsSubmitting(false);
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
    <div className="max-w-2xl mx-auto py-6">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Task</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update the details for this task.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 sm:p-8">
        <TaskForm initialData={task} onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </div>
  );
}
