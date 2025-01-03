import React from 'react';

interface TimeSelectProps {
  value: string;
  onChange: (time: string) => void;
  showMinutes?: boolean;
}

export function TimeSelect({ value = '00:00', onChange, showMinutes = true }: TimeSelectProps) {
  const [hours, minutes] = value.split(':').map(Number);

  const handleChange = (newHours: string, newMinutes: string) => {
    onChange(`${newHours.padStart(2, '0')}:${newMinutes.padStart(2, '0')}`);
  };

  return (
    <div className="flex items-center gap-1">
      <select
        value={hours.toString().padStart(2, '0')}
        onChange={(e) => handleChange(e.target.value, showMinutes ? minutes.toString() : '00')}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {Array.from({ length: 24 }, (_, i) => (
          <option key={i} value={i.toString().padStart(2, '0')}>
            {i.toString().padStart(2, '0')}
          </option>
        ))}
      </select>
      {showMinutes && (
        <>
          <span>:</span>
          <select
            value={minutes.toString().padStart(2, '0')}
            onChange={(e) => handleChange(hours.toString(), e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="00">00</option>
            <option value="30">30</option>
          </select>
        </>
      )}
    </div>
  );
}
