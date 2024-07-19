"use client";
import React, { useState, ChangeEvent } from 'react';
import SelectMain from '@/common/SelectMain'; // Ensure the path is correct
import Link from 'next/link';

const options = [
  {
    label: "Grade",
    name: "grade",
    options: [
      { label: "Nursery/pre-KG", value: "Nursery/pre-KG" },
      { label: "Kindergarten/KG", value: "Kindergarten/KG" },
      { label: "Primary School(Grade 1-5)", value: "Primary School(Grade 1-5)" },
      { label: "Secondary School(9-10)", value: "Secondary School(9-10)" },
    ],
  },
  {
    label: "Subjects",
    name: "subjects",
    options: [
      { label: "English", value: "English" },
      { label: "Mathematics", value: "Mathematics" },
      { label: "Science", value: "Science" },
      { label: "Social Studies", value: "Social Studies" },
      { label: "Hindi", value: "Hindi" },
      { label: "Second Language", value: "Second Language" },
      { label: "Art/Music", value: "Art/Music" },
      { label: "Computer Science/Information Technology", value: "Computer Science/Information Technology" },
      { label: "Environmental Studies", value: "Environmental Studies" },
      { label: "Moral Science", value: "Moral Science" },
    ],
  },
  {
    label: "Board education",
    name: "boardeducation",
    options: [
      { label: "CBSE", value: "CBSE" },
      { label: "ICSE", value: "ICSE" },
      { label: "State Board", value: "State Board" },
    ],
  },
];

const StudentRequirementForm: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({
    grade: '',
    subjects: '',
    boardeducation: ''
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [name]: value
    }));
  };
  console.log(selectedOptions);
  

  return (
    <div className='flex justify-center items-center h-auto'>
      <div className='w-2/4 bg-gray-100 shadow-lg rounded p-16 mt-10 border-gray-300 border-solid border-2'>
        <span className='font-medium text-xl text-buttonGray block mb-4'>Student Requirements</span>
        <div className='mt-16'>
          {options.map((option) => (
            <SelectMain
              key={option.name}
              label={option.label}
              name={option.name}  
              options={option.options}  
              value={selectedOptions[option.name]}
              onChange={handleChange}
            />
          ))}
          <Link href="/createpacage">
            <div>
              <button className='w-full bg-buttonGray h-10 rounded-md text-white'>Next</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentRequirementForm;
