import React, { useState } from 'react';
import { TimeSelect } from '../TimeSelect';
import { Employee } from '../../types';
import { Plus, X } from 'lucide-react';
import { timeToMinutes } from '../../utils/timeUtils';

interface AvailabilityInputProps {
  availability: Employee['availability'];
  onChange: (availability: Employee['availability']) => void;
}

const DAYS = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

export function AvailabilityInput({ availability, onChange }: AvailabilityInputProps) {
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [timeRange, setTimeRange] = useState({ start: '09:00', end: '17:00' });
  const [error, setError] = useState<string | null>(null);

  const validateTimeRange = (start: string, end: string): boolean => {
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
    
    if (startMinutes >= endMinutes) {
      setError('結束時間必須在開始時間之後');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleTimeChange = (type: 'start' | 'end', time: string) => {
    const newTimeRange = {
      ...timeRange,
      [type]: time
    };
    setTimeRange(newTimeRange);
    validateTimeRange(newTimeRange.start, newTimeRange.end);
  };

  const addAvailability = () => {
    if (!validateTimeRange(timeRange.start, timeRange.end)) {
      return;
    }

    const newAvailability = [...availability, {
      day: selectedDay,
      start: timeRange.start,
      end: timeRange.end,
    }];
    onChange(newAvailability);
  };

  const removeAvailability = (index: number) => {
    const newAvailability = availability.filter((_, i) => i !== index);
    onChange(newAvailability);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">日期</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {DAYS.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">時間範圍</label>
          <div className="flex items-center gap-2 mt-1">
            <TimeSelect
              value={timeRange.start}
              onChange={(time) => handleTimeChange('start', time)}
              showMinutes={true}
            />
            <span className="text-gray-500">~</span>
            <TimeSelect
              value={timeRange.end}
              onChange={(time) => handleTimeChange('end', time)}
              showMinutes={true}
            />
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={addAvailability}
            disabled={!!error}
            className={`mb-0.5 p-2 rounded-md ${
              error 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {availability.map((slot, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <span className="text-sm text-gray-600">
              {slot.day}: {slot.start} - {slot.end}
            </span>
            <button
              type="button"
              onClick={() => removeAvailability(index)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
