import React, { useState } from 'react';
import { Employee } from '../../types';
import { Plus } from 'lucide-react';
import { EmployeeList } from './EmployeeList';
import { validateEmployeeName } from '../../utils/employeeValidation';

interface EmployeeManagementProps {
  employees: Employee[];
  onAdd: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export function EmployeeManagement({ employees, onAdd, onDelete }: EmployeeManagementProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateEmployeeName(name, employees);
    if (validationError) {
      setError(validationError);
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      availability: []
    });

    setName('');
    setError(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(null);
  };

  // Use a Set to ensure unique employee IDs
  const uniqueEmployees = [...new Set(employees.map(emp => emp.id))];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            員工姓名
          </label>
          <div className="mt-1 flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className={`block w-full rounded-md shadow-sm 
                  focus:ring-blue-500 focus:border-blue-500
                  ${error 
                    ? 'border-red-300 text-red-900 placeholder-red-300'
                    : 'border-gray-300'
                  }`}
                placeholder="請輸入員工姓名"
                required
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent 
                text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-blue-500"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">員工列表</h3>
        <EmployeeList employees={employees} onDelete={onDelete} />
      </div>
    </div>
  );
}
