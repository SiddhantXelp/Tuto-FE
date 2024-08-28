'use client';

import React, { useState } from 'react';
import SearchComponent from '@/common/SearchComponent';
import { allStudentsColumns, allStudentsData } from '../../studentsTable/data';
import Table from '@/components/table';
import { FaFilter } from 'react-icons/fa';
import StudentDetails from './StudentDetails'; // Import the component for student details

const RecentClasses: React.FC = () => {
    const [selectedRow, setSelectedRow] = useState<string | null>(null);
    const [view, setView] = useState<'recentClasses' | 'students'>('recentClasses')

    const newData = [
        { firstName: "Class title:", secondName: "English grammar" },
        { firstName: "Subject: ", secondName: "English" },
        { firstName: "Due date:", secondName: "07/24/2023" },
        { firstName: "Submitted:", secondName: "34" },
        { firstName: "Pending:", secondName: "15" },
        { firstName: "Completed: ", secondName: "5" },
        { firstName: "Assignment:", secondName: "Given" },
    ];

    const handleChange = () => {
    };

    const handleRowClick = (row: string) => {
        setSelectedRow(row);
        setView('students');
    };

    return (
        <div className="flex flex-col m-5">
            {view === 'recentClasses' && (
                <>
                    <div className="justify-evenly align-middle p-5 w-full sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto sm:h-12 md:h-20 flex flex-wrap bg-white rounded-xl">
                        {newData.map((item, index) => (
                            <div key={index} className="flex-1 min-w-[150px] text-sm text-gray-700">
                                <span className="block font-bold text-gray-600">{item.firstName}</span>
                                <span className="block">{item.secondName}</span>
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-between mt-10'>
                        <div className="w-64">
                            <SearchComponent onSearch={handleChange} />
                        </div>
                        <button className='bg-[#707070] rounded-3xl text-white flex items-center justify-center space-x-2 w-40 mb-[5px]'>
                            <span className="text-sm ">Filters</span>
                            <FaFilter className="text-sm" />
                        </button>
                    </div>

                    <div className='mt-[-1px]'>

                        <Table
                            columns={allStudentsColumns}
                            data={allStudentsData}
                            includeCheckbox={false}
                            onRowClick={(row) => handleRowClick(row)}
                            border={"rounded-b-2xl rounded-tr-2xl"}
                        />
                    </div>

                </>
            )}

            {view === 'students' && (
                <StudentDetails />
            )}
        </div>
    );
};

export default RecentClasses;
