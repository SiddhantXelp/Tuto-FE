import React, { ChangeEvent } from 'react';

interface Option {
    id: string;
    title: string;
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
        <div className='mb-4'>
            <label className="block text-buttonGray text-xs md:text-sm mb-2">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="block w-full h-10 md:h-12 p-2 text-buttonGray border-buttonGray rounded-md border-2 shadow-sm focus:ring-indigo-500 focus:border-gray-300 bg-white text-sm md:text-base"
            >
                <option value="" disabled={!value} className='text-buttonGray text-sm md:text-base'>
                    {lablename}
                </option>
                {options.map(option => (
                    <option key={option.id} value={option.title}>
                        {option.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectMain;
