import { Employee } from '../types';

export function splitAvailabilityAtTime(
  availability: Employee['availability'],
  day: string,
  time: string
): Employee['availability'] {
  return availability.map(a => {
    if (a.day === day && time >= a.start && time < a.end) {
      const slots = [];
      if (a.start < time) {
        slots.push({
          day: a.day,
          start: a.start,
          end: time
        });
      }
      if (a.end > time) {
        const nextSlotTime = new Date(`2000-01-01T${time}`);
        nextSlotTime.setHours(nextSlotTime.getHours() + 1);
        const nextTime = nextSlotTime.toTimeString().slice(0, 5);
        slots.push({
          day: a.day,
          start: nextTime,
          end: a.end
        });
      }
      return slots;
    }
    return [a];
  }).flat();
}
