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
import { toast } from 'react-toastify';

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
  const memberAuthToken = useAppSelector((state: { auth: any }) => state.auth.login?.token);
  const studentPackage = useAppSelector((state: { student: any }) => state.student.createStudentPackage);

  const validateForm = () => {
    const errors: string[] = [];

    if (subjects.length === 0) {
      errors.push("Please select at least one subject.");
    }

    if (selectedAbbreviations.length === 0) {
      errors.push("Please select at least one day.");
    }

    if (!pricingCategory) {
      errors.push("Please enter valid pricing for at least one category.");
    }

    if (!formData.selectedOptions.boardEducation) {
      errors.push("Please select the medium of class.");
    }

    if (formData.radioValue === '') {
      errors.push("Please select whether recordings are available.");
    }

    return errors;
  };

  const handelSubmit = () => {
    const errors = validateForm();

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

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
      <div className='flex justify-center items-center min-h-screen  p-4'>
        <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border border-[#707070] rounded-[19px] p-6'>
          <span className='font-medium text-xl text-[#707070] block mb-4 opacity-100'>Create your package</span>

          <div className="mt-2 mb-5">
            <label className="block text-[#707070] text-[14px] mb-2">No. of Subjects you would like to offer?</label>
            <div className="w-full">
              <SelectWithCheckboxes
                options={handelSubjects}
                selectedOptions={subjects}
                setSelectedOptions={handleSelectChange}
              />
            </div>
          </div>
          <div className='mt-5'>
            <p className='block text-[#707070] text-[14px]'>What days do you prefer?</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-5">
              {buttons.map((item) => (
                <button
                  key={item.id}
                  className={`transition-colors duration-300 ease-in-out border w-50 h-12 rounded-md ${formData.selectedDays.includes(item.name)
                    ? 'bg-[#707070] text-white border-[#707070]'
                    : 'bg-white text-[#707070] border-[#707070]'
                    } hover:bg-[#505050] hover:text-white focus:outline-none`}
                  onClick={() => handleButtonClick(item.name)}
                >
                  <p className={`text-sm ${formData.selectedDays.includes(item.name) ? 'text-white' : 'text-[#707070] hover:text-white'}`}>
                    {item.name}
                  </p>
                </button>
              ))}

            </div>
            <div className='mt-5'>
              <p className='block text-[#707070] text-[14px]'>Pricing categories</p>
              <div className="flex flex-wrap gap-4 mt-2">
                {PricingButtons.map((item) => (
                  <React.Fragment key={item.id}>
                    <button
                      className={`transition-colors duration-300 ease-in-out border w-20 h-10 rounded-md ${selectedPricing === item.name
                        ? 'bg-[#707070] text-white border-[#707070]'
                        : 'bg-white text-[#707070] border-[#707070]'
                        } hover:bg-[#505050] hover:text-white focus:outline-none`}
                      onClick={() => handleButtonsClickforPricing(item.name)}
                    >
                      <p className={`text-sm ${selectedPricing === item.name ? 'text-white' : 'text-[#707070]'}`}>
                        {item.name}
                      </p>
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
              </div>
            </div>
            <div className='mt-4'>
              <p className='block text-[#707070] text-[14px]'>Which medium would you like to choose?</p>
              {selectMainOption.map((option) => (
                <SelectMain
                  key={option.name}
                  name={option.name}
                  options={option.options}
                  value={formData.selectedOptions[option.name]}
                  onChange={handleChange}
                  label={""}
                  lablename={option?.label}
                />
              ))}
            </div>
            <div className='mt-4'>
              <p className='block text-[#707070] text-[14px]'>Recordings availability</p>
              <div className='border-gray-300 rounded-md mt-2'>
                <div className='flex gap-3'>
                  {radioButtons.map((option) => (
                    <div
                      key={option.value}
                      className={`flex py-2 px-4 gap-8 justify-center align-middle border rounded-lg transition-colors duration-300 ease-in-out ${formData.radioValue === option.value
                        ? 'bg-[#707070] text-white border-[#707070]'
                        : 'bg-white text-[#707070] border-gray-500'
                        }`}
                      onClick={() => handleChange({ target: { name: 'radioValue', value: option.value } })}

                    >
                      <input
                        type="radio"
                        name="radioValue"
                        id={option.value}
                        value={option.value}
                        checked={formData.radioValue === option.value}
                        onChange={handleChange}
                        className="accent-[#707070]" // Optional: custom color for radio button
                      />
                      <label htmlFor={option.value} className="text-sm mt-1">{option.label}</label>
                    </div>
                  ))}

                  <span className='block text-[#707070] text-[14px]'>Additional charge can be added to provide recordings</span>

                </div>
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <button className='w-full bg-buttonGray h-10 rounded-md text-white' onClick={handelSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </TabNavigator>
  );
};

export default CreatePackage;
