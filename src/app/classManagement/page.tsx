'use client';

import React, { useEffect, useState } from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import Card from './overView/Card';
import ClassTable from './classes/page';
import TimeTable from './timeTable/page';
import Attendance from './attendence/page';
import TabNavigator from "../TabNavigator/page";
import { useRouter, useSearchParams } from 'next/navigation';

type Tab = 'Overview' | 'Classes' | 'Time table' | 'Attendance';

const ClassManagementPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabs = searchParams.get('tab') as Tab | null;
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs || 'Overview');

  useEffect(() => {
    if (tabs && ['Overview', 'Classes', 'Time table', 'Attendance'].includes(tabs)) {
      setSelectedTab(tabs);
    }
  }, [tabs]);

  useEffect(() => {
    router.push(`?tab=${selectedTab}`);
  }, [selectedTab, router]);

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
      <div className="w-full h-auto md:h-14 flex space-x-8 bg-white pl-10 border border-t-zinc-200 ml-[-1px] flex-wrap">
        <div className="relative mt-3">
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
        <div className="relative mt-3">
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
        <div className="relative mt-3">
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
        <div className="relative mt-3">
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
