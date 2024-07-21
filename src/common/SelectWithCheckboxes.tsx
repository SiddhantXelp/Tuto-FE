import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";

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
    <div className="relative inline-block w-96 h-20 ">
      <div
        className="border border-gray-300 rounded-md p-2 cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaAngleDown className="mr-2" />
        <div className="flex-grow">
          {selectedOptions.length > 0
            ? selectedOptions.join(', ')
            : 'Select options'}
        </div>
      </div>
      {isOpen && (
        <div className="absolute border border-gray-300 bg-white rounded-md mt-1 w-full max-h-60 overflow-y-auto z-10">
          {options.map((option) => (
            <div key={option.value} className="flex items-center p-2">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                onChange={() => toggleOption(option.value)}
              />
              <label className="ml-2">{option.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectWithCheckboxes;
