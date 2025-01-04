import React, { useState } from 'react';
import { ScheduleGrid } from './components/ScheduleGrid';
import { RequirementForm } from './components/RequirementForm';
import { EmployeeForm } from './components/employee/EmployeeForm';
import { EmployeeManagement } from './components/employee/EmployeeManagement';
import { TabNavigation } from './components/navigation/TabNavigation';
import { DaySchedule, TimeSlot, Employee } from './types';
import { Calendar, Users, Clock, UserPlus } from 'lucide-react';

type TabType = 'requirements' | 'schedule' | 'employees';

const tabs = [
  { id: 'requirements', label: '排班需求', icon: Clock },
  { id: 'schedule', label: '新增排班', icon: UserPlus },
  { id: 'employees', label: '管理員工', icon: Users },
] as const;

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('requirements');
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: '星期一', timeSlots: [] },
    { day: '星期二', timeSlots: [] },
    { day: '星期三', timeSlots: [] },
    { day: '星期四', timeSlots: [] },
    { day: '星期五', timeSlots: [] },
    { day: '星期六', timeSlots: [] },
    { day: '星期日', timeSlots: [] },
  ]);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [businessHours, setBusinessHours] = useState({
    start: '11:00',
    end: '22:00'
  });

  const handleAddRequirement = (day: string, timeSlot: TimeSlot) => {
    setSchedule((prev) =>
      prev.map((d) =>
        d.day === day
          ? { ...d, timeSlots: [...d.timeSlots, timeSlot] }
          : d
      )
    );
  };

  const handleAddEmployee = (employee: Employee) => {
    setEmployees(prev => [...prev, employee]);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const handleUpdateEmployees = (day: string, time: string, employeeIds: string[]) => {
    setEmployees(prev => prev.map(emp => {
      if (!employeeIds.includes(emp.id) && emp.availability.some(a => 
        a.day === day && time >= a.start && time < a.end
      )) {
        return {
          ...emp,
          availability: []
        };
      }
      return emp;
    }));
  };

  const handleBusinessHoursChange = (start: string, end: string) => {
    setBusinessHours({ start, end });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              員工排班工具
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200">
                <TabNavigation
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabChange={(id) => setActiveTab(id as TabType)}
                />
              </div>

              <div className="">
                {activeTab === 'requirements' && (
                  <RequirementForm 
                    onSubmit={handleAddRequirement}
                    businessHours={businessHours}
                  />
                )}
                {activeTab === 'schedule' && (
                  <EmployeeForm 
                    onSubmit={handleAddEmployee}
                    employees={employees}
                  />
                )}
                {activeTab === 'employees' && (
                  <EmployeeManagement
                    employees={employees}
                    onAdd={handleAddEmployee}
                    onDelete={handleDeleteEmployee}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">週間排班表</h2>
              <ScheduleGrid 
                schedule={schedule}
                businessHours={businessHours}
                onBusinessHoursChange={handleBusinessHoursChange}
                employees={employees}
                onUpdateEmployees={handleUpdateEmployees}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
