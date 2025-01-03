import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Employee } from '../../types';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  onDelete: (id: string) => void;
  onAdd: (employee: Employee) => void;
}

export function EmployeeModal({ isOpen, onClose, employees, onDelete, onAdd }: EmployeeModalProps) {
  const [name, setName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      name,
      availability: []
    });

    setName('');
    setIsAdding(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Employee Management</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAdding ? (
          <>
            <button
              onClick={() => setIsAdding(true)}
              className="w-full mb-4 py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Employee
            </button>
            
            <div className="space-y-2">
              {employees.map(employee => (
                <div key={employee.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                  <span>{employee.name}</span>
                  <button
                    onClick={() => onDelete(employee.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {employees.length === 0 && (
                <p className="text-gray-500 text-center py-4">No employees added yet</p>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter employee name"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Employee
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
