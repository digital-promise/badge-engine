"use client";

import React, { useState, type ReactNode } from "react";

export interface TabListProps {
  tabs: {
    id: string;
    label: string;
    content: ReactNode;
  }[];
}

export const TabList = ({ tabs }: TabListProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(tabs[0]?.id);

  if (tabs.length <= 1) return tabs.map((tab) => tab.content);

  const activeTab = tabs.find((tab) => tab.id === selectedId);

  return (
    <div>
      <nav className="mb-7">
        <ul className="flex">
          {tabs.map((tab, index) => (
            <li key={index} className="font-bold text-gray-5">
              <button
                data-active={selectedId === tab.id || null}
                className="border border-gray-1 border-b-gray-3 bg-gray-1 px-5 py-4 data-[active]:border-blue-3 data-[active]:bg-neutral-1 data-[active]:text-blue-4 data-[active]:border-b-neutral-1"
                type="button"
                onClick={() => setSelectedId(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
          <li className="border-b border-gray-3 flex-1"></li>
        </ul>
      </nav>

      {activeTab?.content}
    </div>
  );
};

export default TabList;
