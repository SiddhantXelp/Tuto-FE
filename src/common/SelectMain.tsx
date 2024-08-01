import React, { ChangeEvent } from 'react';

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
    <div className='mb-4 border-gray'>
      <label className="block text-buttonGray text-xs mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full h-12 p-2 mt-1 text-buttonGray border-buttonGray rounded-md border-2 shadow-sm focus:ring-indigo-500 focus:border-gray-300 sm:text-sm bg-white"
      >
        <option value="" disabled selected={!value} className='text-buttonGray text-sm'>
          {lablename}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMain;
