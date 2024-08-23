// src/components/AttendanceCards.tsx

import React from 'react';

interface AttendanceCardProps {
  title: string;
  items: string[];
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({ title, items }) => (
  <div className="flex flex-col w-full sm:w-[30%] md:w-[15%] mb-4 cursor-pointer">
    <h4 className="text-sm font-bold text-gray-600 mb-1">{title}</h4>
    <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <p className="text-sm text-gray-600 mr-4">{item}</p>
          <p className="text-sm text-gray-600">5/25</p>
        </div>
      ))}
    </div>
  </div>
);

export const LeastAttendanceCard = () => (
  <AttendanceCard title="Least attendance" items={["99. Suresh", "98. Mathew", "96. Lily", "95. John"]} />
);

export const GroupsCard = () => (
  <AttendanceCard title="Groups" items={["Group A", "Group B", "Group C", "Group D"]} />
);

export default AttendanceCard;
