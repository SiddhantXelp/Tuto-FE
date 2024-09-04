
"use client"

import Link from 'next/link';
import React from 'react'
import { GrAdd } from 'react-icons/gr';
import TabNavigator from "../../../TabNavigator/page";
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const data = [
    {
      subject: 'Maths',
      details: ['20 Total', '10 Pending']
    },
    {
      subject: 'Physics',
      details: ['20 Total', '10 Pending']
    },
    {
      subject: 'Social',
      details: ['20 Total', '10 Pending']
    },
    {
      subject: 'English',
      details: ['20 Total', '10 Pending']
    },
    {
      subject: 'Maths',
      details: ['20 Total', '10 Pending']
    },
    {
      subject: 'Maths',
      details: ['20 Total', '10 Pending']
    },
    {
      subject: 'Maths',
      details: ['20 Total', '10 Pending']
    },
    {
      subject: 'Maths',
      details: ['20 Total', '10 Pending']
    },
    {
      subject: 'Maths',
      details: ['20 Total', '10 Pending']
    },
  ];

  const getLinkHref = (index: any) => {
    switch (index) {
      case 0:
        return '/assignments/subjects';
      case 1:
        return '';

      default:
        return '#';
    }
  };



  return (
    <TabNavigator>
      <div className='m-10'>

        <div className='flex flex-row justify-between items-center '>
          <span className='text-[#565656] text-sm font-bold'>Subjects</span>

          <div className='md:w-28  lg:w-48  h-10 bg-[#D1D1D1] border rounded-3xl mt-2 flex items-center justify-center lg:mr-5 cursor-pointer' onClick={()=> router.push("/assignments/createAssignment/createNewAssignment")}>
            <div className='flex flex-row items-center gap-1' >
              <p className='text-black sm:text-xs text-xs font-bold'>Create new assignment</p>
              <GrAdd color='black' size={"13px"} className='font-bold' />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 items-center mt-5 gap-5'>
          {data.map((item, index) => (
            <Link href={getLinkHref(index)} key={index} passHref>
              <div className={(index === 0 || index === 3) ? 'cursor-pointer' : ''} key={index} >

                <div className='flex flex-wrap gap-4 items-center'>
                  <div className='sm:w-24 md:w-32 lg:w-40 xl:w-56 2xl:w-72 h-30 bg-buttonGray border rounded-md flex flex-col justify-between p-4'>
                    <div>
                      <h1 className='text-white text-sm font-bold'>{item.subject}</h1>
                      {item.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className='text-white text-sm'>{detail}</li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>

    </TabNavigator>
  )
}

export default page