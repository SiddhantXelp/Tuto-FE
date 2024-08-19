'use client';

import React, { useState } from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
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
            <div className="w-full h-59"><Card /></div>
          </div>
        );
      case 'Classes':
        return <div className="w-full h-98 rounded-lg p-4"><ClassTable /></div>;
      case 'Time table':
        return <div className="w-full h-98 rounded-lg p-4"><TimeTable /></div>;
      case 'Attendance':
        return <div className="w-full h-98 rounded-lg p-4"><Attendance /></div>;
      default:
        return null;
    }
  };

  return (
    <TabNavigator>
      {/* <div className="w-full h-12 flex space-x-20 pl-10 py-3 bg-white"> */}
      <div className="w-full h-10 flex space-x-8 bg-white pl-10">

        <div className="relative">
          <span
            className={`text-[#565656] text-sm cursor-pointer ${selectedTab === 'Overview' ? 'font-bold' : ''}`}
            onClick={() => setSelectedTab('Overview')}
          >
            Overview
          </span>
          {selectedTab === 'Overview' && (
            <TiArrowSortedUp className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 text-gray-500" />
          )}
        </div>
        <div className="relative">
          <span
            className={`text-[#565656] text-sm cursor-pointer ${selectedTab === 'Classes' ? 'font-bold' : ''}`}
            onClick={() => setSelectedTab('Classes')}
          >
            Classes
          </span>
          {selectedTab === 'Classes' && (
            <TiArrowSortedUp className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 text-gray-500" />
          )}
        </div>
        <div className="relative">
          <span
            className={`text-[#565656] text-sm cursor-pointer ${selectedTab === 'Time table' ? 'font-bold' : ''}`}
            onClick={() => setSelectedTab('Time table')}
          >
            Time table
          </span>
          {selectedTab === 'Time table' && (
            <TiArrowSortedUp className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 text-gray-500" />
          )}
        </div>
        <div className="relative">
          <span
            className={`text-[#565656] text-sm cursor-pointer ${selectedTab === 'Attendance' ? 'font-bold' : ''}`}
            onClick={() => setSelectedTab('Attendance')}
          >
            Attendance
          </span>
          {selectedTab === 'Attendance' && (
            <TiArrowSortedUp className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 text-gray-500" />
          )}
        </div>
      </div>
      {renderContent()}
    </TabNavigator>
  );
};

export default ClassManagementPage;
