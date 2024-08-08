'use client';

import React, { useState } from 'react';
import Card from './overView/Card';
import ClassTable from './classes/page';
import TimeTable from './timeTable/page';
import Attendance from './attendence/page';
import TabNavigator from "../TabNavigator/page";


type Tab = 'Overview' | 'Classes' | 'Time table' | 'Attendance';

const ClassManagementPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('Overview');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Overview':
        return (
          <div>
            <div className="w-full h-59 bg-gray-100 rounded-lg"><Card /></div>


          </div>
        );
      case 'Classes':
        return <div className="w-full h-64 bg-gray-100 rounded-lg p-4"><ClassTable /></div>;
      case 'Time table':
        return <div className="w-full h-64 bg-gray-100 rounded-lg p-4"><TimeTable /></div>;
      case 'Attendance':
        return <div className="w-full h-64 bg-gray-100 rounded-lg p-4"><Attendance /></div>;
      default:
        return null;
    }
  };



  return (
    <TabNavigator>
      <div className="w-full h-12 flex space-x-20 pl-10 py-3 bg-white">
        <span
          className={`text-[#565656] text-sm cursor-pointer ${selectedTab === 'Overview' ? 'font-bold' : ''}`}
          onClick={() => setSelectedTab('Overview')}
        >
          Overview
        </span>
        <span
          className={`text-[#565656] text-sm cursor-pointer ${selectedTab === 'Classes' ? 'font-bold' : ''}`}
          onClick={() => setSelectedTab('Classes')}
        >
          Classes
        </span>
        <span
          className={`text-[#565656] text-sm cursor-pointer ${selectedTab === 'Time table' ? 'font-bold' : ''}`}
          onClick={() => setSelectedTab('Time table')}
        >
          Time table
        </span>
        <span
          className={`text-[#565656] text-sm cursor-pointer ${selectedTab === 'Attendance' ? 'font-bold' : ''}`}
          onClick={() => setSelectedTab('Attendance')}
        >
          Attendance
        </span>
      </div>

      {/* <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg mb-4"></div> */}
      {renderContent()}


    </TabNavigator>
  );
};

export default ClassManagementPage;

