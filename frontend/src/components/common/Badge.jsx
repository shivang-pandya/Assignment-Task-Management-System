import React from 'react';
import { STATUS_COLORS, PRIORITY_COLORS } from '../../utils/constants';
import { getStatusLabel, getPriorityLabel } from '../../utils/helpers';
import { HiOutlineClock, HiOutlineExclamationCircle, HiOutlineCheckCircle, HiOutlineChevronUp, HiOutlineMinus, HiOutlineChevronDown } from 'react-icons/hi';

export default function Badge({ type, value, className = '' }) {
  const customColors = {
    pending: { bg: 'bg-zinc-100 dark:bg-white/10', text: 'text-zinc-600 dark:text-zinc-300', dot: 'bg-zinc-400 dark:bg-zinc-500' },
    in_progress: { bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
    completed: { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
    high: { bg: 'bg-orange-50 dark:bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', icon: 'text-orange-500' },
    medium: { bg: 'bg-zinc-100 dark:bg-white/10', text: 'text-zinc-700 dark:text-zinc-300', icon: 'text-zinc-500' },
    low: { bg: 'bg-zinc-50 dark:bg-transparent', text: 'text-zinc-500 dark:text-zinc-400', icon: 'text-zinc-400' }
  };

  if (type === 'status') {
    const colors = customColors[value] || customColors.pending;
    let Icon = HiOutlineClock;
    if (value === 'in_progress') Icon = HiOutlineExclamationCircle;
    if (value === 'completed') Icon = HiOutlineCheckCircle;

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border border-black/5 dark:border-white/5 ${colors.bg} ${colors.text} ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${colors.dot}`}></span>
        {getStatusLabel(value)}
      </span>
    );
  }

  if (type === 'priority') {
    const colors = customColors[value] || customColors.low;
    let Icon = HiOutlineMinus;
    if (value === 'high') Icon = HiOutlineChevronUp;
    if (value === 'low') Icon = HiOutlineChevronDown;

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border border-black/5 dark:border-white/5 ${colors.bg} ${colors.text} ${className}`}>
        <Icon className={`w-3 h-3 mr-1 ${colors.icon}`} />
        {getPriorityLabel(value)}
      </span>
    );
  }

  return null;
}
