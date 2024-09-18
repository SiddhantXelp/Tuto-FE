// import React, { useState } from 'react';

// interface Column {
//   header: string;
//   key: string;
//   isCheckbox?: boolean;
// }

// interface Props {
//   columns: Column[];
//   data: any[];
//   includeCheckbox?: boolean;
//   onRowClick?: (rowData: any) => void; // Pass row data without ID
//   onCheckboxChange?: (selectedIds: string[]) => void; // Pass selected IDs
//   showRowColor?: boolean;
//   border: String;
// }

// const Table: React.FC<Props> = ({
//   columns,
//   data,
//   includeCheckbox = true,
//   onRowClick,
//   onCheckboxChange, // New prop for handling checkbox selections
//   showRowColor,
//   border,
// }) => {
//   const [selectedRows, setSelectedRows] = useState<string[]>([]);
//   const [selectAll, setSelectAll] = useState<boolean>(false);

//   // Handle row click (without passing ID directly)
//   const handleRowClick = (rowData: any) => {
//     if (onRowClick) {
//       onRowClick(rowData);
//     }
//   };

//   // Handle individual row checkbox click
//   const handleCheckboxChange = (id: string) => {
//     const isSelected = selectedRows.includes(id);
//     const newSelectedRows = isSelected
//       ? selectedRows.filter((rowId) => rowId !== id)
//       : [...selectedRows, id];

//     setSelectedRows(newSelectedRows);

//     // Notify parent component about the checkbox changes
//     if (onCheckboxChange) {
//       onCheckboxChange(newSelectedRows);
//     }
//   };

//   // Handle "select all" checkbox
//   const handleSelectAllChange = () => {
//     if (selectAll) {
//       setSelectedRows([]); // Deselect all rows
//       if (onCheckboxChange) onCheckboxChange([]); // Notify parent component
//     } else {
//       const allIds = data.map((item) => item.id); // Select all rows
//       setSelectedRows(allIds);
//       if (onCheckboxChange) onCheckboxChange(allIds); // Notify parent component
//     }
//     setSelectAll(!selectAll);
//   };

//   return (
//     <div className={`overflow-x-auto shadow-lg ${border}`}>
//       <table className={`min-w-full bg-white border border-gray-200`}>
//         <thead>
//           <tr>
//             {includeCheckbox && (
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider bg-[#F5F5F5]">
//                 <input
//                   type="checkbox"
//                   checked={selectAll}
//                   onChange={handleSelectAllChange}
//                 />
//               </th>
//             )}
//             {columns.map((column, index) => (
//               <th
//                 key={index}
//                 className="px-4 py-2 text-left text-sm font-medium text-[#707070] tracking-wider bg-[#F5F5F5] h-[50px]"
//               >
//                 {column.header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, rowIndex) => (
//             <tr
//               key={rowIndex}
//               className={`border-t cursor-pointer hover:bg-gray-100 ${
//                 showRowColor
//                   ? rowIndex % 2 === 0
//                     ? 'bg-[#F9F9F9]'
//                     : 'bg-white'
//                   : ''
//               }`}
//             >
//               {includeCheckbox && (
//                 <td className="px-4 py-3">
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.includes(item.id)}
//                     onChange={() => handleCheckboxChange(item.id)} // Checkbox click handler
//                   />
//                 </td>
//               )}
//               {columns.map((column, colIndex) => (
//                 <td
//                   key={colIndex}
//                   className="px-6 py-3 text-sm text-gray-500 h-[40px]"
//                   onClick={() => handleRowClick(item)} // Row click handler
//                 >
//                   {column.isCheckbox ? (
//                     <input type="checkbox" />
//                   ) : (
//                     item[column.key] || 'NA'
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {data.length === 0 && (
//         <div className="px-6 py-3 text-center text-gray-500 h-80 flex justify-center items-center mt-auto bg-gray-100 rounded-lg">
//           No data available at the moment.
//         </div>
//       )}
//     </div>
//   );
// };

// export default Table;

import React, { useState } from 'react';
import { BsDownload } from 'react-icons/bs';

interface Column {
  header: string;
  key: string;
  isCheckbox?: boolean;
  dropdownOptions?: string[]; // Added for dropdown options
}

interface Props {
  columns: Column[];
  data: any[];
  includeCheckbox?: boolean;
  onRowClick?: (rowData: any) => void; // Pass row data without ID
  onCheckboxChange?: (selectedIds: string[]) => void; // Pass selected IDs
  showRowColor?: boolean;
  border: String;
  onDownloadClick?: (rowData: any) => void; // Pass row data without ID

}

const Table: React.FC<Props> = ({
  columns,
  data,
  includeCheckbox = true,
  onRowClick,
  onCheckboxChange, // New prop for handling checkbox selections
  showRowColor,
  border,
  onDownloadClick
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [dropdownValue, setDropdownValue] = useState<{ [key: string]: string }>({});

  // Handle row click (without passing ID directly)
  const handleRowClick = (rowData: any) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  const handelDownloadFile = (rowData: any) => {
    if (onDownloadClick) {
      onDownloadClick(rowData);
    }

  }

  // Handle individual row checkbox click
  const handleCheckboxChange = (id: string) => {
    const isSelected = selectedRows.includes(id);
    const newSelectedRows = isSelected
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];

    setSelectedRows(newSelectedRows);

    // Notify parent component about the checkbox changes
    if (onCheckboxChange) {
      onCheckboxChange(newSelectedRows);
    }
  };

  // Handle "select all" checkbox
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRows([]); // Deselect all rows
      if (onCheckboxChange) onCheckboxChange([]); // Notify parent component
    } else {
      const allIds = data.map((item) => item.id); // Select all rows
      setSelectedRows(allIds);
      if (onCheckboxChange) onCheckboxChange(allIds); // Notify parent component
    }
    setSelectAll(!selectAll);
  };

  // Handle dropdown value change
  const handleDropdownChange = (key: string, value: string) => {
    setDropdownValue((prev) => ({ ...prev, [key]: value }));
    console.log(`Dropdown value for ${key}: ${value}`);
  };

  return (
    <div className={`overflow-x-auto shadow-lg ${border}`}>
      <table className={`min-w-full bg-white border border-gray-200`}>
        <thead>
          <tr>
            {includeCheckbox && (
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider bg-[#F5F5F5]">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
            )}
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-sm font-medium text-[#707070] tracking-wider bg-[#F5F5F5] h-[50px]"
              >
                <div className="flex items-center space-x-2">
                  {!column.dropdownOptions && (
                    <span>{column.header}</span>
                  )}
                  {column.dropdownOptions && (
                    <select
                      className="p-1 border rounded-md text-sm bg-white ml-2" // Add margin to separate from header text
                      value={dropdownValue[column.key] || ''}
                      onChange={(e) => handleDropdownChange(column.key, e.target.value)}
                    >
                      <option value="">{column.header}</option>
                      {column.dropdownOptions.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </th>
            ))}

          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t cursor-pointer hover:bg-gray-100 ${showRowColor
                ? rowIndex % 2 === 0
                  ? 'bg-[#F9F9F9]'
                  : 'bg-white'
                : ''
                }`}
            >
              {includeCheckbox && (
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)} // Checkbox click handler
                  />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-3 text-sm text-gray-500 h-[40px]"
                  onClick={() => handleRowClick(item)}
                >
                  {column.isCheckbox ? (
                    <input type="checkbox" />
                  ) : column.key === 'download' ? (
                    // <div onClick={() => handelDownloadFile(item)}></div>
                    <a
                      style={{ textDecoration: 'none',width:"200px" }}
                      onClick={(e) => { e.stopPropagation(); handelDownloadFile(item) }}
                    >
                      <BsDownload color="gray" size={13} style={{ cursor: 'pointer' }} />
                    </a>
                  ) : (
                    item[column.key] || 'NA'
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="px-6 py-3 text-center text-gray-500 h-56 flex justify-center items-center mt-auto bg-gray-100 rounded-b-lg">
          No data available at the moment.
        </div>
      )}
    </div>
  );
};

export default Table;
