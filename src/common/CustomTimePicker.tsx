"use client";


import React, { useState } from 'react';

interface CustomTimePickerProps {
    value: string;
    onChange: (value: string) => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({ value, onChange }) => {
    const [hours, setHours] = useState<number>(parseInt(value.split(':')[0]) || 0);
    const [minutes, setMinutes] = useState<number>(parseInt(value.split(':')[1]) || 0);
    const [amPm, setAmPm] = useState<string>(value.split(' ')[1] || 'AM');

    const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newHours = parseInt(e.target.value);
        setHours(newHours);
        onChange(`${formatTime(newHours)}:${formatTime(minutes)} ${amPm}`);
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMinutes = parseInt(e.target.value);
        setMinutes(newMinutes);
        onChange(`${formatTime(hours)}:${formatTime(newMinutes)} ${amPm}`);
    };

    const handleAmPmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newAmPm = e.target.value;
        setAmPm(newAmPm);
        onChange(`${formatTime(hours)}:${formatTime(minutes)} ${newAmPm}`);
    };

    const formatTime = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className='flex items-center'>
            <select value={hours} onChange={handleHoursChange} className='border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
                {[...Array(12)].map((_, i) => (
                    <option key={i} value={i + 1}>
                        {formatTime(i + 1)}
                    </option>
                ))}
            </select>
            <span>:</span>
            <select value={minutes} onChange={handleMinutesChange} className='border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
                {[...Array(60)].map((_, i) => (
                    <option key={i} value={i}>
                        {formatTime(i)}
                    </option>
                ))}
            </select>
            <select value={amPm} onChange={handleAmPmChange} className='border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
            </select>
        </div>
    );
};

export default CustomTimePicker;
