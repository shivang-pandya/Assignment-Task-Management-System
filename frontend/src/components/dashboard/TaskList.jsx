import React from 'react';
import TaskCard from './TaskCard';
import LoadingSkeleton from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';

export default function TaskList({ tasks, loading, error, onRetry, onDeleteClick }) {
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  
  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState 
        title="No tasks found" 
        message="We couldn't find any tasks matching your current filters. Try adjusting them or create a new task."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task, index) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          index={index} 
          onDeleteClick={onDeleteClick} 
        />
      ))}
    </div>
  );
}
