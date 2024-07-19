// components/ClassTable.tsx

import React from 'react';

interface ClassData {
  classTitle: string;
  subject: string;
  student: string;
  date: string;
  time: string;
  duration: string;
  assignment: string;
  material: string;
}

interface Props {
  data: ClassData[];
}

const Table: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xxxs font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" />
            </th>
            <th className="px-4 py-2 text-left text-xxxs font-medium text-gray-500 uppercase tracking-wider">Class Title</th>
            <th className="px-4 py-2 text-left text-xxxs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
            <th className="px-4 py-2 text-left text-xxxs font-medium text-gray-500 uppercase tracking-wider">Student</th>
            <th className="px-4 py-2 text-left text-xxxs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-2 text-left text-xxxs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-4 py-2 text-left text-xxxs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
            <th className="px-4 py-2 text-left text-xxxs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
            <th className="px-4 py-2 text-left text-xxxs font-medium text-gray-500 uppercase tracking-wider">Material</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-2 text-xxxs text-gray-500">{item.classTitle}</td>
              <td className="px-4 py-2 text-xxxs text-gray-500">{item.subject}</td>
              <td className="px-4 py-2 text-xxxs text-gray-500">{item.student}</td>
              <td className="px-4 py-2 text-xxxs text-gray-500">{item.date}</td>
              <td className="px-4 py-2 text-xxxs text-gray-500">{item.time}</td>
              <td className="px-4 py-2 text-xxxs text-gray-500">{item.duration}</td>
              <td className="px-4 py-2 text-xxxs text-gray-500">{item.assignment}</td>
              <td className="px-4 py-2 text-xxxs text-gray-500">{item.material}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
