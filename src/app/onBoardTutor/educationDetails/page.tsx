// "use client";

// import React, { useState, ChangeEvent, useEffect } from 'react';
// import SelectMain from '@/common/SelectMain';
// import TabNavigator from "../../TabNavigator/page";
// import { useRouter, useSearchParams } from 'next/navigation';
// import { options, buttons } from "./data";
// import { toast } from 'react-toastify';

// const StudentRequirementForm: React.FC = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams(); // Get the search parameters
//     const [queryParams, setQueryParams] = useState<Record<string, string>>({});

//     useEffect(() => {
//         const params: Record<string, string> = {};

//         searchParams.forEach((value, key) => {
//             params[key] = value;
//         });

//         setQueryParams(params);
//     }, [searchParams]);

//     const [formData, setFormData] = useState<Record<string, any>>({
//         selectedDays: [],
//     });

//     const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

//     // Handle select option change
//     const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setSelectedOptions((prevSelectedOptions) => ({
//             ...prevSelectedOptions,
//             [name]: value
//         }));
//     };

//     // Handle button toggle for selected days (employment status)
//     const handleButtonClick = (name: string) => {
//         setFormData((prevFormData) => {
//             const newSelectedDays = prevFormData.selectedDays.includes(name)
//                 ? prevFormData.selectedDays.filter((day: string) => day !== name)
//                 : [...prevFormData.selectedDays, name];

//             return {
//                 ...prevFormData,
//                 selectedDays: newSelectedDays,
//             };
//         });
//     };

//     // Validation Logic
//     const validateForm = (): boolean => {
//         let isValid = true;

//         // Check if all select options are selected
//         options.forEach(option => {
//             if (!selectedOptions[option.name] || selectedOptions[option.name].trim() === '') {
//                 toast.error(`Please select an option for ${option.label}.`);
//                 isValid = false;
//             }
//         });

//         // Check if at least one employment status is selected
//         if (formData.selectedDays.length === 0) {
//             toast.error('Please select at least one Employment Status.');
//             isValid = false;
//         }

//         return isValid;
//     };

//     const handleSubmit = () => {
//         if (validateForm()) {
//             const dataToStore = {
//                 selectedOptions,
//                 selectedDays: formData.selectedDays,
//             };
//             const educationDetails = new URLSearchParams(dataToStore).toString();
//             const personalDetails = new URLSearchParams(queryParams).toString();

//             router.push(`/onBoardTutor/specialize?${educationDetails}&${personalDetails}`);

//             // sessionStorage.setItem('educationDetails', JSON.stringify(dataToStore));
//         }
//     };

//     const getButtonStyle = (isSelected: boolean) =>
//         `transition-colors duration-300 ease-in-out border w-50 h-12 rounded-md 
//         ${isSelected ? 'bg-[#707070] text-white border-[#707070]' : 'bg-white text-[#707070] border-[#707070]'} 
//         hover:bg-[#505050] hover:text-white focus:outline-none`;

//     return (
//         <>
//             <TabNavigator>
//                 <div className='flex justify-center items-center mt-20'>
//                     <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border rounded-[19px] p-6'>
//                         <span className='font-medium text-xl text-[#707070] block mb-4'>Enter your education details</span>

//                         <div className='mt-10'>
//                             {/* Render Select options dynamically */}
//                             {options.map((option) => (
//                                 <SelectMain
//                                     key={option.name}
//                                     label={option.label}
//                                     name={option.name}
//                                     options={option.options}
//                                     lablename={option.label}
//                                     value={selectedOptions[option.name] || ""}
//                                     onChange={handleChange}
//                                 />
//                             ))}

//                             <p className='block text-[#707070] text-[14px] mt-4'>Employment Status</p>
//                             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-2">
//                                 {buttons.map((item) => (
//                                     <button
//                                         key={item.id}
//                                         type="button"
//                                         className={getButtonStyle(formData.selectedDays.includes(item.name))}
//                                         onClick={() => handleButtonClick(item.name)}
//                                     >
//                                         <p className={`text-sm ${formData.selectedDays.includes(item.name) ? 'text-white' : 'text-[#707070]'}`}>
//                                             {item.name}
//                                         </p>
//                                     </button>
//                                 ))}
//                             </div>

//                             <div>
//                                 <button
//                                     type="button"
//                                     className='w-full bg-[#D8D8D8] h-10 rounded-md text-black mt-6 border border-[#707070]'
//                                     onClick={handleSubmit}
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </TabNavigator>
//         </>
//     );
// };

// export default StudentRequirementForm;


"use client";

import React, { useState, ChangeEvent, useEffect } from 'react';
import SelectMain from '@/common/SelectMain';
import TabNavigator from "../../TabNavigator/page";
import { useRouter, useSearchParams } from 'next/navigation';
import { options, buttons } from "./data";
import { toast } from 'react-toastify';

const StudentRequirementForm: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Get the search parameters
    const [queryParams, setQueryParams] = useState<Record<string, string>>({});

    useEffect(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        setQueryParams(params);
    }, [searchParams]);

    const [formData, setFormData] = useState<Record<string, any>>({
        selectedDays: [],
    });

    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

    // Handle select option change
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [name]: value
        }));
    };

    // Handle button toggle for selected days (employment status)
    const handleButtonClick = (name: string) => {
        setFormData((prevFormData) => {
            const newSelectedDays = prevFormData.selectedDays.includes(name)
                ? prevFormData.selectedDays.filter((day: string) => day !== name)
                : [...prevFormData.selectedDays, name];

            return {
                ...prevFormData,
                selectedDays: newSelectedDays,
            };
        });
    };

    // Validation Logic
    const validateForm = (): boolean => {
        let isValid = true;
        // Check if all select options are selected
        options.forEach(option => {
            if (!selectedOptions[option.name] || selectedOptions[option.name].trim() === '') {
                toast.error(`Please select an option for ${option.label}.`);
                isValid = false;
            }
        });

        // Check if at least one employment status is selected
        if (formData.selectedDays.length === 0) {
            toast.error('Please select at least one Employment Status.');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            options.forEach(option => {
                console.log(`${option.label}:`, selectedOptions[option.name]);
            });

            const dataToStore: Record<string, string> = {
                employmentStatus: formData.selectedDays.join(','), // Joining in case of multiple statuses
            };

            options.forEach(option => {
                if (selectedOptions[option.name]) {
                    dataToStore[option.name] = selectedOptions[option.name];
                }
            });

            const educationDetails = new URLSearchParams(dataToStore).toString();
            const personalDetails = new URLSearchParams(queryParams).toString();
            console.log("educationDetails", educationDetails);
            console.log("personalDetails", personalDetails);
            router.push(`/onBoardTutor/specialize?${educationDetails}&${personalDetails}`);
            // sessionStorage.setItem('educationDetails', JSON.stringify(dataToStore));
        }
    };

    const getButtonStyle = (isSelected: boolean) =>
        `transition-colors duration-300 ease-in-out border w-50 h-12 rounded-md 
        ${isSelected ? 'bg-[#707070] text-white border-[#707070]' : 'bg-white text-[#707070] border-[#707070]'} 
        hover:bg-[#505050] hover:text-white focus:outline-none`;

    return (
        <>
            <TabNavigator>
                <div className='flex justify-center items-center mt-20'>
                    <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border rounded-[19px] p-6'>
                        <span className='font-medium text-xl text-[#707070] block mb-4'>Enter your education details</span>

                        <div className='mt-10'>
                            {/* Render Select options dynamically */}
                            {options.map((option) => (
                                <SelectMain
                                    key={option.name}
                                    label={option.label}
                                    name={option.name}
                                    options={option.options}
                                    lablename={option.label}
                                    value={selectedOptions[option.name] || ""}
                                    onChange={handleChange}
                                />
                            ))}

                            <p className='block text-[#707070] text-[14px] mt-4'>Employment Status</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-2">
                                {buttons.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={getButtonStyle(formData.selectedDays.includes(item.name))}
                                        onClick={() => handleButtonClick(item.name)}
                                    >
                                        <p className={`text-sm ${formData.selectedDays.includes(item.name) ? 'text-white' : 'text-[#707070]'}`}>
                                            {item.name}
                                        </p>
                                    </button>
                                ))}
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className='w-full bg-[#D8D8D8] h-10 rounded-md text-black mt-6 border border-[#707070]'
                                    onClick={handleSubmit}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </TabNavigator>
        </>
    );
};

export default StudentRequirementForm;
