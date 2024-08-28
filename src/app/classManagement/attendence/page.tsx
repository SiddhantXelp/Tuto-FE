// "use client";

// import React, { useState } from 'react';
// import { RecentClassesColumns, RecentClassesData, StudentColumns, StudentsData } from './data';
// import Table from '@/components/table';
// import TabNavigator from "../../TabNavigator/page";

// const Attendance: React.FC = () => {

//   const [selectedOption, setSelectedOption] = useState('option1');

//   const handleOptionChange = (option: string) => {
//     setSelectedOption(option);
//   };

//   const getTableData = () => {
//     if (selectedOption === 'option1') {
//       return { columns: RecentClassesColumns, data: RecentClassesData };
//     }
//     return { columns: StudentColumns, data: StudentsData };
//   };

//   const { columns, data } = getTableData();

//   const renderContent = () => {
//     switch (selectedOption) {
//       case 'option1':
//         return (
//           <div>
//             <div className="flex flex-wrap space-x-5">
//               <div className="flex flex-col  w-full sm:w-[30%] md:w-[15%] mb-4">
//                 <h4 className="text-sm font-bold text-gray-600 mb-1">Least attendance</h4>
//                 <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600 mr-4">99. Suresh</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">98. Mathew</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">96. Lily</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">96. Lily</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col w-full sm:w-[30%] md:w-[15%] mb-4">
//                 <h4 className="text-sm font-bold text-gray-600 mb-1">Performance</h4>
//                 <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600 mr-4">99. Suresh</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">98. Mathew</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">96. Lily</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">96. Lily</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col  w-full sm:w-[30%] md:w-[15%] mb-4">
//                 <h4 className="text-sm font-bold text-gray-600 mb-1">Groups</h4>
//                 <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600 mr-4">Group A</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">Group A</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">Group A</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">Group A</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="relative w-3/12 h-10 flex bg-white text-center rounded-tl-lg rounded-tr-lg">
//               <div
//               />
//               <span
//                 className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tl-lg relative ${selectedOption === 'option1' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
//                 onClick={() => handleOptionChange('option1')}
//               >
//                 Recent Classes
//               </span>
//               <span
//                 className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tr-lg relative ${selectedOption === 'option1' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
//                 onClick={() => handleOptionChange('option2')}
//               >
//                 Students
//               </span>

//             </div>
//             <Table columns={columns} data={data} includeCheckbox={false} />

//           </div>
//         );
//       case 'option2':
//         return (
//           <div>
//             <div className="flex flex-wrap space-x-5">
//               <div className="flex flex-col  w-full sm:w-[30%] md:w-[15%] mb-4">
//                 <h4 className="text-sm font-bold text-gray-600 mb-1">Least attendance</h4>
//                 <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600 mr-4">99. Suresh</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">98. Mathew</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">96. Lily</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">96. Lily</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col w-full sm:w-[30%] md:w-[15%] mb-4">
//                 <h4 className="text-sm font-bold text-gray-600 mb-1">Performance</h4>
//                 <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600 mr-4">99. Suresh</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">98. Mathew</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">96. Lily</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">96. Lily</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col  w-full sm:w-[30%] md:w-[15%] mb-4">
//                 <h4 className="text-sm font-bold text-gray-600 mb-1">Groups</h4>
//                 <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600 mr-4">Group A</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">Group A</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">Group A</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">Group A</p>
//                     <p className="text-sm text-gray-600">5/25</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="relative w-3/12 h-10 flex bg-white text-center rounded-tl-lg rounded-tr-lg">
//               <div
//               />
//               <span
//                 className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tl-lg relative ${selectedOption === 'option2' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
//                 onClick={() => handleOptionChange('option1')}
//               >
//                 Recent Classes
//               </span>
//               <span
//                 className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tr-lg relative ${selectedOption === 'option2' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
//                 onClick={() => handleOptionChange('option2')}
//               >
//                 Students
//               </span>

//             </div>
//             <Table columns={StudentColumns} data={StudentsData} includeCheckbox={false} />

//           </div>
//         );

//         return (
//           <div className="flex flex-col w-full sm:w-[30%] md:w-[15%] mb-4">
//             <h4 className="text-sm font-bold text-gray-600 mb-1">Groups</h4>
//             <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
//               <div className="flex items-center justify-between">
//                 <p className="text-sm text-gray-600 mr-4">Group A</p>
//                 <p className="text-sm text-gray-600">5/25</p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <p className="text-sm text-gray-600">Group A</p>
//                 <p className="text-sm text-gray-600">5/25</p>
//               </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };


//   return (
//     <div>
//       {renderContent()}

//     </div>
//   );
// };

// export default Attendance;


// "use client";

// import React, { useState } from 'react';
// import { RecentClassesColumns, RecentClassesData, StudentColumns, StudentsData } from './data';
// import Table from '@/components/table';
// import LeastAttendance from './LeastAttendance';
// import Performance from './Performance';
// import RecentClasses from './RecentClasses';
// import Students from "./Students";

// const Attendance: React.FC = () => {
//   const [selectedOption, setSelectedOption] = useState('option1');
//   const [selectedSection, setSelectedSection] = useState<string | null>(null);

//   const handleOptionChange = (option: string) => {
//     setSelectedOption(option);
//     setSelectedSection(null);
//   };

//   const handleSectionClick = (section: string) => {
//     setSelectedSection(section);
//   };

//   const getTableData = () => {
//     if (selectedOption === 'option1') {
//       return { columns: RecentClassesColumns, data: RecentClassesData };
//     }
//     return { columns: StudentColumns, data: StudentsData };
//   };

//   const { columns, data } = getTableData();

//   const renderStatsSection = (title: string, items: string[]) => (
//     <div className="flex flex-col w-full sm:w-[30%] md:w-[15%] mb-4 cursor-pointer" onClick={() => handleSectionClick(title)}>
//       <h4 className="text-sm font-bold text-gray-600 mb-1">{title}</h4>
//       <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
//         {items.map((item, index) => (
//           <div key={index} className="flex items-center justify-between">
//             <p className="text-sm text-gray-600 mr-4">{item}</p>
//             <p className="text-sm text-gray-600">5/25</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderContent = () => {
//     const commonStats = {
//       "Least attendance": ["99. Suresh", "98. Mathew", "96. Lily", "95. John"],
//       Performance: ["99. Suresh", "98. Mathew", "96. Lily", "95. John"],
//       Groups: ["Group A", "Group B", "Group C", "Group D"],
//     };

//     if (selectedSection === 'Least attendance') {
//       return <LeastAttendance />;
//     } else if (selectedSection === 'Performance') {
//       return <Performance />;
//     }
//     else if (selectedSection === 'Recent Classes') {
//       return <RecentClasses />;
//     }
//     else if (selectedSection === 'Students') {
//       return <Students />;
//     }
//     const handleTableClick = () => {
//       if (selectedOption === 'option1') {
//         setSelectedSection("Recent Classes");
//       } else if (selectedOption === 'option2') {
//         setSelectedSection("Students");
//       }
//     };


//     return (
//       <div>
//         <div className="flex flex-wrap space-x-5">
//           {renderStatsSection("Least attendance", commonStats["Least attendance"])}
//           {renderStatsSection("Performance", commonStats.Performance)}
//           {renderStatsSection("Groups", commonStats.Groups)}
//         </div>

//         <div className="relative w-3/12 h-10 flex bg-white text-center rounded-tl-lg rounded-tr-lg">
//           <span
//             className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tl-lg relative ${selectedOption === 'option1' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
//             onClick={() => handleOptionChange('option1')}
//           >
//             Recent Classes
//           </span>
//           <span
//             className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tr-lg relative ${selectedOption === 'option2' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
//             onClick={() => handleOptionChange('option2')}
//           >
//             Students
//           </span>
//         </div>
//         <Table columns={columns} data={data} includeCheckbox={false} onRowClick={handleTableClick} />
//       </div>
//     );
//   };

//   return (
//     <div>
//       {renderContent()}
//     </div>
//   );
// };

// export default Attendance;


"use client";

import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { RecentClassesColumns, RecentClassesData, StudentColumns, StudentsData } from './data';
import Table from '@/components/table';
import LeastAttendance from './LeastAttendance';
import Performance from './Performance';
import RecentClasses from './RecentClasses';
import Students from "./Students";
import { useAppSelector } from '@/app/store/hooks';
import moment from 'moment';


const Attendance: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const classesData = useAppSelector((state: { classes: any }) => state.classes.setClasses?.classes);
  const [tableData, setTableData] = useState([]);

  const formatTime = (time: string) => {
    return time ? moment(time, 'HH:mm').format('hh:mm A') : 'NA';
  };

  const formattedDate = (isoDateString: any) => isoDateString ? moment(isoDateString).format('MMMM Do YYYY') : "NA";


  useEffect(() => {
    if (classesData && classesData.length > 0) {

      const updatedTableData = classesData.map((classData: any) => ({
        classTitle: classData?.title,
        subject: classData.subject.name,
        student: "Raj",
        date: formattedDate(classData?.scheduleDate),
        time: formatTime(classData.classStartTime),
        duration: "1hr",
        assignment: classData?.materialUrl

      }));
      setTableData(updatedTableData);
    }
  }, [classesData]);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setSelectedSection(null);
  };

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
  };

  const getTableData = () => {
    if (selectedOption === 'option1') {
      return { columns: RecentClassesColumns, data: tableData };
    }
    return { columns: StudentColumns, data: StudentsData };
  };

  const { columns, data } = getTableData();


  const renderStatsSection = (title: string, items: string[]) => (
    <div className="flex flex-col w-full sm:w-[30%] md:w-[15%] mb-4 cursor-pointer" onClick={() => handleSectionClick(title)}>
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

  const renderContent = () => {

    const commonStats = {
      "Least attendance": ["99. Suresh", "98. Mathew", "96. Lily", "95. John"],
      Groups: ["Group A", "Group B", "Group C", "Group D"],
    };

    if (selectedSection === 'Least attendance') {
      return <LeastAttendance />;
    } else if (selectedSection === 'Performance') {
      return <Performance />;
    }
    else if (selectedSection === 'Recent Classes') {
      return <RecentClasses />;
    }
    else if (selectedSection === 'Students') {
      return <Students />;
    }

    const handleTableClick = () => {
      if (selectedOption === 'option1') {
        setSelectedSection("Recent Classes");
      } else if (selectedOption === 'option2') {
        setSelectedSection("Students");
      }
    };

    return (
      <div>
        <div className="flex flex-wrap space-x-5">
          {renderStatsSection("Least attendance", commonStats["Least attendance"])}
          <div className="flex flex-col w-full sm:w-[30%] md:w-[15%] mb-4 cursor-pointer" onClick={() => handleSectionClick("Performance")}>
            <h4 className="text-sm font-bold text-gray-600 mb-1">Performance</h4>
            <div className="bg-white rounded-lg p-0 flex h-full">
              <div className="w-32 h-32 p-2">
                <CircularProgressbar
                  value={30}
                  text={``}
                  styles={buildStyles({
                    strokeLinecap: 'butt',
                    textSize: '16px',
                    pathTransitionDuration: 0.5,
                    pathColor: '#D1D1D1',
                    textColor: '#D1D1D1',
                    trailColor: '#B404C8',
                  })}
                />
              </div>
              <div className='flex-col mt-auto justify-end ml-4'>
                <div className='flex items-center'>
                  <h1 className='h-2 w-2 bg-[#D1D1D1]'></h1>
                  <h1 className='text-xs text-[#707070] ml-1'>Irregular: 18%</h1>
                </div>

                <div className='flex items-center'>
                  <h1 className='h-2 w-2 bg-[#B404C8]'></h1>

                  <h1 className='text-xs text-[#707070] ml-1'>Regular: 75%</h1>
                </div>

                <div className='flex items-center'>
                  <h1 className='h-2 w-2 bg-[#707070]'></h1>

                  <h1 className='text-xs text-[#707070] ml-1'>Leave: 7%</h1>
                </div>


              </div>
            </div>
          </div>
          {renderStatsSection("Groups", commonStats.Groups)}
        </div>

        <div className="relative w-3/12 h-10 flex bg-white text-center rounded-tl-lg rounded-tr-lg">
          <span
            className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tl-lg relative ${selectedOption === 'option1' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
            onClick={() => handleOptionChange('option1')}
          >
            Recent Classes
          </span>
          <span
            className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tr-lg relative ${selectedOption === 'option2' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
            onClick={() => handleOptionChange('option2')}
          >
            Students
          </span>
        </div>
        <Table columns={columns} data={data} includeCheckbox={false} onRowClick={handleTableClick} showRowColor={true} border={"rounded-b-2xl rounded-tr-2xl"}/>
      </div>
    );
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default Attendance;

