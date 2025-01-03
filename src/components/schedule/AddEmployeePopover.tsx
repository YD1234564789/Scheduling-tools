import React, { useState } from 'react';
import { Employee } from '../../types';

interface AddEmployeePopoverProps {
  children: React.ReactNode;
  onAdd: (employeeId: string) => void;
  availableEmployees: Employee[];
}

export function AddEmployeePopover({ 
  children, 
  onAdd, 
  availableEmployees 
}: AddEmployeePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (availableEmployees.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute bottom-full left-0 mb-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
            {availableEmployees.map(emp => (
              <button
                key={emp.id}
                onClick={() => {
                  onAdd(emp.id);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
              >
                {emp.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
