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
  placeholder:string;
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
  placeholder,
  onChange,
  radioOptions
}) => {
  return (
    <div className='flex flex-col mb-4'>
      <label htmlFor={id} className='text-xxs mb-2 text-buttonGray'>{label}</label>
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
                placeholder={placeholder}
                className='mr-2'
               
              />
              <label htmlFor={option.value}  className='ml-2 text-xxs'>{option.label}</label>
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
          className='h-auto w-auto border-2 border-buttonGray rounded-md p-2'
        />
      )}
    </div>
  );
};

export default InputMain;
