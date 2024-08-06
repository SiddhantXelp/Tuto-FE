'use client';

import React, { useState } from 'react';
import { CategoriesPage } from './Categories';
import { Icon } from '@iconify/react/dist/iconify.js';
import TabNavigator from "../../TabNavigator/page";




type Tab = 'Upcoming' | 'Completed' | 'Cancelled';

const ClassManagementPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('Upcoming');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Upcoming':
        return (
          <div>
            <div className="w-full h-59 bg-gray-100 rounded-lg"><CategoriesPage /></div>
          </div>
        );
      case 'Completed':
        return <div className="w-full h-64 bg-gray-100 rounded-lg"><CategoriesPage /></div>;
      case 'Cancelled':
        return <div className="w-full h-64 bg-gray-100 rounded-lg"><CategoriesPage /></div>;

      default:
        return null;
    }
  };

  return (
    <div>

      <div className='w-full h-12 pr-5 py-3 bg-white flex justify-between '>
        <div className="space-x-20 pl-10 ">
          <span
            className={` cursor-pointer text-sm ${selectedTab === 'Upcoming' ? 'font-bold' : ''}`}
            onClick={() => setSelectedTab('Upcoming')}
          >
            Upcoming
          </span>
          <span
            className={` cursor-pointer text-sm ${selectedTab === 'Completed' ? 'font-bold' : ''}`}
            onClick={() => setSelectedTab('Completed')}
          >
            Completed
          </span>
          <span
            className={` cursor-pointer text-sm ${selectedTab === 'Cancelled' ? 'font-bold' : ''}`}
            onClick={() => setSelectedTab('Cancelled')}
          >
            Cancelled
          </span>
        </div>
        <div className='flex space-x-3'>
          <div className="bg-buttonGray rounded-full flex items-center justify-center">
            <p className="flex justify-between text-xxxs my-1 text-white m-2">Last 7days</p>
            <div className="m-2">
              <Icon icon="uis:calender" width="15" height="15" color='white' />
            </div>
          </div>
          <div className="bg-gray-300 rounded-full flex items-center justify-center">
            <p className="flex justify-between text-xxxs my-1 text-gray-800 m-6">Re-Schedule</p>

          </div>
        </div>
      </div>
      {renderContent()}




    </div>
  );
};

export default ClassManagementPage;
