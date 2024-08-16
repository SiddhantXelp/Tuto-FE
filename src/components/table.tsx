// components/ClassTable.tsx

import React from 'react';

interface Column {
  header: string;
  key: string;
  isCheckbox?: boolean;
}

interface Props {
  columns: Column[];
  data: any[];
  includeCheckbox?: boolean;
}

const Table: React.FC<Props> = ({ columns, data, includeCheckbox = true }) => {
  return (
    <div className="overflow-x-auto shadow-2xl">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {includeCheckbox && (
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-buttonGray">
                <input type="checkbox" />
              </th>
            )}
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 text-left text-xs font-medium text-buttonGray uppercase tracking-wider bg-lightGray ">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {includeCheckbox && (
                <td className="px-4 py-3"> 
                  <input type="checkbox" />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-3 text-xs text-buttonGray"> {/* Added vertical padding here */}
                  {column.isCheckbox ? (
                    <input type="checkbox" />
                  ) : (
                    item[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
