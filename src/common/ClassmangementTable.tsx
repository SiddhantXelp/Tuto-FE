"use client";
import React from 'react';

type TableColumn<T> = {
  header: string;
  accessor: keyof T;
};

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
};

const ClassManagementTable = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="py-2 px-4 text-left bg-gray-200">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t ${
                rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-4 px-6 ">
                  {row[column.accessor] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassManagementTable;

