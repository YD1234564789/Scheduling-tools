import React, { useState } from 'react';
import { TimeSelect } from './TimeSelect';

interface TimeRangePickerProps {
  days: string[];
  onChange: (day: string, start: string, end: string) => void;
  initialValue?: { day: string; start: string; end: string };
}

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ days, onChange, initialValue = { day: days[0], start: '09:00', end: '17:00' } }) => {
  const [selectedDay, setSelectedDay] = useState(initialValue.day);
  const [startTime, setStartTime] = useState(initialValue.start);
  const [endTime, setEndTime] = useState(initialValue.end);

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
    onChange(event.target.value, startTime, endTime);
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    onChange(selectedDay, time, endTime);
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
    onChange(selectedDay, startTime, time);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-1/3">
        <label className="block text-sm font-medium text-gray-700">日期</label>
        <select value={selectedDay} onChange={handleDayChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      <div className="w-1/3">
        <label className="block text-sm font-medium text-gray-700">開始時間</label>
        <TimeSelect value={startTime} onChange={handleStartTimeChange} showMinutes label="" className="w-full" />
      </div>
      <div className="w-1/3">
        <label className="block text-sm font-medium text-gray-700">結束時間</label>
        <TimeSelect value={endTime} onChange={handleEndTimeChange} showMinutes label="" className="w-full" />
      </div>
    </div>
  );
};
