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
        bg-[#FAFAFA] dark:bg-[#0A0A0A] border-r border-black/10 dark:border-white/10
      `}>
        <div className="flex items-center justify-between p-4 h-16 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center space-x-2 text-zinc-900 dark:text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className="text-xl font-bold tracking-tight">TaskFlow</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                ${isActive 
                  ? 'bg-zinc-200/50 text-zinc-900 dark:bg-white/10 dark:text-white' 
                  : 'text-zinc-600 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:bg-white/5'
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-black/10 dark:border-white/10">
          <button
            onClick={toggleTheme}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-white/5 transition-colors"
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

        <div className="p-4 text-center text-xs text-zinc-500 dark:text-zinc-500/50">
          Shivang Pandya
        </div>
      </aside>
    </>
  );
}
