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
            <div className="w-full h-98  rounded-lg"><CategoriesPage /></div>
          </div>
        );
      case 'Completed':
        return <div className="w-full h-98  rounded-lg"><CategoriesPage /></div>;
      case 'Cancelled':
        return <div className="w-full h-98  rounded-lg"><CategoriesPage /></div>;

      default:
        return null;
    }
  };

  return (
    <div>
      <div>

        <div className="relative w-3/12 h-10 flex bg-white text-center rounded-tl-lg rounded-tr-lg">
          <div
          />
          <span
            className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tl-lg relative ${selectedTab === 'Upcoming' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedTab('Upcoming')}
          >
            Upcoming
          </span>
          <span
            className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2  relative ${selectedTab === 'Completed' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedTab('Completed')}
          >
            Completed
          </span>
          <span
            className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-tr-lg relative ${selectedTab === 'Cancelled' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedTab('Cancelled')}
          >
            Cancelled
          </span>

        </div>
      </div>


      {renderContent()}




    </div>
  );
};

export default ClassManagementPage;
