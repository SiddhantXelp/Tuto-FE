'use client';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GrAdd } from "react-icons/gr";
import SubmitTable from './SubmitTable';
import PendingTable from './PendingTable';
import CompletedTable from './CompletedTable';
import Link from 'next/link';

type Tab = 'Submitted' | 'Pending' | 'Completed';

const ClassManagementPage: React.FC = () => {

  const data = [
    {
      cardName: "Subjects",
      cardNametwo:"",
      subject: 'English',
      details: ['20 Total', '10 Pending']
    },
    {
      cardName: "",
      cardNametwo:"View all",
      subject: 'Telugu',
      details: ['20 Total', '10 Pending']
    },
    {
      cardName: "Groups",
      cardNametwo:"View all",
      subject: 'Group A',
      details: ['20 Total', '10 Pending']
    },
    {
      cardName: "Groups",
      cardNametwo:"",
      subject: 'Group B',
      details: ['20 Total', '10 Pending']
    }
  ];

  const [selectedTab, setSelectedTab] = useState<Tab>('Submitted');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Submitted':
        return <div className="w-full h-64 bg-gray-100 rounded-lg  "><SubmitTable/></div>;
      case 'Pending':
        return <div className="w-full h-64 bg-gray-100 rounded-lg "><PendingTable/></div>;
      case 'Completed':
        return <div className="w-full h-64 bg-gray-100 rounded-lg "><CompletedTable/></div>;
      default:
        return null;
    }
  };

  const getLinkHref = (index:any) => {
    switch (index) {
      case 0:
        return '/assignments/subjects';
      case 1:
        return '/assignments/subjects/Screen';
      case 2:
        return '/assignments/subjects/Screen';
      default:
        return '#';
    }
  };

  

  return (
    <>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 items-center mt-5'>
        {data.map((item, index) => (
          <Link href={getLinkHref(index)} key={index} passHref>
          <div className={(index === 0 || index === 1 || index === 2) ? 'cursor-pointer' : ''}>
            <div className='flex flex-row justify-between'>
              <span className='text-buttonGray text-xxs'>{item.cardName}</span>
              <span className='text-buttonGray mr-5'>
                <p className='text-xxxs'>
                  {item.cardNametwo}
                </p>
              </span>
            </div>
            <div className='flex flex-wrap gap-4 items-center'>
              <div className='sm:w-24 md:w-32 lg:w-38 xl:w-56 2xl:w-48 h-30 bg-buttonGray border rounded-md flex flex-col justify-between p-4'>
                <div>
                  <h1 className='text-white text-xs font-bold'>{item.subject}</h1>
                  {item.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className='text-white text-xxs'>{detail}</li>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </Link>
        ))}
        <Link href="/assignments/createAssignment">
        <div className='md:w-28  lg:w-32 xl:w-40 2xl:w-44 h-20 bg-white border rounded-md mt-2 flex items-center justify-center'>
          <div className='flex flex-col items-center'>
            <GrAdd color='black' size={"20px"} />
            <p className='text-black text-xxs'>Create Assigment</p>
          </div>
        </div>
        </Link>
      </div>
    
      <div>
         <div className="sm:w-auto md:w-96 lg:w-96 xl:w-96 2xl:w-auto h-12 flex space-x-20 pl-10 py-3 bg-white rounded-xl  ">
          <span
            className={`text-sm cursor-pointer text-xxs ${selectedTab === 'Submitted' ? 'font-bold' : ''}`}
            onClick={() => setSelectedTab('Submitted')}
          >
            Submitted
          </span>
          <span
            className={`text-sm cursor-pointer text-xxs ${selectedTab === 'Pending' ? 'font-bold' : ''}`}
            onClick={() => setSelectedTab('Pending')}
          >
            Pending
          </span>
          <span
            className={`text-sm cursor-pointer text-xxs ${selectedTab === 'Completed' ? 'font-bold' : ''}`}
            onClick={() => setSelectedTab('Completed')}
          >
            Completed
          </span>
        </div>
        {renderContent()}
      </div>
     
    </>
  );
};

export default ClassManagementPage;
