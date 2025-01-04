import React from 'react';
import { TimeInterval } from '../types';
import { TimeSelect } from './TimeSelect';
import { timeToMinutes } from '../utils/timeUtils';

interface ScheduleSettingsProps {
  interval: TimeInterval;
  businessHours: {
    start: string;
    end: string;
  };
  onIntervalChange: (interval: TimeInterval) => void;
  onBusinessHoursChange: (start: string, end: string) => void;
}

export function ScheduleSettings({
  interval,
  businessHours,
  onIntervalChange,
  onBusinessHoursChange,
}: ScheduleSettingsProps) {
  const showMinutes = interval === '30';

  const handleStartChange = (start: string) => {
    if (timeToMinutes(start) < timeToMinutes(businessHours.end)) {
      onBusinessHoursChange(start, businessHours.end);
    }
  };

  const handleEndChange = (end: string) => {
    if (timeToMinutes(end) > timeToMinutes(businessHours.start)) {
      onBusinessHoursChange(businessHours.start, end);
    }
  };

  return (
    <div className="flex gap-6 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          時間間隔
        </label>
        <select
          value={interval}
          onChange={(e) => onIntervalChange(e.target.value as TimeInterval)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="30">30 分鐘</option>
          <option value="60">1 小時</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          營業時間
        </label>
        <div className="flex items-center gap-2">
          <TimeSelect 
            value={businessHours.start} 
            onChange={handleStartChange}
            showMinutes={showMinutes}
          />
          <span className="text-gray-500">~</span>
          <TimeSelect 
            value={businessHours.end} 
            onChange={handleEndChange}
            showMinutes={showMinutes}
          />
        </div>
      </div>
    </div>
  );
}
