import React, { useState, useRef, useEffect } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-full max-w-xs md:max-w-md">
      <div
        className="h-auto w-auto bg-white border border-[#707070] rounded-md p-2 opacity-100"
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
