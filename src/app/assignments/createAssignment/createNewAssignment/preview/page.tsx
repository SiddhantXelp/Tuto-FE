import Link from 'next/link';
import React from 'react';
import TabNavigator from "../../../../TabNavigator/page";

const Preview = () => {
    const assignmentData = [
        { head: "Assignment title", data: "English grammar 8th standard" },
        { head: "Subject", data: "English" },
        { head: "Students", data: "Group B" },
        { head: "Material", data: "_English grammar pdf" },
        { head: "Due date & time", data: "20-03-2023, 09:00pm" }
    ];

    const cards = [
        { cardName: "Question1" },
        { cardName: "Question2" },
        { cardName: "Question3" },
        { cardName: "Question4" }
    ];

    const radioOptions = [
        { name: 'option1', value: 'Option1', label: 'Option 1' },
        { name: 'option2', value: 'Option2', label: 'Option 2' },
        { name: 'option3', value: 'Option3', label: 'Option 3' }
    ];

    const checkboxOptions = [
        { label: 'Option 1', value: 'Option1' },
        { label: 'Option 2', value: 'Option2' },
        { label: 'Option 3', value: 'Option3' }
    ];

    return (
        <TabNavigator>
            <div className='bg-white  p-6 md:p-10 rounded-lg shadow'>
                <h1 className='text-xl font-semibold mb-4'>Create new assignment</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='p-4 '>
                        {assignmentData.map((item, index) => (
                            <div key={index} className='mb-2'>
                                <span className='font-semibold text-sm'>{item.head}</span>
                                <p className='text-gray-700 text-sm mt-3'>{item.data}</p>
                                <p className='text-gray-700 text-sm mt-3 border-b-2 border-grey'></p>

                            </div>
                        ))}
                    </div>

                    <div className=' p-4  col-span-2'>
                        <h2 className='text-sm font-medium mb-4'>Questions</h2>
                        {cards.map((item, index) => (
                            <div key={index} className='border border-gray-300 rounded-lg mb-4 p-4'>
                                <span className='block text-gray-800 font-medium mb-2 text-sm'>{item.cardName}</span>
                                {item.cardName === "Question1" && (
                                    <textarea
                                        name='paragraph'
                                        placeholder='Answer text'
                                        className='border border-gray-400 rounded w-full p-2 h-24'
                                    />
                                )}

                                {item.cardName === "Question2" && (
                                    <div className='flex flex-col'>
                                        {radioOptions.map(option => (
                                            <div key={option.name} className='flex items-center mb-2'>
                                                <input
                                                    type='radio'
                                                    id={option.name}
                                                    name={`radioGroup${index}`}
                                                    value={option.value}
                                                    className='mr-2'
                                                />
                                                <label htmlFor={option.name} className='text-gray-700 text-sm'>{option.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {item.cardName === "Question3" && (
                                    <div className='flex flex-col'>
                                        {checkboxOptions.map(option => (
                                            <div key={option.value} className='flex items-center mb-2'>
                                                <input
                                                    type='checkbox'
                                                    id={option.value}
                                                    className='mr-2'
                                                />
                                                <label htmlFor={option.value} className='text-gray-700 text-sm'>{option.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {item.cardName === "Question4" && (
                                    <div>
                                        <input
                                            type='file'
                                            className='border border-gray-400 rounded w-full p-2'
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        <div className='flex flex-col gap-4 mt-6'>
                            <button className='p-3 bg-white-500 text-black rounded-lg shadow hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-colors border border-[#707070]'>
                                <Link href="/assignments/createAssignment/createNewAssignment">
                                    <span className='text-sm'>Edit</span>
                                </Link>

                            </button>
                            <button className='p-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-500 hover:text-black hover:border-gray-500 transition-colors border border-grey'>
                                <Link href="/assignments">
                                    <span className='text-sm'>Save & Publish</span>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </TabNavigator>
    );
}

export default Preview;
