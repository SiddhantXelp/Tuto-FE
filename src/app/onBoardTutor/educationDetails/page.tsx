"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import SelectMain from '@/common/SelectMain';
import TabNavigator from "../../TabNavigator/page";
import { useRouter } from 'next/navigation';
import { options, buttons } from "./data";

const StudentRequirementForm: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<Record<string, any>>({
        selectedDays: []
    });
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({
    });

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [name]: value
        }));
    };


    const handelSubmit = () => {

        // console.log('Form Submitted:', selectedOptions);
        router.push(`/onBoardTutor/specialize`);

    };

    const handleButtonClick = (name: string) => {
        setFormData((prevFormData) => {
            const newSelectedDays = prevFormData.selectedDays.includes(name)
                ? prevFormData.selectedDays.filter((day: string) => day !== name)
                : [...prevFormData.selectedDays, name];

            console.log("Selected Days:", newSelectedDays);

            return {
                ...prevFormData,
                selectedDays: newSelectedDays,
            };
        });
    };

    return (
        <>
            <TabNavigator>
                <div className='flex justify-center items-center mt-20 '>
                    <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border  rounded-[19px] p-6'>
                        <span className='font-medium text-xl text-[#707070] block mb-4 opacity-100'>Enter your education details</span>

                        <div className='mt-10'>
                            {options.map((option) => (
                                <SelectMain
                                    key={option.name}
                                    label={option.label}
                                    name={option.name}
                                    options={option.options}
                                    lablename={option.label}
                                    value={selectedOptions[option.name]}
                                    onChange={handleChange}
                                />
                            ))}

                            <p className='block text-[#707070] text-[14px]'>Employment Status</p>
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

                            <div>
                                <button className='w-full bg-[#D8D8D8] h-10 rounded-md text-black mt-4 border border-[#707070]' onClick={handelSubmit}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </TabNavigator>
        </>
    );
};

export default StudentRequirementForm;
