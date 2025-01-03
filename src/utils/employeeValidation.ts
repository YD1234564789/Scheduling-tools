import { Employee } from '../types';

export function validateEmployeeName(name: string, existingEmployees: Employee[]): string | null {
  if (!name.trim()) {
    return 'Employee name is required';
  }

  const normalizedName = name.trim().toLowerCase();
  const exists = existingEmployees.some(
    emp => emp.name.toLowerCase() === normalizedName
  );

  if (exists) {
    return 'An employee with this name already exists';
  }

  return null;
}
