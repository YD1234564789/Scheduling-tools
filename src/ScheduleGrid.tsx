import React, { useState, useEffect } from 'react';
import { DaySchedule, TimeInterval, Employee } from '../types';
import { TimeSlotCell } from './TimeSlotCell';
import { ScheduleHeader } from './ScheduleHeader';
import { ScheduleSettings } from './ScheduleSettings';
import { generateTimeSlots, isTimeInRange } from '../utils/timeUtils';
import { Eye, Users, Trash2 } from 'lucide-react';

interface ScheduleGridProps {
  schedule: DaySchedule[];
  businessHours: {
    start: string;
    end: string;
  };
  onBusinessHoursChange: (start: string, end: string) => void;
  employees?: Employee[];
  onUpdateEmployees?: (day: string, time: string, employeeIds: string[]) => void;
}

export function ScheduleGrid({ 
  schedule, 
  businessHours,
  onBusinessHoursChange,
  employees = [],
  onUpdateEmployees
}: ScheduleGridProps) {
  const [interval, setInterval] = useState<TimeInterval>('60');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [showNames, setShowNames] = useState(false);

  useEffect(() => {
    setTimeSlots(generateTimeSlots(interval, businessHours.start, businessHours.end));
  }, [interval, businessHours]);

  const handleUpdateEmployees = (day: string, time: string) => (employeeIds: string[]) => {
    onUpdateEmployees?.(day, time, employeeIds);
  };

  const handleClearSchedule = () => {
    // Clear all employee schedules
    schedule.forEach(day => {
      timeSlots.forEach(time => {
        onUpdateEmployees?.(day.day, time, []);
      });
    });
  };

  const days = schedule.map(s => s.day);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <ScheduleSettings
          interval={interval}
          businessHours={businessHours}
          onIntervalChange={setInterval}
          onBusinessHoursChange={onBusinessHoursChange}
        />
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNames(prev => !prev)}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            {showNames ? <Users className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showNames ? 'Show Count' : 'Show Names'}</span>
          </button>

          <button
            onClick={handleClearSchedule}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-100 hover:bg-red-200 text-red-700"
            title="Clear all schedules"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Schedule</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="bg-white rounded-lg shadow">
            <ScheduleHeader days={days} />
            
            <div className="grid grid-cols-[100px_repeat(7,1fr)]">
              {/* Time column */}
              <div className="border-r border-gray-200">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className="h-16 flex items-center justify-center border-t border-gray-200 text-sm text-gray-600"
                  >
                    {time}
                  </div>
                ))}
              </div>

              {/* Days columns */}
              {schedule.map((day) => (
                <div key={day.day} className="border-r border-gray-200 last:border-r-0">
                  {timeSlots.map((time) => {
                    const activeSlot = day.timeSlots.find(slot => 
                      isTimeInRange(time, slot.start, slot.end)
                    );
                    
                    return (
                      <TimeSlotCell 
                        key={`${day.day}-${time}`}
                        slot={activeSlot}
                        timeInterval={interval}
                        time={time}
                        employees={employees}
                        day={day.day}
                        showNames={showNames}
                        onUpdateEmployees={handleUpdateEmployees(day.day, time)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
