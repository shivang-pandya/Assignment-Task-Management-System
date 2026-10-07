import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineDocumentText, HiOutlineCheckCircle, HiOutlineClock, HiOutlineExclamationCircle } from 'react-icons/hi';

const StatCard = ({ title, value, icon: Icon, colorClass, index }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value) || 0;
    if (start === end) {
      setDisplayValue(end);
      return;
    }
    let totalDuration = 1000;
    let incrementTime = (totalDuration / end);
    let timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm relative overflow-hidden`}
    >
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 ${colorClass.bg}`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h4 className="text-3xl font-bold text-gray-900 dark:text-white">{displayValue}</h4>
        </div>
        <div className={`p-3 rounded-lg ${colorClass.bg} ${colorClass.text}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default function StatsCards({ stats }) {
  if (!stats) return null;

  const cards = [
    { title: 'Total Tasks', value: stats.total, icon: HiOutlineDocumentText, colorClass: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' } },
    { title: 'Completed', value: stats.completed, icon: HiOutlineCheckCircle, colorClass: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' } },
    { title: 'In Progress', value: stats.inProgress, icon: HiOutlineClock, colorClass: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' } },
    { title: 'Overdue', value: stats.overdue, icon: HiOutlineExclamationCircle, colorClass: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' } },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <StatCard key={card.title} {...card} index={index} />
      ))}
    </div>
  );
}
