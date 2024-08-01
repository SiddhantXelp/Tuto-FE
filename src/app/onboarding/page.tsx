"use client";
import React, { useState, ChangeEvent } from 'react';
import InputMain from '@/common/InputMain';
import Link from 'next/link';
import TabNavigator from "../TabNavigator/page";

interface Field {
  labelName: string;
  type: string;
  name: string;
  id: string;
  value: string;
  radioOptions?: { label: string; value: string }[];
}

const fields: Field[] = [
  {
    labelName: "Name",
    type: "text",
    name: "name",
    id: "username",
    value: ""
  },
  {
    labelName: "Gender",
    type: "radio",
    name: "gender",
    id: "gender",
    value: "",
    radioOptions: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Prefer not to disclose", value: "Prefer not to disclose" }
    ]
  },
  {
    labelName: "DOB",
    type: "date",
    name: "dob",
    id: "dob",
    value: ""
  },
  {
    labelName: "Mobile Number",
    type: "number",
    name: "mobileNumber",
    id: "mobileNumber",
    value: ""
  },
  {
    labelName: "Email",
    type: "email",
    name: "email",
    id: "email",
    value: ""
  }
];

const OnboardingPage: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    name: '',
    gender: '',
    dob: '',
    mobileNumber: '',
    email: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (


    <TabNavigator>

      <div className='flex justify-center items-center h-auto'>

        <div className='w-2/4 bg-gray-100 shadow-lg rounded p-16 mt-10'>
          <span className='font-medium text-xl text-buttonGray block mb-4'>Student details</span>
          {fields.map((field) => (
            <InputMain
              key={field.id}
              label={field.labelName}
              type={field.type}
              name={field.name}
              id={field.id}
              value={formData[field.name]}
              onChange={handleInputChange}
              radioOptions={field.radioOptions}
            />
          ))}
          <Link href="/studentRequirements">
            <div>
              <button className='w-full bg-buttonGray h-10 rounded-md text-white'>Next</button>
            </div>
          </Link>
        </div>



      </div>
    </TabNavigator>
  );
};

export default OnboardingPage;
