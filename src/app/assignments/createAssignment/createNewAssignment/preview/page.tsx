import Link from 'next/link';
import React from 'react'
import TabNavigator from "../../../../TabNavigator/page";

const Preview = () => {
    const assignmentData = [
        {
            head: "Assignment title",
            data: "English grammar 8th standard",
        },
        {
            head: "Subject",
            data: "English",
        },
        {
            head: "Students",
            data: "Group B",
        },
        {
            head: "Material",
            data: "_English gramer pdf",
        },
        {
            head: "Due date & time",
            data: "20-03-2023, 09:00pm",
        }
    ];

    const cards = [
        {
            cardName: "Quetion1",

        },

        {
            cardName: "Quetion2",

        },
        {
            cardName: "Quetion3",
        },
        {
            cardName: "Quetion4",
        },
    ]

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
            <span>Create new assignment</span>

            <div className='grid grid-cols-10 h-full '>

                <div className='col-span-3 bg-white flex flex-row '>

                    <div className='grid grid-cols-1'>
                        <div>
                            {assignmentData.map((item) => (
                                <div className='flex flex-col gap-1 border-b-2 border-gray-200 mt-2 p-2'>
                                    <span className=' text-xs'>{item.head}</span>
                                    <span className='text-buttonGray text-xxs'>{item.data}</span>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className='col-span-7 bg-white ml-1'>



                    <div className='col-span-7 bg-white ml-1'>

                        {cards.map((item) => (
                            <div className='border-2 border-gray-300 gap-2 p-4 rounded-lg mb-4'>
                                <div>
                                    <span className='text-buttonGray text-sm'>{item.cardName}</span>

                                    <div>
                                        {item.cardName === "Quetion1" ? (
                                            <div>
                                                <textarea
                                                    name='paragraph'
                                                    placeholder='Answer text'
                                                    className='text-buttonGray text-xs border-b-2 border-gray-400 w-full h-16'
                                                />
                                            </div>

                                        ) : item.cardName === "Quetion2" ? (
                                            <>
                                                {radioOptions.map((item) => (
                                                    <div key={item.name}>
                                                        <input
                                                            type='radio'
                                                            className='mt-4 bg-slate-100  border-b-2 border-gray-400 size-3'
                                                        />
                                                        <label className='text-buttonGray text-xs ml-2'>{item.label}</label>
                                                    </div>
                                                ))}
                                            </>

                                        ) : item.cardName === "Quetion3" ? (
                                            <>
                                                {checkboxOptions.map((checkbox, checkboxIndex) => (
                                                    <div key={checkbox.value}>
                                                        <input
                                                            type='checkbox'
                                                            className='mt-4 text-buttonGray size-1'
                                                        />
                                                        <label className='text-buttonGray text-xs ml-2'>{checkbox.label}</label>
                                                    </div>
                                                ))}
                                            </>
                                        ) : item.cardName === "Quetion4" ? (
                                            <>
                                                <input
                                                    type='file'
                                                    name='file'
                                                    className='border-2 h-10 border-gray-400 w-full rounded-lg text-buttonGray text-xs'
                                                />
                                            </>
                                        ) : <></>}
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                    <div className='flex flex-col gap-2 p-2'>
                      <Link href="/assignments/createAssignment/createNewAssignment">
                        <button className='mb-4 p-2 bg-white border-2 border-buttonGray  sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full text-buttonGray rounded text-xs'>Edit</button>
                        </Link>
                        <Link href="/assignments">
                        <button className='mb-4 p-2 bg-buttonGray sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full text-white rounded text-xs'>Save & Publish</button>
                        </Link>
                    </div>
                </div>


            </div>
        </TabNavigator>
    )
}

export default Preview