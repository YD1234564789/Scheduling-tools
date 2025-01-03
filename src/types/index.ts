export interface TimeSlot {
  start: string;
  end: string;
  requiredStaff: number;
  currentStaff?: number;
}

export interface DaySchedule {
  day: string;
  timeSlots: TimeSlot[];
}

export interface Employee {
  id: string;
  name: string;
  availability: {
    day: string;
    start: string;
    end: string;
  }[];
}

export interface Alert {
  id: string;
  type: 'understaffed' | 'overstaffed';
  day: string;
  timeSlot: TimeSlot;
  message: string;
}

export type TimeInterval = '30' | '60';

export interface TimeError {
  type: 'START_BEFORE_BUSINESS' | 'END_AFTER_BUSINESS' | 'INVALID_RANGE';
  message: string;
}
