import React, { useState } from 'react';
import { FaAngleDown, FaChevronDown } from "react-icons/fa";

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
                className="h-12 w-auto bg-white border border-[#707070] rounded-md p-2 opacity-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between">
                    <div className="text-buttonGray text-[16px] mt-1 ">
                        {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select options'}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <FaChevronDown size={16} color="gray" />
                    </div>                </div>
            </div>
            {isOpen && (
                <div className="absolute border border-gray-300 bg-white rounded-md mt-1 w-full max-h-60 overflow-y-auto z-10 shadow-lg">
                    {options.map((option) => (
                        <label key={option.value} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option.value)}
                                onChange={() => toggleOption(option.value)}
                                className="accent-blue-500"
                            />
                            <span className="ml-2 text-xs text-buttonGray">{option.label}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectWithCheckboxes;
