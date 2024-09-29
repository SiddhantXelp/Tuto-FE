"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import InputMain from '@/common/InputMain';
import Link from 'next/link';
import TabNavigator from "../TabNavigator/page";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCreateGroup, getValidateStudent, setCreateGroup, setStudentError, setValidateStudent } from '../store/actions/student';
import Spinner from '@/common/Spinner';

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
      { label: "Boy", value: "M" },
      { label: "Girl", value: "F" },
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
    type: "text",
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const receivedStudentValidate = useAppSelector(state => state?.student?.getValidateStudent);
  const token = useAppSelector(state => state?.auth?.login?.token);
  const error = useAppSelector(state => state?.student?.error);
  const loading = useAppSelector(state => state?.student?.loading);
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    name: '',
    gender: '',
    dob: '',
    mobileNumber: '',
    email: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'mobileNumber') {
      const onlyNumbers = value.replace(/\D/g, '');
      if (onlyNumbers.length <= 10) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: onlyNumbers
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const { name, gender, dob, mobileNumber, email } = formData;
    let hasError = false;
    let newErrors: { [key: string]: string } = {};

    if (!name) {
      newErrors.name = "Name is required.";
      hasError = true;
    }
    if (!gender) {
      newErrors.gender = "Gender is required.";
      hasError = true;
    }
    if (!dob) {
      newErrors.dob = "Date of Birth is required.";
      hasError = true;
    }
    if (!mobileNumber) {
      newErrors.mobileNumber = "Mobile Number is required.";
      hasError = true;
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid mobile number (10 digits).";
      hasError = true;
    }
    if (!email) {
      newErrors.email = "Email is required.";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      Object.values(newErrors).forEach(error => toast.error(error));
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(getValidateStudent(token, formData))
    }
  };

  useEffect(() => {
    if (receivedStudentValidate?.status === true) {
      const queryParams = new URLSearchParams(formData as any).toString();
      router.push(`/studentRequirements?${queryParams}`);
      dispatch(setValidateStudent(null));
    }
  }, [receivedStudentValidate])

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setStudentError(null))
    }

  }, [error])

  return (
    <>
      {loading && <Spinner />}
      <TabNavigator>
        <div className='flex justify-center items-center mt-20 '>
          <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border  rounded-[19px] p-6'>
            <span className='font-medium text-xl text-[#707070] block mb-4 opacity-100'>Student details</span>
            {fields.map((field) => (
              <div key={field.id} className="mb-4">
                <InputMain
                  label={field.labelName}
                  type={field.type}
                  name={field.name}
                  id={field.id}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  radioOptions={field.radioOptions}
                  placeholder=''
                />
                {/* {errors[field.name] && <p className='text-red-500 text-sm'>{errors[field.name]}</p>} */}
              </div>
            ))}
            <button
              className='w-full bg-buttonGray h-10 rounded-md text-white mt-4'
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </div>
      </TabNavigator>
    </>
  );
};

export default OnboardingPage;
