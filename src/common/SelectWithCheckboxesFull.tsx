import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';

interface Option {
    label: string;
    value: string;
    id: string;
}

interface SelectWithCheckboxesProps {
    options: Option[];
    selectedOptions: string[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
    selectedStudentId: string[];
}

const SelectWithCheckboxes: React.FC<SelectWithCheckboxesProps> = ({
    options,
    selectedOptions,
    setSelectedOptions,
    setSelectedIds,
    selectedStudentId,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleOption = (optionId: string, optionLabel: string) => {
        // Toggle by id, not label
        if (selectedStudentId.includes(optionId)) {
            // Remove both the id and the corresponding label
            setSelectedIds(selectedStudentId.filter((id) => id !== optionId));
            setSelectedOptions(selectedOptions.filter((label) => label !== optionLabel));
        } else {
            // Add both the id and the corresponding label
            setSelectedIds([...selectedStudentId, optionId]);
            setSelectedOptions([...selectedOptions, optionLabel]);
        }
    };

    const clearSelection = () => {
        setSelectedOptions([]);
        setSelectedIds([]);
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
        <div className="relative inline-block w-full" ref={dropdownRef}>
            <div
                className="h-12 w-auto bg-white border border-[#707070] rounded-md p-2 opacity-100 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between">
                    <div className="text-buttonGray text-[16px] mt-1">
                        {selectedOptions.length > 0
                            ? selectedOptions.join(', ')
                            : 'Select options'}
                    </div>
                    <div className="flex items-center">
                        <FaChevronDown size={16} color="gray" />
                        {selectedOptions.length > 0 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents closing the dropdown when clearing selection
                                    clearSelection();
                                }}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute border border-gray-300 bg-white rounded-md mt-1 w-full max-h-60 overflow-y-auto z-10 shadow-lg">
                    {options.map((option) => (
                        <label key={option.id} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedStudentId.includes(option.id)}
                                onChange={() => toggleOption(option.id, option.label)}
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
