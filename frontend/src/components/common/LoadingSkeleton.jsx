import React from 'react';

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-5 w-3/4 rounded shimmer"></div>
            <div className="h-5 w-16 rounded-full shimmer"></div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full rounded shimmer"></div>
            <div className="h-4 w-5/6 rounded shimmer"></div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
            <div className="h-4 w-24 rounded shimmer"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-8 rounded shimmer"></div>
              <div className="h-8 w-8 rounded shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
