import React from 'react';
import { STATUS_COLORS, PRIORITY_COLORS } from '../../utils/constants';
import { getStatusLabel, getPriorityLabel } from '../../utils/helpers';
import { HiOutlineClock, HiOutlineExclamationCircle, HiOutlineCheckCircle, HiOutlineChevronUp, HiOutlineMinus, HiOutlineChevronDown } from 'react-icons/hi';

export default function Badge({ type, value, className = '' }) {
  if (type === 'status') {
    const colors = STATUS_COLORS[value] || STATUS_COLORS.pending;
    let Icon = HiOutlineClock;
    if (value === 'in_progress') Icon = HiOutlineExclamationCircle;
    if (value === 'completed') Icon = HiOutlineCheckCircle;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${colors.dot}`}></span>
        {getStatusLabel(value)}
      </span>
    );
  }

  if (type === 'priority') {
    const colors = PRIORITY_COLORS[value] || PRIORITY_COLORS.low;
    let Icon = HiOutlineMinus;
    if (value === 'high') Icon = HiOutlineChevronUp;
    if (value === 'low') Icon = HiOutlineChevronDown;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${className}`}>
        <Icon className={`w-3 h-3 mr-1 ${colors.icon}`} />
        {getPriorityLabel(value)}
      </span>
    );
  }

  return null;
}
