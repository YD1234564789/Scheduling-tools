import React, { useState, useEffect } from 'react';
import { TimeSlot } from '../types';
import { TimeSelect } from './TimeSelect';
import { validateTimeRange } from '../utils/validation';

interface RequirementFormProps {
  onSubmit: (day: string, timeSlot: TimeSlot) => void;
  businessHours: {
    start: string;
    end: string;
  };
  onClearAll: () => void;
  onClearDay: (day: string) => void;
}

export function RequirementForm({ onSubmit, businessHours, onClearAll, onClearDay }: RequirementFormProps) {
  const [day, setDay] = useState('星期一');
  const [start, setStart] = useState(businessHours.start);
  const [end, setEnd] = useState(businessHours.end);
  const [requiredStaff, setRequiredStaff] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [selectedClearOption, setSelectedClearOption] = useState('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

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
    const validationError = validateTimeRange(
      start,
      end,
      businessHours.start,
      businessHours.end
    );
    
    if (validationError) {
      setError(validationError.message);
    } else {
      setError(null);
    }
  }, [start, end, businessHours]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!error) {
      onSubmit(day, { start, end, requiredStaff });
      setTimeSlots([...timeSlots, {start, end, requiredStaff}]);
    }
  };

  const handleClearSchedule = () => {
    if (selectedClearOption === 'all') {
      onClearAll();
    } else if (selectedClearOption !== '') {
      onClearDay(selectedClearOption);
    }
    setSelectedClearOption(''); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">新增排班需求</h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">日期</label>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">開始時間</label>
          <TimeSelect
            value={start}
            onChange={setStart}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">結束時間</label>
          <TimeSelect
            value={end}
            onChange={setEnd}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          所需人數
        </label>
        <input
          type="number"
          min="1"
          value={requiredStaff}
          onChange={(e) => setRequiredStaff(parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={!!error}
        className={`w-full py-2 px-4 rounded-md ${
          error 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        新增需求
      </button>
      <div className="mt-4">
        <label htmlFor="clear-option" className="block text-sm font-medium text-gray-700">清除排班</label>
        <select
          id="clear-option"
          value={selectedClearOption}
          onChange={(e) => setSelectedClearOption(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">選擇選項...</option>
          <option value="all">全部清除</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <button
          onClick={handleClearSchedule}
          className="mt-2 px-3 py-2 rounded-md bg-red-100 hover:bg-red-200 text-red-700"
          disabled={selectedClearOption === ''}
        >
          清除
        </button>
      </div>
    </form>
  );
}
