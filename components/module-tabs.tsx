"use client";
import { cn } from "@/lib/utils";

interface ModuleTab {
  id: string;
  label: string;
  isActive?: boolean;
}

interface ModuleTabsProps {
  tabs: ModuleTab[];
  onTabChange?: (tabId: string) => void;
}

export function ModuleTabs({ tabs, onTabChange }: ModuleTabsProps) {
  return (
    <div className="flex space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange?.(tab.id)}
          className={cn(
            "px-1 font-medium text-sm transition-colors py-3 border-b-4 my-0",
            tab.isActive
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
