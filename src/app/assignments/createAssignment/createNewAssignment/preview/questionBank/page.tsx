"use client";
import SearchComponent from '@/common/SearchComponent';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaFilter } from "react-icons/fa";

const QuestionBank = () => {
    const mainCardData = [
        { id: 1, head: "Grade6", data: "25 Assignments" },
        { id: 2, head: "Grade8", data: "25 Assignments" },
        { id: 3, head: "Group B", data: "25 Assignments" },
        { id: 4, head: "Grade 7", data: "25 Assignments" },
    ];

    const innerCardData = [
        { head: "English grammar", data: "Tenses" },
        { head: "Math", data: "Trigonometry" },
        { head: "Hindi", data: "Grammar" },
    ];

    const [showCardId, setShowCardId] = useState<number | null>(null);
    const [formData, setFormData] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClick = (id: number) => {
        setShowCardId(prevId => prevId === id ? null : id);
    };

    const filterOptions = [
        { name: 'mcqs', label: "MCQ's" },
        { name: 'standard', label: '4th Standard' },
        { name: 'group', label: 'Group B' },
        { name: 'quiz', label: 'Quiz' },
    ];

    const [filters, setFilters] = useState({
        mcqs: false,
        standard: false,
        group: false,
        quiz: false,
    });

    const handleChangeCheckbox = (event: any) => {
        const { name, checked } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="p-4">
            <div className='flex flex-row justify-between mt-2'>
                <div>
                    <span className='text-sm'>Question Bank</span>
                </div>
                <div className='flex flex-row justify-evenly gap-2'>
                    <div>
                        <SearchComponent onSearch={handleChange} />
                    </div>
                    <div>
                        <div className="border border-gray-300 p-2 rounded-md w-auto h-10 bg-white">
                            <div className="flex items-center mb-4">
                                <i className="mr-2 cursor-pointer" onClick={toggleVisibility}><FaFilter color='gray' size={20}/></i>
                                <span className="font-semibold text-xs text-buttonGray">Filters</span>
                            </div>
                            {isVisible && (
                                <div className="space-y-2 bg-slate-200">
                                    {filterOptions.map((filter) => (
                                        <label key={filter.name} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name={filter.name}
                                                checked={filters[filter.name]}
                                                onChange={handleChangeCheckbox}
                                                className="mr-2"
                                            />
                                            {filter.label}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-3">
                {mainCardData.map((item) => (
                    <div key={item.id} className='relative'>
                        <div className={`border-2 border-buttonGray rounded-lg bg-white`}>
                            <div className='flex flex-row justify-between items-center p-2'>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-xs text-buttonGray'>{item.head}</span>
                                    <span className='text-xxs text-buttonGray'>{item.data}</span>
                                </div>
                                <div>
                                    {showCardId !== item.id ? (
                                        <IoMdAdd color='black' size={30} onClick={() => handleClick(item.id)} />
                                    ) : (
                                        <IoMdRemove color='black' size={30} onClick={() => handleClick(item.id)} />
                                    )}
                                </div>
                            </div>
                        </div>
                        {showCardId === item.id && (
                            <div className="mt-2">
                                {innerCardData.map((innerItem, index) => (
                                    <div key={index} className='border-2 border-buttonGray rounded-lg mb-2 bg-white'>
                                        <div className='flex flex-row justify-between items-center p-2'>
                                            <div className='flex flex-col gap-1'>
                                                <span className='text-xs text-buttonGray'>{innerItem.head}</span>
                                                <span className='text-xxs text-buttonGray'>{innerItem.data}</span>
                                            </div>
                                            <Link href="/assignments/createAssignment/createNewAssignment">
                                                <div>
                                                    <span><u>Edit</u></span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionBank;
