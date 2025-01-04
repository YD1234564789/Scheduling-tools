import React from 'react';
import { Employee } from '../../types';
import { X } from 'lucide-react';

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (id: string) => void;
}

export function EmployeeList({ employees, onDelete }: EmployeeListProps) {
  if (employees.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-4">
        尚未新增任何員工
      </p>
    );
  }

  return (
    <div className="border rounded-md divide-y">
      {employees.map(employee => (
        <div 
          key={employee.id}
          className="flex items-center justify-between p-3 hover:bg-gray-50"
        >
          <span className="text-sm text-gray-900">{employee.name}</span>
          <button
            onClick={() => onDelete(employee.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
