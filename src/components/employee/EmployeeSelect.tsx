import React from 'react';
import { Employee } from '../../types';

interface EmployeeSelectProps {
  value: string;
  onChange: (value: string) => void;
  employees: Employee[];
}

export function EmployeeSelect({ value, onChange, employees }: EmployeeSelectProps) {
  // Remove duplicates based on employee ID
  const uniqueEmployees = employees.reduce((acc, current) => {
    const exists = acc.find(emp => emp.id === current.id);
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, [] as Employee[]);

  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500"
        required
      >
        <option value="">選擇一名員工...</option>
        {uniqueEmployees.map(emp => (
          <option key={emp.id} value={emp.id}>
            {emp.name}
          </option>
        ))}
      </select>
    </div>
  );
}
