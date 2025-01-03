import { TimeError } from '../types';

export function validateTimeRange(
  start: string,
  end: string,
  businessStart: string,
  businessEnd: string
): TimeError | null {
  const startValue = timeToMinutes(start);
  const endValue = timeToMinutes(end);
  const businessStartValue = timeToMinutes(businessStart);
  const businessEndValue = timeToMinutes(businessEnd);

  if (startValue < businessStartValue) {
    return {
      type: 'START_BEFORE_BUSINESS',
      message: `Start time must be after business hours start (${businessStart})`
    };
  }

  if (endValue > businessEndValue) {
    return {
      type: 'END_AFTER_BUSINESS',
      message: `End time must be before business hours end (${businessEnd})`
    };
  }

  if (startValue >= endValue) {
    return {
      type: 'INVALID_RANGE',
      message: 'End time must be after start time'
    };
  }

  return null;
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
