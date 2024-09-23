// "use client"

// import SearchComponent from '@/common/SearchComponent';
// import Table from '@/components/table';
// import { allStudentsColumns } from '../studentsTable/data';
// import React, { useEffect, useMemo, useState } from 'react';
// import TabNavigator from "@/app/TabNavigator/page";
// import { useSearchParams } from 'next/navigation';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { getStudentGroup } from '../store/actions/student';

// const SubjectsBasedTable = () => {
//   const searchParams = useSearchParams();
//   const groupId = searchParams.get("group");
//   const dispatch = useAppDispatch();

//   const [selectedOption, setSelectedOption] = useState<string | undefined>(groupId || 'All Students');
//   const [formData, setFormData] = useState({});

//   const studentGroups = useAppSelector((state: { classes: any }) => state.classes.getstudentgroup?.data || []);
//   const studentGroupsDetails = useAppSelector((state: { student: any }) => state?.student?.getStudentGroup?.data?.students || []);
//   const studentData = useAppSelector((state: { student: any }) => state.student?.getStudents?.students || []);
//   const token = useAppSelector(state => state?.auth?.login?.token || "");
//   const studentId = searchParams.get('allStudent');

//   const transformedGroupOptions = studentGroups?.map((group: any) => ({
//     value: group.id,
//     label: group.title,
//   })) ?? [];

//   useEffect(() => {
//     if (groupId != null || selectedOption !== "All Students") {
//       if (token) {
//         dispatch(getStudentGroup(token, String(groupId || selectedOption)))
//       }
//     }
//   }, [groupId, selectedOption]);

//   // Memoize all student data
//   const allStudentData = useMemo(() => {
//     return (studentData || []).map((student: any) => ({
//       id: student.id,
//       name: student?.fullName,
//     }));
//   }, [studentData]);

//   // Memoize group data
//   const StudentGroupData = useMemo(() => {
//     return (studentGroupsDetails || []).map((student: any) => ({
//       id: student.id,
//       name: student?.fullName,
//     }));
//   }, [studentGroupsDetails]);

//   // Handle selection change
//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedOption(e.target.value);
//   };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const tableData = selectedOption === "All Students" ? allStudentData : StudentGroupData;

//   return (
//     <TabNavigator>
//       <div className="flex flex-row items-center gap-10 m-5">
//         <div>
//           <select
//             value={selectedOption}
//             onChange={handleSelectChange}
//             className="block w-72 h-10 p-2 mt-1 text-buttonGray border-buttonGray rounded-md border-1 shadow-sm focus:ring-indigo-500 focus:border-gray-300 bg-white text-xs"
//           >
//             <option value="All Students" className="text-buttonGray text-base font-bold">
//               All Students
//             </option>
//             <option disabled className="text-buttonGray text-sm font-bold">Groups</option>
//             {transformedGroupOptions.map((option) => (
//               <option key={option.value} value={option.value} className="text-base">
//                 {option.label}
//               </option>
//             ))}
//             <option disabled className="text-buttonGray text-sm font-bold">Subjects</option>
//             {/* Additional subject options if needed */}
//           </select>
//         </div>
//       </div>

//       <div className="mt-10 m-5">
//         <div className="w-64 border-white ml-auto mr-3">
//           <SearchComponent onSearch={handleChange} />
//         </div>

//         <Table
//           columns={allStudentsColumns}
//           data={tableData} // Conditionally render the table data based on selectedOption
//           includeCheckbox={false}
//           border="rounded-tl-2xl rounded-b-2xl"
//         />
//       </div>
//     </TabNavigator>
//   );
// };

// export default SubjectsBasedTable;



"use client"

import SearchComponent from '@/common/SearchComponent';
import Table from '@/components/table';
import { allStudentsColumns } from '../studentsTable/data';
import React, { useEffect, useMemo, useState } from 'react';
import TabNavigator from "@/app/TabNavigator/page";
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getStudentGroup } from '../store/actions/student';
import { FiPlus } from "react-icons/fi";

const SubjectsBasedTable = () => {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group");
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState<string | undefined>(groupId || 'All Students');
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const studentGroups = useAppSelector((state: { classes: any }) => state.classes.getstudentgroup?.data || []);
  const studentGroupsDetails = useAppSelector((state: { student: any }) => state?.student?.getStudentGroup?.data?.students || []);
  const studentData = useAppSelector((state: { student: any }) => state.student?.getStudents?.students || []);
  const token = useAppSelector(state => state?.auth?.login?.token || "");
  const studentId = searchParams.get('allStudent');
  
  const transformedGroupOptions = studentGroups?.map((group: any) => ({
    value: group.id,
    label: group.title,
  })) ?? [];

  useEffect(() => {
    if (groupId != null || selectedOption !== "All Students") {
      if (token) {
        dispatch(getStudentGroup(token, String(groupId || selectedOption)))
      }
    }

  }, [groupId, selectedOption]);

  // Memoize all student data
  const allStudentData = useMemo(() => {
    return (studentData || []).map((student: any) => ({
      id: student.id,
      name: student?.fullName,
    }));
  }, [studentData]);

  // Memoize group data
  const StudentGroupData = useMemo(() => {
    return (studentGroupsDetails || []).map((student: any) => ({
      id: student.id,
      name: student?.fullName,
    }));
  }, [studentGroupsDetails]);

  // Handle selection change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSearchChange = (query: string) => {
    console.log(":queryquery", query)
    setSearchQuery(query); // Update search query when user types in the search input
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Filter table data based on searchQuery
  const filteredTableData = useMemo(() => {
    const dataToFilter = selectedOption === "All Students" ? allStudentData : StudentGroupData;

    if (!searchQuery) return dataToFilter;

    // Filter data based on the search query (case-insensitive)
    return dataToFilter.filter((student: any) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, selectedOption, allStudentData, StudentGroupData]);

  return (
    <TabNavigator>
      <div className="flex flex-row items-center gap-10 m-5">
        <div>
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="block w-72 h-10 p-2 mt-1 text-buttonGray border-buttonGray rounded-md border-1 shadow-sm focus:ring-indigo-500 focus:border-gray-300 bg-white text-xs"
          >
            <option value="All Students" className="text-buttonGray text-base font-bold">
              All Students
            </option>
            <option disabled className="text-buttonGray text-sm font-bold">Groups</option>
            {transformedGroupOptions.map((option: any) => (
              <option key={option.value} value={option.value} className="text-base">
                {option.label}
              </option>
            ))}
            <option disabled className="text-buttonGray text-sm font-bold">Subjects</option>
            {/* Additional subject options if needed */}
          </select>
        </div>
        <div>
          <button className='bg-primaryColor p-2 rounded-2xl w-48 text-white text-sm h-10 flex justify-evenly'> Add student <FiPlus size={20} /></button>
        </div>
      </div>

      <div className="mt-10 m-5">
        <div className="w-64 border-white ml-auto mr-3">
          {/* Pass handleSearchChange to SearchComponent */}
          <SearchComponent onSearch={handleSearchChange} />
        </div>

        <Table
          columns={allStudentsColumns}
          data={filteredTableData} // Render filtered table data based on the search query
          includeCheckbox={false}
          border="rounded-tl-2xl rounded-b-2xl"
        />
      </div>
    </TabNavigator>
  );
};

export default SubjectsBasedTable;

