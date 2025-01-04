import React, { useState, useEffect } from 'react';
import { TimeSlot } from '../types';
import { TimeRangePicker } from './TimeRangePicker';
import { validateTimeRange } from '../utils/validation';

interface RequirementFormProps {
  onSubmit: (day: string, timeSlot: TimeSlot) => void;
  businessHours: {
    start: string;
    end: string;
  };
}

export function RequirementForm({ onSubmit, businessHours }: RequirementFormProps) {
  const [day, setDay] = useState('星期一');
  const [start, setStart] = useState(businessHours.start);
  const [end, setEnd] = useState(businessHours.end);
  const [requiredStaff, setRequiredStaff] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const days = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日',
  ];

  useEffect(() => {
    const validationError = validateTimeRange(start, end, businessHours.start, businessHours.end);
    setError(validationError ? validationError.message : null);
  }, [start, end, businessHours]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!error) {
      onSubmit(day, { start, end, requiredStaff });
    }
  };

  const handleTimeRangeChange = (selectedDay: string, start: string, end: string) => {
    setDay(selectedDay);
    setStart(start);
    setEnd(end);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">新增人員需求</h3>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>}
      <TimeRangePicker days={days} onChange={handleTimeRangeChange} />
      <div>
        <label className="block text-sm font-medium text-gray-700">所需人員</label>
        <input type="number" min="1" value={requiredStaff} onChange={(e) => setRequiredStaff(parseInt(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
      </div>
      <button type="submit" disabled={!!error} className={`w-full py-2 px-4 rounded-md ${error ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
        新增需求
      </button>
    </form>
  );
}
