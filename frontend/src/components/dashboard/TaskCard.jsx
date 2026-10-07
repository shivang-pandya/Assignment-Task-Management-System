import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from 'react-icons/hi';
import Badge from '../common/Badge';
import { formatRelativeDate, formatDate, getDueDateStatus, truncateText } from '../../utils/helpers';

export default function TaskCard({ task, index, onDeleteClick, isCompact = false }) {
  const navigate = useNavigate();
  
  const dueDateStatus = getDueDateStatus(task.dueDate);
  const dateColor = dueDateStatus === 'overdue' ? 'text-red-600 dark:text-red-400' :
                    dueDateStatus === 'today' ? 'text-orange-500' :
                    'text-gray-500 dark:text-gray-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer group ${isCompact ? 'p-3' : 'p-5'}`}
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className={`font-semibold text-gray-900 dark:text-white line-clamp-1 ${isCompact ? 'text-sm' : 'text-lg'}`}>
          {task.title}
        </h4>
        <div className="flex-shrink-0 ml-2" onClick={e => e.stopPropagation()}>
          <Badge type="status" value={task.status} />
        </div>
      </div>
      
      {!isCompact && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col space-y-2">
          <Badge type="priority" value={task.priority} />
          {task.dueDate && (
            <div className={`flex items-center text-xs ${dateColor}`}>
              <HiOutlineCalendar className="w-3.5 h-3.5 mr-1" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>

        <div className={`flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} onClick={e => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/tasks/${task.id}`)}
            className="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-md hover:bg-primary-50 dark:hover:bg-slate-700"
            title="View Details"
          >
            <HiOutlineEye className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(`/tasks/${task.id}/edit`)}
            className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-slate-700"
            title="Edit Task"
          >
            <HiOutlinePencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeleteClick(task)}
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-slate-700"
            title="Delete Task"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {!isCompact && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700 text-xs text-gray-400 dark:text-gray-500">
          Created {formatRelativeDate(task.createdAt)}
        </div>
      )}
    </motion.div>
  );
}
