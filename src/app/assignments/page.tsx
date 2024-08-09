'use client';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GrAdd } from "react-icons/gr";
import SubmitTable from './SubmitTable';
import PendingTable from './PendingTable';
import CompletedTable from './CompletedTable';
import Link from 'next/link';
import TabNavigator from "../TabNavigator/page";

type Tab = 'Submitted' | 'Pending' | 'Completed';

const ClassManagementPage: React.FC = () => {

  const data = [
    {
      cardName: "Subjects",
      cardNametwo: "",
      subject: 'English',
      details: ['20 Total', '10 Pending']
    },
    {
      cardName: "",
      cardNametwo: "View all",
      subject: 'Telugu',
      details: ['20 Total', '10 Pending']
    },
    {
      cardName: "Groups",
      cardNametwo: "View all",
      subject: 'Group A',
      details: ['20 Total', '10 Pending']
    },
    {
      cardName: "Groups",
      cardNametwo: "",
      subject: 'Group B',
      details: ['20 Total', '10 Pending']
    }
  ];

  const [selectedTab, setSelectedTab] = useState<Tab>('Submitted');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Submitted':
        return <div className="w-full h-98 bg-gray-100 rounded-lg overflow-auto"><SubmitTable /></div>;
      case 'Pending':
        return <div className="w-full h-98 bg-gray-100 rounded-lg overflow-auto"><PendingTable /></div>;
      case 'Completed':
        return <div className="w-full h-98 bg-gray-100 rounded-lg overflow-auto"><CompletedTable /></div>;
      default:
        return null;
    }
  };

  const getLinkHref = (index: any) => {
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
    <TabNavigator>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4'>
          {data.map((item, index) => (
            <Link href={getLinkHref(index)} key={index} passHref>
              <div className='bg-transparent rounded-md p-4 cursor-pointer flex flex-col h-full'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-gray-600 text-sm'>{item.cardName}</span>
                  {item.cardNametwo && (
                    <span className='text-gray-600 text-sm'>
                      {item.cardNametwo}
                    </span>
                  )}
                </div>
                <div className='bg-[#707070] text-white p-4 rounded-md flex-1'>
                  <h1 className='text-lg font-bold mb-2'>{item.subject}</h1>
                  <ul className='list-disc pl-5 space-y-1'>
                    {item.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className='text-sm'>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
          <Link href="/assignments/createAssignment">
            <div className='bg-white border rounded-md shadow-sm flex items-center justify-center p-4 cursor-pointer h-28 w-full sm:w-48 mt-11'>
              <div className='flex flex-col items-center'>
                <GrAdd color='black' size={"24px"} />
                <p className='text-black text-sm mt-2 font-semibold'>Create Assignment</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="relative w-3/12 h-10 flex bg-white rounded-xl text-center">
          <div
          />
          <span
            className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-lg relative ${selectedTab === 'Submitted' ? 'font-bold text-white bg-gray-500' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedTab('Submitted')}
          >
            Submitted
          </span>
          <span
            className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-lg relative ${selectedTab === 'Pending' ? 'font-bold text-white bg-gray-500' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedTab('Pending')}
          >
            Pending
          </span>
          <span
            className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-lg relative ${selectedTab === 'Completed' ? 'font-bold text-white bg-gray-500' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedTab('Completed')}
          >
            Completed
          </span>
        </div>
        {renderContent()}
      </div>
    </TabNavigator>
  );
};

export default ClassManagementPage;
