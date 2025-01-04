import React, { useState } from 'react';

interface TimeSelectProps {
  value: string;
  onChange: (time: string) => void;
  showMinutes?: boolean;
  label?: string;
}

export function TimeSelect({ value = '00:00', onChange, showMinutes = true, label }: TimeSelectProps) {
  const [hours, minutes] = value.split(':').map(Number);

  const handleChange = (newHours: number, newMinutes: number) => {
    onChange(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`);
  };

  return (
    <div className="flex items-center gap-1">
      {label && <label className="block text-sm font-medium text-gray-700 mr-2">{label}</label>}
      <select
        value={hours}
        onChange={(e) => handleChange(parseInt(e.target.value), minutes)}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {Array.from({ length: 24 }, (_, i) => (
          <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
        ))}
      </select>
      <span>:</span>
      {showMinutes && (
        <select
          value={minutes}
          onChange={(e) => handleChange(hours, parseInt(e.target.value))}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {/* Only show 00 and 30 minutes */}
          <option value={0}>00</option>
          <option value={30}>30</option>
        </select>
      )}
    </div>
  );
}
