// // components/ClassTable.tsx

// import React from 'react';

// interface Column {
//   header: string;
//   key: string;
//   isCheckbox?: boolean;
// }

// interface Props {
//   columns: Column[];
//   data: any[];
//   includeCheckbox?: boolean;
// }

// const Table: React.FC<Props> = ({ columns, data, includeCheckbox = true }) => {
//   return (
//     <div className="overflow-x-auto shadow-lg">
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr>
//             {includeCheckbox && (
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-[#F5F5F5]">
//                 <input type="checkbox" />
//               </th>
//             )}
//             {columns.map((column, index) => (
//               <th key={index} className="px-4 py-2 text-left text-sm font-medium text-[#707070] uppercase tracking-wider bg-[#F5F5F5] h-[50px]">
//                 {column.header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, rowIndex) => (
//             <tr key={rowIndex} className="border-t">
//               {includeCheckbox && (
//                 <td className="px-4 py-3"> 
//                   <input type="checkbox" />
//                 </td>
//               )}
//               {columns.map((column, colIndex) => (
//                 <td key={colIndex} className="px-6 py-3 text-sm text-gray-500 h-[40px]"> {/* Added vertical padding here */}
//                   {column.isCheckbox ? (
//                     <input type="checkbox" />
//                   ) : (
//                     item[column.key] || "NA"
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Table;

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
  onRowClick?: (rowData: any) => void; // Add this prop
}

const Table: React.FC<Props> = ({ columns, data, includeCheckbox = true, onRowClick }) => {
  const handleRowClick = (rowData: any) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  return (
    <div className="overflow-x-auto shadow-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {includeCheckbox && (
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider bg-[#F5F5F5]">
                <input type="checkbox" />
              </th>
            )}
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 text-left text-sm font-medium text-[#707070] tracking-wider bg-[#F5F5F5] h-[50px]">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(item)} 
            >
              {includeCheckbox && (
                <td className="px-4 py-3">
                  <input type="checkbox" />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-3 text-sm text-gray-500 h-[40px]">
                  {column.isCheckbox ? (
                    <input type="checkbox" />
                  ) : (
                    item[column.key] || "NA"
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
