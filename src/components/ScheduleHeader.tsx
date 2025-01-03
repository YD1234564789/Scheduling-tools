import React from 'react';

interface ScheduleHeaderProps {
  days: string[];
}

export function ScheduleHeader({ days }: ScheduleHeaderProps) {
  return (
    <div className="grid grid-cols-[100px_repeat(7,1fr)]">
      <div className="h-12 flex items-center justify-center font-semibold bg-gray-50 border-r border-gray-200">
        時間
      </div>
      {days.map((day) => (
        <div key={day} className="h-12 flex items-center justify-center font-semibold bg-gray-50 border-r border-gray-200 last:border-r-0">
          {day}
        </div>
      ))}
    </div>
  );
}
