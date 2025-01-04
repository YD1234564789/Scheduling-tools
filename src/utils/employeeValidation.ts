import { Employee } from '../types';

export function validateEmployeeName(name: string, existingEmployees: Employee[]): string | null {
  if (!name.trim()) {
    return '員工姓名必填';
  }

  const normalizedName = name.trim().toLowerCase();
  const exists = existingEmployees.some(
    emp => emp.name.toLowerCase() === normalizedName
  );

  if (exists) {
    return '已存在同名員工';
  }

  return null;
}
