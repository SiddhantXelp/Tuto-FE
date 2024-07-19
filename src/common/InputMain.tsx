// src/common/InputMain.tsx

import React, { ChangeEvent } from 'react';

interface RadioOption {
  label: string;
  value: string;
}

interface InputMainProps {
  label: string;
  type: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  radioOptions?: RadioOption[];
}

const InputMain: React.FC<InputMainProps> = ({
  label,
  type,
  name,
  id,
  value,
  onChange,
  radioOptions
}) => {
  return (
    <div className='flex flex-col mb-4'>
      <label htmlFor={id} className='text-sm mb-2 text-buttonGray'>{label}</label>
      {type === 'radio' ? (
        <div className='flex flex-row space-x-4'>
          {radioOptions?.map((option) => (
            <div key={option.value} className='flex items-center mr-4 text-buttonGray '>
              <input
                type="radio"
                name={name}
                id={option.value}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                className='mr-2'
               
              />
              <label htmlFor={option.value}  className='ml-2 text-sm'>{option.label}</label>
            </div>
          ))}
        </div>
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className='h-10 border border-gray-700 rounded p-2'
        />
      )}
    </div>
  );
};

export default InputMain;
