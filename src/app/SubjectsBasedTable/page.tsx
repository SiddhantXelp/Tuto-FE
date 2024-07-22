"use client"
import SearchComponent from '@/common/SearchComponent';
import React, { useState } from 'react'

const SubjectsBasedTable = () => {
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
    { name: 'Shiva', grade: '03th', subjects: 'English,', attendance: '02/20', parentContact: '+91 955458465', Absent: '18', Remarks: '02' },
    { name: 'Srinu', grade: '04th', subjects: 'Telugu,', attendance: '02/20', parentContact: '+91 955458465', Absent: '16', Remarks: '30min' },
    { name: 'Shiva', grade: '05th', subjects: 'English,', attendance: '02/20', parentContact: '+91 955458465', Absent: '1', Remarks: '20min' },
    { name: 'Nithish', grade: '10th', subjects: 'English,', attendance: '02/20', parentContact: '+91 955458465', Absent: '10', Remarks: '30min' },
    { name: 'Gopi', grade: '02th', subjects: 'Telugu,', attendance: '02/20', parentContact: '+91 955458465', Absent: '18', Remarks: '30min' },
    { name: 'Prakash', grade: '09th', subjects: 'English,', attendance: '02/20', parentContact: '+91 955458465', Absent: '18', Remarks: '40min' },
    { name: 'Kishore', grade: '08th', subjects: 'Telugu,', attendance: '02/20', parentContact: '+91 955458465', Absent: '15', Remarks: '30min' },
    { name: 'jp', grade: '06th', subjects: 'English,', attendance: '02/20', parentContact: '+91 955458465', Absent: '11', Remarks: '30min' },
    { name: 'kondal', grade: '15th', subjects: 'Telugu,', attendance: '02/20', parentContact: '+91 955458465', Absent: '14', Remarks: '30min' },
    { name: 'Ram', grade: '01th', subjects: 'English,', attendance: '02/20', parentContact: '+91 955458465', Absent: '11', Remarks: '30min' },
    { name: 'Shiva', grade: '07th', subjects: 'English,', attendance: '02/20', parentContact: '+91 955458465', Absent: '18', Remarks: '25min' },

    
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const [formData,setFormData]=useState({})
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
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
          <option className="text-buttonGray text-sm">English</option>
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
     </div>
  <div className="mt-10 ">
    <div className='w-64 border-white ml-auto mr-32'>
    <SearchComponent onSearch={handleChange}/>
    </div>
    <table className=" w-11/12	 bg-white border border-gray-200 rounded-xl">
      <thead>
        <tr className="bg-slate-50 h-14">
          <th className="py-2 px-4 border-b text-left text-buttonGray text-sm">Name</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray text-sm"> 
            <select
             name=""
             value={selectedOption}
             onChange={handleSelectChange}
            >
             <option className='text-sm text-buttonGray '>Subjects</option>
                {TableFilter[0]?.Subjectoptions.map(option => (
                <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
            </select>
          </th>
          <th className="py-2 px-4 border-b text-left text-buttonGray text-sm">Attendance</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray text-sm">Parent contact</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray text-sm">Absent</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray text-sm">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index} className="hover:bg-gray-100 h-16">
            <td className="py-2 px-4 border-b text-buttonGray text-xxs">{student.name}</td>
            <td className="py-2 px-4 border-b text-buttonGray text-xxs">{student.subjects}</td>
            <td className="py-2 px-4 border-b text-buttonGray text-xxs">{student.attendance}</td>
            <td className="py-2 px-4 border-b text-buttonGray text-xxs">{student.parentContact}</td>
            <td className="py-2 px-4 border-b text-buttonGray text-xxs">{student.Absent}</td>
            <td className="py-2 px-4 border-b text-buttonGray text-xxs">{student.Remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>


   
    </>
  )
}

export default SubjectsBasedTable