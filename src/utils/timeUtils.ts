export function generateTimeSlots(
  interval: string = '60',
  startHour = '00:00',
  endHour = '23:59'
): string[] {
  const [startH, startM] = startHour.split(':').map(Number);
  const [endH, endM] = endHour.split(':').map(Number);
  const intervalMinutes = parseInt(interval);
  
  const slots: string[] = [];
  let currentHour = startH;
  let currentMinute = startM;
  
  // Convert times to minutes for comparison
  const endTimeInMinutes = endH * 60 + endM;
  
  do {
    slots.push(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`);
    
    currentMinute += intervalMinutes;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
    }
  } while ((currentHour * 60 + currentMinute) <= endTimeInMinutes);
  
  return slots;
}

export function isTimeInRange(time: string, start: string, end: string): boolean {
  const timeValue = timeToMinutes(time);
  const startValue = timeToMinutes(start);
  const endValue = timeToMinutes(end);
  
  return timeValue >= startValue && timeValue < endValue;
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function isPartialHourSlot(time: string, start: string, end: string): boolean {
  const timeMinutes = timeToMinutes(time);
  const startMinutes = timeToMinutes(start);
  const hourStart = Math.floor(startMinutes / 60) * 60;
  
  return timeMinutes === hourStart && startMinutes % 60 !== 0;
}
