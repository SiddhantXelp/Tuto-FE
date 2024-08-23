"use client";
import SearchComponent from '@/common/SearchComponent';
import Table from '@/components/table';
import { allStudentsColumns, allStudentsData } from './leastAttendanceData';
import React from 'react';
import { FaFilter } from "react-icons/fa";

const SubjectsBasedTable = () => {

    const handleChange = () => {
    };

    return (
        <>
            <div className="m-5">
                <div className="flex items-center justify-between mr-3">
                    <h1 className="text-sm text-[#565656] font-bold">Attendance Board</h1>

                    <div className="flex items-center space-x-2">
                        <button className='bg-[#707070] p-2 rounded-3xl text-white flex items-center justify-center space-x-2 w-48'>
                            <span className="text-sm">Filters</span>
                            <FaFilter className="text-sm" />
                        </button>

                        <div className="w-64">
                            <SearchComponent onSearch={handleChange} />
                        </div>
                    </div>
                </div>
                <Table columns={allStudentsColumns} data={allStudentsData} includeCheckbox={false} showRowColor={true}/>
            </div>
        </>
    );
};

export default SubjectsBasedTable;
