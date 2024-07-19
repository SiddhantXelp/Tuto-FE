'use client';

import React, { useState } from 'react';
import Card from './overView/Card';
import ClassTable from './classes/page';


type Tab = 'Overview' | 'Classes' | 'Time table' | 'Attendance';

const ClassManagementPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('Overview');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Overview':
        return (
          <div>
            <div className="w-full h-59 bg-gray-100 rounded-lg"><Card/></div>

            
          </div>
        );
      case 'Classes':
        return <div className="w-full h-64 bg-gray-100 rounded-lg p-4"><ClassTable/></div>;
      case 'Time table':
        return <div className="w-full h-64 bg-gray-100 rounded-lg p-4">Time Table Content</div>;
      case 'Attendance':
        return <div className="w-full h-64 bg-gray-100 rounded-lg p-4">Attendance Content</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full h-12 flex space-x-20 pl-10 py-3 bg-white">
        <span
          className={`text-sm cursor-pointer text-xxs ${selectedTab === 'Overview' ? 'font-bold' : ''}`}
          onClick={() => setSelectedTab('Overview')}
        >
          Overview
        </span>
        <span
          className={`text-sm cursor-pointer text-xxs ${selectedTab === 'Classes' ? 'font-bold' : ''}`}
          onClick={() => setSelectedTab('Classes')}
        >
          Classes
        </span>
        <span
          className={`text-sm cursor-pointer text-xxs ${selectedTab === 'Time table' ? 'font-bold' : ''}`}
          onClick={() => setSelectedTab('Time table')}
        >
          Time table
        </span>
        <span
          className={`text-sm cursor-pointer text-xxs ${selectedTab === 'Attendance' ? 'font-bold' : ''}`}
          onClick={() => setSelectedTab('Attendance')}
        >
          Attendance
        </span>
      </div>

      {/* <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg mb-4"></div> */}
      {renderContent()}
 
     
    </>
  );
};

export default ClassManagementPage;

