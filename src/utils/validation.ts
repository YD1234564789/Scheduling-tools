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
      message: `開始時間必須在營業時間後 (${businessStart})`
    };
  }

  if (endValue > businessEndValue) {
    return {
      type: 'END_AFTER_BUSINESS',
      message: `結束時間必須在營業時間前 (${businessEnd})`
    };
  }

  if (startValue >= endValue) {
    return {
      type: 'INVALID_RANGE',
      message: '開始時間要早於結束時間'
    };
  }

  return null;
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
