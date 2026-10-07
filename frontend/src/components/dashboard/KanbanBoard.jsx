import React from 'react';
import TaskCard from './TaskCard';
import { STATUS_OPTIONS, STATUS_COLORS } from '../../utils/constants';

export default function KanbanBoard({ tasks, onDeleteClick }) {
  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 h-full min-h-[600px] custom-scrollbar">
      {STATUS_OPTIONS.map((status) => {
        const columnTasks = getTasksByStatus(status.value);
        const colorCfg = STATUS_COLORS[status.value];
        
        return (
          <div key={status.value} className="flex-1 min-w-[300px] bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                <span className={`w-2.5 h-2.5 rounded-full mr-2 ${colorCfg.dot}`}></span>
                {status.label}
              </h3>
              <span className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs py-1 px-2.5 rounded-full font-medium">
                {columnTasks.length}
              </span>
            </div>
            
            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
              {columnTasks.map((task, index) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  index={index} 
                  onDeleteClick={onDeleteClick} 
                  isCompact={true}
                />
              ))}
              {columnTasks.length === 0 && (
                <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg p-6 flex items-center justify-center text-sm text-gray-400 text-center">
                  No tasks in this column
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
