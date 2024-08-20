'use client';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GrAdd } from "react-icons/gr";
import SubmitTable from '../SubmitTable';
import PendingTable from '../PendingTable';
import TabNavigator from "../../TabNavigator/page";

type Tab = 'Submitted' | 'Pending';

const ClassManagementSubject: React.FC = () => {

  const newData = [
    { firstName: "Class title:", secondName: "English grammar" },
    { firstName: "Subject: ", secondName: "English" },
    { firstName: "Due date:", secondName: "07/24/2023" },
    { firstName: "Submitted:", secondName: "34" },
    { firstName: "Pending:", secondName: "15" },
    { firstName: "Completed: ", secondName: "5" },
    { firstName: "Assignment:", secondName: "Given" },
  ]


  const [selectedTab, setSelectedTab] = useState<Tab>('Submitted');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Submitted':
        return <div className="w-full h-64 bg-gray-100 rounded-lg  "><SubmitTable /></div>;
      case 'Pending':
        return <div className="w-full h-64 bg-gray-100 rounded-lg "><PendingTable /></div>;
      //   case 'Completed':
      //     return <div className="w-full h-64 bg-gray-100 rounded-lg "></div>;
      default:
        return null;
    }
  };



  return (
    <TabNavigator>
      <div className="sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto sm:h-12 md:h-auto lg:h-14 xl:h-14 2xl:h-14 flex flex-wrap  bg-white rounded-xl m-5">
        <div className='flex flex-row flex-wrap justify-evenly align-middle  p-2 w-full'>
          {newData.map((item,index) => (
            <span className='flex-1 text-sm text-buttonGray whitespace-pre-line' key={index}>
              <span className='text-[#565656] font-bold'>{item.firstName}</span> {"\n"} <span className='text-[#565656]'>{item.secondName}</span>
            </span>
          ))}

        </div>
      </div>


      <div className='m-5'>
        <div className="relative w-3/12 h-10 flex bg-white text-center rounded-tl-lg rounded-tr-lg">
          <div
          />
          <span
            className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tl-lg relative ${selectedTab === 'Submitted' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedTab('Submitted')}
          >
            Submitted
          </span>
          <span
            className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tr-lg relative ${selectedTab === 'Pending' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedTab('Pending')}
          >
            Pending
          </span>
        </div>
        {renderContent()}
      </div>

    </TabNavigator>
  );
};

export default ClassManagementSubject;
