import Link from 'next/link';
import React from 'react';
import TabNavigator from "../../TabNavigator/page";

const View = () => {
    return (
        <TabNavigator>
            <div className=' bg-white shadow-xl rounded-lg p-4 md:p-8 flex justify-between items-center h-[700px] mt-5'>

                <Link href="/assignments/createAssignment/createNewAssignment">
                    <div className='w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 h-40 bg-[#F4F4F4] flex flex-col justify-center items-center border-2 border-gray-300 rounded-lg transition-transform transform hover:scale-105'>
                        <span className='text-sm font-semibold text-gray-700'>Create New Assignment+</span>
                    </div>
                </Link>

                <div className='w-[2px] h-full bg-gray-300 mx-6'></div>

                <Link href="/assignments/createAssignment/createNewAssignment/preview/questionBank">
                    <div className='w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 h-40 bg-[#F4F4F4] flex flex-col justify-center items-center p-4 border-2 border-gray-300 rounded-lg transition-transform transform hover:scale-105'>
                        <span className='text-sm font-semibold text-gray-700'>Choose from the Question Bank</span>
                    </div>
                </Link>
            </div>
        </TabNavigator>
    );
};

export default View;
