"use client";
import React, { useState, lazy, Suspense } from 'react';
import { allStudentsColumns, allStudentsData } from '../studentsTable/data';
import TabNavigator from "@/app/TabNavigator/page";
import { FiPlus } from "react-icons/fi";
import Link from 'next/link';
const SearchComponent = lazy(() => import('@/common/SearchComponent'));
const Table = lazy(() => import('@/components/table'));

const SubjectsBasedTable: React.FC = () => {
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const [formData, setFormData] = useState({});
   const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <TabNavigator>
      <div className='flex flex-row items-center gap-10 m-5'>
        <div>
         <select
             name=""
             value={selectedOption}
             onChange={handleSelectChange}
             className="block w-72 h-10 p-2 mt-1 text-buttonGray border-buttonGray rounded-md border-1 shadow-sm focus:ring-indigo-500 focus:border-gray-300  bg-white text-xs"
            >
            <option className="text-buttonGray text-sm mt-2">All Students</option>
            <option className="text-buttonGray text-sm">Groups</option>
            {Selectoptions[0]?.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            <option className="text-buttonGray text-sm">Subjects</option>
            {Selectoptions[0]?.Secondoptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <Link href="/onboarding">
          <button className='bg-gray-500 rounded-2xl p-2  text-white flex text-sm w-48 text-center justify-center'>
            Add Student <FiPlus className="mt-1 ml-2" color="white" />
          </button>
        </Link>
      </div>

      <div className="mt-5 m-5">
        <div className='w-64 border-white ml-auto mr-3'>
          <Suspense fallback={<div>Loading Search...</div>}>
            <SearchComponent onSearch={handleChange} />
          </Suspense>
        </div>
        <Suspense fallback={<div>Loading Table...</div>}>
          <Table columns={allStudentsColumns} data={allStudentsData} includeCheckbox={false} />
        </Suspense>
      </div>
    </TabNavigator>
  );
};

export default SubjectsBasedTable;
