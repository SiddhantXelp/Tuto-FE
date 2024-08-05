"use client";

import React, { useState, useEffect } from 'react';
import InputWithIcon from '@/common/InputWithIcon';
import { RxCross2 } from "react-icons/rx";
import SelectWithCheckboxes from '@/common/SelectWithCheckboxesFull';
import TabNavigator from "../../TabNavigator/page";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import SelectMain from '@/common/SelectMain';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getCreateStudentPackage, setCreateStudentPackages } from "@/app/store/actions/student";
import { useRouter } from 'next/navigation';
import Spinner from "../../../common/Spinner"

const CreatePackage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const id = params.id;
  const dispatch = useAppDispatch();

  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedAbbreviations, setSelectedAbbreviations] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    inputValue: '',
    selectedDays: [] as string[],
    Pricing: [] as string[],
    selectedOptions: {
      boardeducation: '',
      boardEducation: ""
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

  // Track the currently selected pricing option
  const [selectedPricing, setSelectedPricing] = useState<string>('');

  const buttons = [
    { id: 1, name: "Sunday", abbreviation: 'S' },
    { id: 2, name: "Monday", abbreviation: 'M' },
    { id: 3, name: "Tuesday", abbreviation: 'T' },
    { id: 4, name: "Wednesday", abbreviation: 'W' },
    { id: 5, name: "Thursday", abbreviation: 'Th' },
    { id: 6, name: "Friday", abbreviation: 'F' },
    { id: 7, name: "Saturday", abbreviation: 'Sa' },
  ];

  const PricingButtons = [
    { id: 1, name: "Onetime" },
    { id: 2, name: "Hourly" },
    { id: 3, name: "Weekly" },
    { id: 4, name: "Monthly" },
    { id: 5, name: "Annually" },
  ];

  const selectMainOption = [
    {
      name: "boardEducation",
      label: "Type of class",
      options: [
        { label: "Zoom", value: "ZO" },
        { label: "Google Meet", value: "GM" },
      ],
    },
  ];

  const radioButtons = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
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

      const selectedAbbreviations = buttons
        .filter((button) => newSelectedDays.includes(button.name))
        .map((button) => button.abbreviation);


      setSelectedAbbreviations(selectedAbbreviations);

      return {
        ...prevFormData,
        selectedDays: newSelectedDays,
      };
    });
  };


  const handleButtonsClickforPricing = (name: string) => {
    setSelectedPricing(selectedPricing === name ? '' : name);
  };

  const handleSelectChange = (options: string[]) => {
    setSubjects(options);
  };

  function filterPricingInputs(pricingInputs: { [key: string]: string }): { [key: string]: string } {
    return Object.fromEntries(
      Object.entries(pricingInputs).filter(([key, value]) => value !== null && value !== "")
    );
  }
  const filteredPricingInputs = filterPricingInputs(formData.pricingInputs);


  const handelSubjects = [
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
  ];
  type PricingInput = {
    [key: string]: string;
  };

  type PricingCategory = {
    category: string;
    price: number;
  };


  function transformPricingInputs(pricingInputs: PricingInput): PricingCategory | null {
    for (const [category, priceString] of Object.entries(pricingInputs)) {
      if (priceString) {
        return {
          category,
          price: parseFloat(priceString),
        };
      }
    }

    return null;
  }

  const pricingCategory = transformPricingInputs(filteredPricingInputs);
  const memberAuthToken = "bjksabhdjashduakdjkasdhjaskhdkj"
  const studentPackage = useAppSelector((state: { student: any }) => state.student.createStudentPackage);

  const handelSubmit = () => {
    const data = {
      "tutorId": id,
      "subjects": subjects,
      "days": selectedAbbreviations[0],
      "pricingCategory": pricingCategory,
      "meetMedium": formData.selectedOptions.boardEducation,
      "recordSession": formData.radioValue || false
    }
    dispatch(getCreateStudentPackage(memberAuthToken, data));

    console.log(":::::::::>??????????>>>", data)

  }

  useEffect(() => {
    if (studentPackage) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>classesData", studentPackage);
      router.push(`/onboardSubmit`);
      // dispatch(setCreateStudentPackages(null))
    }
  }, [studentPackage, router]);
  const isLoading = useAppSelector(state => state.student.loading);

  return (
    <TabNavigator>
      {
        isLoading ? <Spinner /> : ""
      }
      <div className='flex justify-center items-center h-auto'>
        <div className='w-2/4 bg-gray-100 shadow-lg rounded p-16 mt-10 border-gray-300 border-solid border-2'>
          <span className='font-medium text-xl text-buttonGray block mb-4'>Create your package</span>
          <div className="mt-2 mb-5">
            <label className="block text-buttonGray text-xs mb-2">No. of Subjects you would like to offer?</label>
            <div className="w-full">
              <SelectWithCheckboxes
                options={handelSubjects}
                selectedOptions={subjects}
                setSelectedOptions={handleSelectChange}
              />
            </div>
          </div>
          <div className='mt-5'>
            <p className='text-buttonGray text-sm'>What days do you prefer?</p>
            <div className="grid grid-cols-5 gap-2">
              {buttons.map((item) => (
                <button
                  key={item.id}
                  className={`border-buttonGray border-solid border-2 w-26 h-10 rounded-md ${formData.selectedDays.includes(item.name) ? 'bg-blue-500 text-white' : 'bg-white'
                    }`}
                  onClick={() => handleButtonClick(item.name)}
                >
                  <p className='text-sm text-buttonGray'>{item.name}</p>
                </button>
              ))}
            </div>
            <div className='mt-5'>
              <p className='text-buttonGray text-sm'>Pricing categories</p>
              <div className="flex flex-wrap gap-4 mt-2">
                {PricingButtons.map((item) => (
                  <React.Fragment key={item.id}>
                    <button
                      className={`border-buttonGray border-solid border-2 w-20 h-10 rounded-md ${selectedPricing === item.name ? 'bg-blue-500 text-white' : 'bg-white'
                        }`}
                      onClick={() => handleButtonsClickforPricing(item.name)}
                    >
                      <p className='text-sm text-buttonGray'>{item.name}</p>
                    </button>
                    {selectedPricing === item.name && (
                      <div className="flex items-center mt-0">
                        <InputWithIcon
                          placeholder={`Enter ${item.name.toLowerCase()} pricing`}
                          value={formData.pricingInputs[item.name]}
                          onChange={handleChange}
                          name={item.name}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
                <span className='mt-5 text-buttonGray text-xxs'>Additional charge can be added to provide recordings</span>
              </div>
            </div>
            <div className='mt-4'>
              <p className='text-buttonGray text-sm'>Which medium would you like to choose?</p>
              {selectMainOption.map((option) => (
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
              <p className='text-buttonGray text-sm'>Recordings availability</p>
              <div className='border-gray-300 rounded-md'>
                <div className='flex gap-3'>
                  {radioButtons.map((option) => (
                    <div key={option.value} className='bg-white flex py-2 text-gray-400 px-4 gap-8 justify-center align-middle border-2 border-gray-500 rounded-lg'>
                      <input
                        type="radio"
                        name="radioValue"
                        id={option.value}
                        value={option.value}
                        checked={formData.radioValue === option.value}
                        onChange={handleChange}
                      />
                      <label htmlFor={option.value} className='text-sm text-buttonGray mt-1'>{option.label}</label>
                    </div>
                  ))}
                </div>
                <div>
                  <span className='mt-5 text-buttonGray text-sm'>Additional charge can be added to provide recordings</span>
                </div>
              </div>
            </div>
          </div>
          {/* <Link href="/onboardSubmit"> */}
          <div className='mt-8'>
            <button className='w-full bg-buttonGray h-10 rounded-md text-white' onClick={handelSubmit}>Submit</button>
          </div>
          {/* </Link> */}
        </div>
      </div>
    </TabNavigator>
  );
};

export default CreatePackage;
