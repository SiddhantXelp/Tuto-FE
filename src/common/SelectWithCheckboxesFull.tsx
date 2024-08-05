import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa";

interface Option {
    label: string;
    value: string;
}

interface SelectWithCheckboxesProps {
    options: Option[];
    selectedOptions: string[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectWithCheckboxes: React.FC<SelectWithCheckboxesProps> = ({
    options,
    selectedOptions,
    setSelectedOptions,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div className="relative inline-block w-full">
            <div
                className="border-buttonGray border-2 rounded-md p-2 cursor-pointer flex items-center justify-between shadow-sm focus:ring-indigo-500 focus:border-gray-300 bg-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <FaAngleDown className="mr-2" color='gray' />
                    <div className="text-buttonGray text-sm">
                        {selectedOptions.length > 0
                            ? selectedOptions.join(', ')
                            : 'Select options'}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute border border-gray-300 bg-white rounded-md mt-1 w-full max-h-60 overflow-y-auto z-10 shadow-lg">
                    {options.map((option) => (
                        <div key={option.value} className="flex items-center p-2 hover:bg-gray-100">
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option.value)}
                                onChange={() => toggleOption(option.value)}
                                className="accent-blue-500"
                            />
                            <label className="ml-2 text-xs text-buttonGray">{option.label}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectWithCheckboxes;
