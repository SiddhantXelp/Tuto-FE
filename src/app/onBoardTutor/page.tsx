"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import InputMain from '@/common/InputMain';
import Link from 'next/link';
import TabNavigator from "../TabNavigator/page";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppSelector } from '../store/hooks';

interface Field {
    labelName: string;
    type: string;
    name: string;
    id: string;
    value: string;
    radioOptions?: { label: string; value: string }[];
    disable: boolean
}

const fields: Field[] = [
    {
        labelName: "Full Name",
        type: "text",
        name: "name",
        id: "username",
        value: "",
        disable: false
    },
    {
        labelName: "Email ID",
        type: "email",
        name: "email",
        id: "email",
        value: "",
        disable: true
    },
    {
        labelName: "Phone Number",
        type: "number",
        name: "mobileNumber",
        id: "mobileNumber",
        value: "",
        disable: false
    },
    {
        labelName: "Gender",
        type: "radio",
        name: "gender",
        id: "gender",
        value: "",
        radioOptions: [
            { label: "Male", value: "M" },
            { label: "Female", value: "F" },
            { label: "Prefer not to disclose", value: "Prefer not to disclose" }
        ],
        disable: false
    },
    {
        labelName: "DOB",
        type: "date",
        name: "dob",
        id: "dob",
        value: "",
        disable: false
    },


];

const OnboardingPage: React.FC = () => {
    const router = useRouter();
    const loginResponse = useAppSelector(state => state?.auth?.login);
    const [formData, setFormData] = useState<{ [key: string]: string }>({
        name: '',
        gender: '',
        dob: '',
        mobileNumber: '',
        email: loginResponse?.user?.email
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
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
            const query = new URLSearchParams(formData).toString();
            // sessionStorage.setItem('formData', JSON.stringify(formData));
            router.push(`/onBoardTutor/educationDetails?${query}`);
        }
    };

    return (
        <>
            <TabNavigator>
                {/* <div className='flex justify-evenly m-5'>
                    <div className='bg-[#565656] h-1 w-96 '>
                    </div>
                    <div className='bg-[#E2E2E2] h-1 w-96 '>
                    </div>
                    <div className='bg-[#E2E2E2] h-1 w-96 '>
                    </div>
                </div> */}
                <div className='flex justify-center items-center mt-20 '>
                    <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border  rounded-[19px] p-6'>
                        <span className='font-medium text-xl text-[#707070] block mb-4 opacity-100'>Enter your details</span>
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
                                    placeholder={''}
                                    disable={field?.disable} />
                                {/* {errors[field.name] && <p className='text-red-500 text-sm'>{errors[field.name]}</p>} */}
                            </div>
                        ))}
                        <button
                            className='w-full bg-[#D8D8D8] h-10 rounded-md text-black mt-4 border border-[#707070]'
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