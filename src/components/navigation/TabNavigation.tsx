import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TabNavigationProps {
  tabs: readonly Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="flex" aria-label="Tabs">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`
            group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-sm font-medium text-center 
            hover:bg-gray-50 focus:z-10 focus:outline-none
            ${activeTab === id 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
            }
          `}
        >
          <div className="flex items-center justify-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </div>
        </button>
      ))}
    </nav>
  );
}
