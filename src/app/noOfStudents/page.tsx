"use client"
import React, { useState } from 'react';
const NumberStudents = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const Selectoptions = [
    {
      label: 'Filter',
      name: 'Filter',
      Optionlabel: '',
      options: [
        { label: 'Group A', value: 'Group A' },
        { label: 'Group B', value: 'Group B' },
        { label: 'Group C', value: 'Group C' },
        { label: 'Group D', value: 'Group D' },
      ],
      Secondoptions: [
        { label: 'English', value: 'English' },
        { label: 'Maths', value: 'Maths' },
        { label: 'Telugu', value: 'Telugu' },
      ],
    },
  ];

  const TableFilter =[
    {
     label:"TableFilter",
     name:"TableFilter",
     Subjectoptions: [
    { label: 'English', value: 'English' },
    { label: 'Maths', value: 'Maths' },
    { label: 'Telugu', value: 'Telugu' },
  ],
}
]

  const students = [
    { name: 'Shiva', grade: '05th', subjects: 'English,', attendance: '02/20', parentContact: '+91 955458465', Absent: '18', performance: '2% ↓' },
    
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
    <div className='flex flex-row items-center gap-10'>
       <div >
        <select
          name=""
          value={selectedOption}
          onChange={handleSelectChange}
          className="block w-72 h-10 p-2 mt-1 text-buttonGray border-buttonGray rounded-md border-1 shadow-sm focus:ring-indigo-500 focus:border-gray-300 sm:text-sm bg-white"
        >
          <option className="text-buttonGray text-sm">All Students :280</option>
          <option className="text-buttonGray text-sm mt-2">All Students</option>
          <option className="text-buttonGray text-xxs">. Groups</option>
          {Selectoptions[0]?.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          <option className="text-buttonGray text-xxs">. Subjects</option>
          {Selectoptions[0]?.Secondoptions.map(option => (
            <option key={option.value} value={option.value} className="bg-white text-sm">
              {option.label}
            </option>
          ))}
        </select>
      </div>  

     <div className='w-72 h-10 bg-buttonGray flex justify-center items-center border rounded-lg  p-1'>
        <span className='text-white'>Add student  +</span>
     </div>
     </div>
  <div className="mt-10 ">
  <h2 className="text-lg font-semibold mb-4">Recently added students</h2>
    <table className=" w-11/12	 bg-white border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-slate-100">
          <th className="py-2 px-4 border-b text-left text-buttonGray">Name</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray"> 
            <select
             name=""
             value={selectedOption}
             onChange={handleSelectChange}
            >
             <option>Subjects</option>
                {TableFilter[0]?.Subjectoptions.map(option => (
                <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
            </select>
          </th>
          <th className="py-2 px-4 border-b text-left text-buttonGray">Attendance</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray">Parent contact</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray">Absent</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b text-buttonGray">{student.grade}</td>
            <td className="py-2 px-4 border-b text-buttonGray">{student.subjects}</td>
            <td className="py-2 px-4 border-b text-buttonGray">{student.attendance}</td>
            <td className="py-2 px-4 border-b text-buttonGray">{student.parentContact}</td>
            <td className="py-2 px-4 border-b text-buttonGray">{student.Absent}</td>
            <td className="py-2 px-4 border-b text-buttonGray">{student.performance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>


   
    </>
  );
};

export default NumberStudents;
