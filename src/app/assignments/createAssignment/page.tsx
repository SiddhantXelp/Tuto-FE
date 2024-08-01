import Link from 'next/link'
import React from 'react'
import TabNavigator from "../../TabNavigator/page";

const View = () => {
    return (
        <TabNavigator>
            <div className='w-full h-full'>
                <div className='w-full h-96 bg-white shadow-lg rounded-e-lg sm:p-2 md:p-6 lg:p-8 xl:p-10 flex justify-between items-center '>

                    <Link href="/assignments/createAssignment/createNewAssignment">
                        <div className='sm:w-52 md:w-56 lg:w-60 xl:w-64 2xl:w-64 h-28 bg-slate-100 flex justify-center items-center border-2 border-gray-400 rounded-lg '>
                            <span className=' text-xs'>Create new assignment+</span>
                        </div>
                    </Link>

                    <div className='w-0.5 h-72 bg-gray-300'></div> {/* Divider */}
                    <Link href="/assignments/createAssignment/createNewAssignment/preview/questionBank">
                        <div className='sm:w-52 md:w-56 lg:w-60 xl:w-64 2xl:w-64 h-28 bg-slate-100 flex justify-center items-center p-4 border-2 border-gray-400 rounded-lg'>
                            <span className=' text-xs'>Choose from the Question Bank</span>
                        </div>
                    </Link>
                </div>
            </div>
        </TabNavigator>
    )
}

export default View