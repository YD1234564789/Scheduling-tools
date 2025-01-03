import React, { useState } from 'react';
import { Employee } from '../../types';
import { AvailabilityInput } from './AvailabilityInput';
import { EmployeeSelect } from './EmployeeSelect';

interface EmployeeFormProps {
  onSubmit: (employee: Employee) => void;
  employees: Employee[];
}

export function EmployeeForm({ onSubmit, employees }: EmployeeFormProps) {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [availability, setAvailability] = useState<Employee['availability']>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    const employee = employees.find(emp => emp.id === selectedEmployee);
    if (!employee) return;

    onSubmit({
      ...employee,
      availability: [...availability]
    });

    setSelectedEmployee('');
    setAvailability([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <EmployeeSelect
          value={selectedEmployee}
          onChange={setSelectedEmployee}
          employees={employees}
        />
      </div>

      <div>
        <AvailabilityInput
          availability={availability}
          onChange={setAvailability}
        />
      </div>

      <button
        type="submit"
        disabled={!selectedEmployee}
        className="w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 
          disabled:bg-gray-400 disabled:cursor-not-allowed text-white 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        新增排班
      </button>
    </form>
  );
}
