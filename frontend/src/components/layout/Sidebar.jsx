import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineHome, HiOutlinePlusCircle, HiOutlineSun, HiOutlineMoon, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: HiOutlineHome },
    { name: 'Create Task', path: '/tasks/new', icon: HiOutlinePlusCircle },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64 flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800
        dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800
      `}>
        <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className="text-xl font-bold tracking-tight">TaskFlow</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                ${isActive 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800/50'
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <button
            onClick={toggleTheme}
            className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
          >
            {isDarkMode ? (
              <>
                <HiOutlineSun className="w-5 h-5 mr-3" />
                Light Mode
              </>
            ) : (
              <>
                <HiOutlineMoon className="w-5 h-5 mr-3" />
                Dark Mode
              </>
            )}
          </button>
        </div>

        <div className="p-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Built with ❤️
        </div>
      </aside>
    </>
  );
}
