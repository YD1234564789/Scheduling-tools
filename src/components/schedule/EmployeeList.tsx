import React from 'react';
import { X } from 'lucide-react';
import { Employee } from '../../types';

interface EmployeeListProps {
  employees: Employee[];
  onRemove: (employeeId: string, day: string, time: string) => void;
  availableEmployees: Employee[];
  day: string;
  time: string;
}

export function EmployeeList({ 
  employees, 
  onRemove,
  availableEmployees,
  day,
  time
}: EmployeeListProps) {
  return (
    <div className="space-y-0.5 max-h-12 overflow-y-auto">
      {employees.map(emp => (
        <div 
          key={emp.id} 
          className="flex items-center justify-between group py-0.5"
        >
          <span className="truncate text-xs">{emp.name}</span>
          <button
            type="button"
            onClick={() => onRemove(emp.id, day, time)}
            className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-400 hover:text-red-500 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
