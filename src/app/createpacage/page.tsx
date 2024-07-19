"use client";
import InputMain from '@/common/InputMain';
import InputWithIcon from '@/common/InputWithIcon';
import SelectMain from '@/common/SelectMain';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

interface ButtonItem {
  id: number;
  name: string;
}

interface PricingButtonItem {
  id: number;
  name:string;
}

interface SelectOption {
  label: string;
  value: string;
}

interface SelectMainOption {
  name: string;
  label: string;
  options: SelectOption[];
}

interface RadioOption {
  label: string;
  value: string;
}

const CreatePacage: React.FC = () => {
  const [formData, setFormData] = useState({
    inputValue: '',
    selectedDays: [] as string[],
    Pricing: [] as string[],
    selectedOptions: {
      boardeducation: ''
    },
    radioValue: '',
    pricingInputs: {
      Onetime: '',
      Hourly: '',
      Weekly: '',
      Monthly: '',
      Annually: ''
    }
  });

  const buttons: ButtonItem[] = [
    { id: 1, name: "Sunday" },
    { id: 2, name: "Monday" },
    { id: 3, name: "Tuesday" },
    { id: 4, name: "Wednesday" },
    { id: 5, name: "Thursday" },
    { id: 6, name: "Friday" },
    { id: 7, name: "Saturday" },
  ];

  const PricingButtons: PricingButtonItem[] = [
    { id: 1, name: "Onetime" },
    { id: 2, name: "Hourly" },
    { id: 3, name: "Weekly" },
    { id: 4, name: "Monthly" },
    { id: 5, name: "Annually" },
  ];

  const selectMainoption: SelectMainOption[] = [
    {
      name: "boardeducation",
      label: "Type of class",
      options: [
        { label: "Zoom", value: "Zoom" },
        { label: "Google Meet", value: "Google Meet" },
      ],
    },
  ];

  const radiobuttons: RadioOption[] = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        radioValue: value,
      }));
    } else if (name in formData.pricingInputs) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        pricingInputs: {
          ...prevFormData.pricingInputs,
          [name]: value,
        },
      }));
    } else if (type === 'select-one') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedOptions: {
          ...prevFormData.selectedOptions,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleButtonClick = (name: string) => {
    setFormData((prevFormData) => {
      const newSelectedDays = prevFormData.selectedDays.includes(name)
        ? prevFormData.selectedDays.filter((day) => day !== name)
        : [...prevFormData.selectedDays, name];
      return {
        ...prevFormData,
        selectedDays: newSelectedDays,
      };
    });
  };

  const handleButtonsClickforPricing = (name: string) => {
    setFormData((prevFormData) => {
      const newPricing = prevFormData.Pricing.includes(name)
        ? prevFormData.Pricing.filter((day) => day !== name)
        : [...prevFormData.Pricing, name];
      return {
        ...prevFormData,
        Pricing: newPricing,
      };
    });
  };
  console.log(formData);
  

  return (
    <div className='flex justify-center items-center h-auto'>
      <div className='w-2/4 bg-gray-100 shadow-lg rounded p-16 mt-10 border-gray-300 border-solid border-2'>
        <span className='font-medium text-2xl text-gray-400 block mb-4'>Create your package</span>
        <div>
          <p>No. of Subjects you would like to offer?</p>
          <InputWithIcon 
            icon={<IoMdAdd />} 
            placeholder="Enter your name" 
            value={formData.inputValue} 
            onChange={handleChange} 
            name="inputValue"
          />
        </div>
        <div className='mt-5'>
          <p>What days do you prefer?</p>
          <div className="grid grid-cols-5 gap-2">
            {buttons.map((item) => (
              <button
                key={item.id}
                className={`border-gray-800 border-solid border-2 w-20 h-10 rounded-md ${
                  formData.selectedDays.includes(item.name) ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
                onClick={() => handleButtonClick(item.name)}
              >
                <p className='text-xs'>{item.name}</p>  
              </button>
            ))}
          </div>
          <div className='mt-5'>
            <p>Pricing categories</p>
            <div>
              {PricingButtons.map((item) => (
                <React.Fragment key={item.id}>
                  <button
                    className={`border-gray-800 border-solid border-2 w-20 h-10 rounded-md ml-2 ${
                      formData.Pricing.includes(item.name) ? 'bg-blue-500 text-white' : 'bg-white'
                    }`}
                    onClick={() => handleButtonsClickforPricing(item.name)}
                  >
                    <p className='text-sm'>{item.name}</p>  
                  </button>
                  {formData.Pricing.includes(item.name) && (
                    <InputWithIcon 
                      icon={<RxCross2 />} 
                      placeholder="Enter your name" 
                      value={formData.pricingInputs[item.name]} 
                      onChange={handleChange} 
                      name={item.name}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className='mt-4'>
            <p>Which medium would you like to choose?</p>
            {selectMainoption.map((option) => (
              <SelectMain 
                key={option.name}
                name={option.name}  
                options={option.options}  
                value={formData.selectedOptions[option.name]}
                onChange={handleChange}
                label={option.label}
              />
            ))}
          </div>
          <div className='mt-4'>
            <p>Recordings availability</p>
            <div className='border-gray-300 rounded-md'>
              <div className='flex gap-3'>
                {radiobuttons.map((option) => (
                  <div key={option.value} className='bg-white flex py-2 text-gray-400 px-4 gap-8 justify-center align-middle border-2 border-gray-500 rounded-lg'>
                    <input
                      type="radio"
                      name="radioValue"
                      id={option.value}
                      value={option.value}  
                      checked={formData.radioValue === option.value} 
                      onChange={handleChange}
                    />
                    <label htmlFor={option.value} className='text-xs mt-2'>{option.label}</label>
                  </div>
                ))}
              </div>
              <div>
                <span className='mt-5 text-gray-400 text-xs'>Additional charge can be added to provide recordings</span>
              </div>
            </div>
          </div>
        </div>
        <Link href="/onbordsubmit">
          <div className='mt-8'>
            <button className='w-full bg-gray-400 h-10 rounded-md text-white'>Submit</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CreatePacage;
