import React from 'react';
import { BsPersonCheck, BsPersonExclamation, BsPersonFillSlash } from 'react-icons/bs';
import { TimeSlot, Employee } from '../types';
import { isTimeInRange, isPartialHourSlot } from '../utils/timeUtils';
import { EmployeeList } from './schedule/EmployeeList';

interface TimeSlotCellProps {
  slot?: TimeSlot;
  timeInterval: string;
  time: string;
  employees?: Employee[];
  day: string;
  showNames?: boolean;
  onUpdateEmployees?: (day: string, time: string, employeeIds: string[]) => void;
}

export function TimeSlotCell({ 
  slot, 
  timeInterval, 
  time, 
  employees = [], 
  day,
  showNames = false,
  onUpdateEmployees
}: TimeSlotCellProps) {
  const scheduledEmployees = employees.filter(employee => 
    employee.availability.some(a => 
      a.day === day && isTimeInRange(time, a.start, a.end)
    )
  );

  const handleRemoveEmployee = (employeeId: string) => {
    if (onUpdateEmployees) {
      const updatedEmployeeIds = scheduledEmployees
        .filter(emp => emp.id !== employeeId)
        .map(emp => emp.id);
      onUpdateEmployees(day, time, updatedEmployeeIds);
    }
  };

  const currentStaff = scheduledEmployees.length;
  const requiredStaff = slot?.requiredStaff || 0;
  const isPartialSlot = timeInterval === '60' && slot && isPartialHourSlot(time, slot.start, slot.end);

  let statusColor = '';
  let StatusIcon = BsPersonCheck;

  if (slot) {
    if (currentStaff === requiredStaff) {
      statusColor = 'bg-green-100 text-green-700';
      StatusIcon = BsPersonCheck;
    } else if (currentStaff < requiredStaff) {
      statusColor = 'bg-yellow-100 text-yellow-700';
      StatusIcon = BsPersonExclamation;
    } else {
      statusColor = 'bg-red-100 text-red-700';
      StatusIcon = BsPersonFillSlash;
    }

    if (isPartialSlot) {
      statusColor = 'bg-green-100 border border-green-200 text-green-700';
    }
  } else {
    // For cells with only available employees but no requirement
    statusColor = 'bg-gray-100 text-gray-600';
    StatusIcon = BsPersonCheck;
  }

  return (
    <div className="h-16 border-t border-gray-200 p-2">
      <div className={`h-full rounded-md p-2 ${statusColor}`}>
        {showNames ? (
          <EmployeeList
            employees={scheduledEmployees}
            onRemove={handleRemoveEmployee}
            availableEmployees={employees}
            day={day}
            time={time}
          />
        ) : (
          <div className="flex items-center gap-1 text-sm">
            <StatusIcon className="w-4 h-4" />
            <span>{currentStaff > 0 ? `${currentStaff}/${requiredStaff}` : `0/${requiredStaff}`}</span>
          </div>
        )}
      </div>
    </div>
  );
}