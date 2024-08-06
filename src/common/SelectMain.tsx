import React, { ChangeEvent } from 'react';
import { FaChevronDown } from 'react-icons/fa'; // Import your custom icon

interface Option {
  label: string;
  Optionlabel: string;
  value: string;
}

interface SelectMainProps {
  label: string;
  name: string;
  lablename: string;
  options: Option[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectMain: React.FC<SelectMainProps> = ({ label, name, options, lablename, value, onChange }) => {
  return (
    <div className='relative mb-4'>
      {/* <label className="block text-buttonGray text-xs mb-2">{label}</label> */}
      <label  className='block text-sm mb-2 text-[#707070]'>{label}</label>

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="block w-full h-10 md:h-12 p-2 pr-8 text-buttonGray bg-white border border-[#707070] rounded-[8px] shadow-sm focus:ring-indigo-500 focus:border-gray-300 text-xs md:text-base opacity-100 appearance-none"
        >
          <option value="" disabled={!value} className='text-buttonGray'>
            {`Select ${lablename}`}
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FaChevronDown size={16} color="gray" />
        </div>
      </div>
    </div>
  );
};

export default SelectMain;
