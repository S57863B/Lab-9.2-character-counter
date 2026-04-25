import React from 'react';
import type { StatsDisplayProps } from '../../types/index.ts';

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  showReadingTime = true,
  minWords,
  maxWords
}) => {
  // Helper to format decimal minutes into MM:SS
  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate word progress percentage
  const progressPercentage = maxWords 
    ? Math.min((stats.wordCount / maxWords) * 100, 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* Characters */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center">
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Characters</h3>
        <p className="text-4xl font-bold text-gray-800">{stats.characterCount}</p>
      </div>

      {/* Words */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center">
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Words</h3>
        <p className="text-4xl font-bold text-gray-800">{stats.wordCount}</p>
        
        {(minWords !== undefined || maxWords !== undefined) && (
          <div className="w-full mt-3 flex flex-col items-center">
            <p className="text-xs text-gray-500 mb-1">
              {minWords !== undefined && `Min: ${minWords}`}
              {minWords !== undefined && maxWords !== undefined && ' | '}
              {maxWords !== undefined && `Max: ${maxWords}`}
            </p>
            {maxWords !== undefined && (
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${stats.wordCount > maxWords ? 'bg-red-500' : 'bg-blue-500'}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reading Time */}
      {showReadingTime && (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Reading Time</h3>
          <p className="text-4xl font-bold text-gray-800">{formatTime(stats.readingTime)}</p>
        </div>
      )}
    </div>
  );
};