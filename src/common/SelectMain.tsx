import React, { ChangeEvent } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectMainProps {
  label: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectMain: React.FC<SelectMainProps> = ({ label, name, options, value, onChange }) => {
  return (
    <div className='mb-4'>
      <label className="block text-buttonGray text-sm mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
       className="block w-full h-12 p-2 mt-1  text-buttonGray border-buttonGray rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white "
      >
        <option value="" disabled className='text-buttonGray text-sm'>Select {label}</option>
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
