import { format, formatDistanceToNow, isPast, isToday, isTomorrow, startOfDay } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'MMM d, yyyy');
};

export const formatRelativeDate = (dateString) => {
  if (!dateString) return '';
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

export const getDueDateStatus = (dueDate) => {
  if (!dueDate) return 'none';
  
  const date = startOfDay(new Date(dueDate));
  const today = startOfDay(new Date());

  if (isPast(date) && !isToday(date)) return 'overdue';
  if (isToday(date)) return 'today';
  if (isTomorrow(date)) return 'tomorrow';
  return 'upcoming';
};

export const getStatusLabel = (status) => {
  const map = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  };
  return map[status] || status;
};

export const getPriorityLabel = (priority) => {
  if (!priority) return '';
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
