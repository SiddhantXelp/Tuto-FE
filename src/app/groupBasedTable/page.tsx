"use client"
import SearchComponent from '@/common/SearchComponent';
import Table from '@/components/table';
import { allStudentsColumns, allStudentsData } from '../studentsTable/data';
import React, { useState } from 'react'

const GroupBasedTable = () => {
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
          <option className="text-buttonGray text-sm">Group A</option>
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
    <div className='w-64 border-white ml-auto '>
    <SearchComponent onSearch={handleChange}/>
    </div>
    <Table columns={allStudentsColumns} data={allStudentsData} includeCheckbox={false} />
  </div>


   
    </>
  )
}

export default GroupBasedTable