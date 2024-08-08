"use client";
import SearchComponent from '@/common/SearchComponent';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaFilter } from "react-icons/fa";

import TabNavigator from "../../../../../TabNavigator/page";

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
        <TabNavigator>



            <div className='bg-white p-6 md:p-10 rounded-lg shadow-lg h-[900px]'>
                <div className='flex flex-row justify-between items-center mb-4'>
                    <span className='text-gray-800 text-xl font-semibold mb-4'>Question Bank</span>
                    <div className='flex flex-row items-center gap-2'>
                        <SearchComponent onSearch={handleChange} />
                        <div className="relative">
                            <button className="border border-gray-300 p-2 rounded-md flex items-center bg-white h-full">
                                <FaFilter color='gray' size={20} className='mr-2' />
                                <span className="font-semibold text-xs text-gray-600">Filters</span>
                            </button>
                            {isVisible && (
                                <div className="absolute right-0 top-full mt-2 p-2 bg-white border border-gray-300 rounded-md shadow-lg w-48">
                                    {filterOptions.map((filter) => (
                                        <label key={filter.name} className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                name={filter.name}
                                                checked={filters[filter.name]}
                                                onChange={handleChangeCheckbox}
                                                className="mr-2"
                                            />
                                            <span className="text-xs text-gray-700">{filter.label}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {mainCardData.map((item) => (
                        <div key={item.id} className='relative'>
                            <div className='border border-gray-300 rounded-lg bg-white shadow-md'>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm text-gray-600'>{item.head}</span>
                                        <span className='text-sm text-gray-500'>{item.data}</span>
                                    </div>
                                    <button onClick={() => handleClick(item.id)} className='text-gray-600'>
                                        {showCardId !== item.id ? (
                                            <IoMdAdd color='black' size={24} />
                                        ) : (
                                            <IoMdRemove color='black' size={24} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {showCardId === item.id && (
                                <div className="mt-4">
                                    {innerCardData.map((innerItem, index) => (
                                        <div key={index} className='border border-gray-300 rounded-lg mb-2 bg-white shadow-sm'>
                                            <div className='flex flex-row justify-between items-center p-4'>
                                                <div className='flex flex-col gap-1'>
                                                    <span className='text-xs text-gray-600'>{innerItem.head}</span>
                                                    <span className='text-xs text-gray-500'>{innerItem.data}</span>
                                                </div>
                                                <Link href="/assignments/createAssignment/createNewAssignment">
                                                    <button className='text-gray-500 hover:underline text-xs hover:text-blue-800'>Edit</button>
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



        </TabNavigator>
    )
}

export default QuestionBank