import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineCalendar, HiOutlineClock, HiOutlinePencil, HiOutlineTrash, HiOutlineArrowLeft } from 'react-icons/hi';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatDate, formatRelativeDate } from '../../utils/helpers';

export default function TaskDetail({ task, onDeleteClick }) {
  const navigate = useNavigate();

  if (!task) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <HiOutlineArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" size="sm" icon={HiOutlinePencil} onClick={() => navigate(`/tasks/${task.id}/edit`)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" icon={HiOutlineTrash} onClick={() => onDeleteClick(task)}>
            Delete
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {task.title}
          </h1>
          <div className="flex items-center space-x-3 shrink-0">
            <Badge type="status" value={task.status} className="px-3 py-1 text-sm" />
            <Badge type="priority" value={task.priority} className="px-3 py-1 text-sm" />
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {task.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-slate-700">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <div className="bg-gray-100 dark:bg-slate-700 p-2 rounded-lg mr-3">
              <HiOutlineCalendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-0.5">Due Date</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {task.dueDate ? formatDate(task.dueDate) : 'No due date'}
              </p>
            </div>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <div className="bg-gray-100 dark:bg-slate-700 p-2 rounded-lg mr-3">
              <HiOutlineClock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-0.5">Created</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(task.createdAt)} <span className="text-sm text-gray-400">({formatRelativeDate(task.createdAt)})</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
