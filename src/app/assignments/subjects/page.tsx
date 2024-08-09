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
    { firstName: "Class title :", secondName: "English grammar" },
    { firstName: "Subject : ", secondName: "English" },
    { firstName: "Due date :", secondName: "07/24/2023" },
    { firstName: "Submitted :", secondName: "34" },
    { firstName: "Pending :", secondName: "15" },
    { firstName: "Completed : ", secondName: "5" },
    { firstName: "Assignment :", secondName: "Given" },
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
      <div className="sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto sm:h-12 md:h-auto lg:h-14 xl:h-14 2xl:h-14 flex flex-wrap  bg-white rounded-xl">
        <div className='flex flex-row flex-wrap justify-evenly align-middle  p-2 w-full'>
          {newData.map((item) => (
            <span className='flex-1 text-xxs text-buttonGray whitespace-pre-line'>
              {item.firstName} {"\n"} {item.secondName}
            </span>
          ))}

        </div>
      </div>


      <div>
        <div className="sm:w-auto md:w-80 lg:w-80 xl:w-80 2xl:w-auto h-12 flex space-x-20 pl-10 py-3 bg-white rounded-xl">
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

        </div>
        {renderContent()}
      </div>

    </TabNavigator>
  );
};

export default ClassManagementSubject;
