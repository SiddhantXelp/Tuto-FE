'use client';

import React, { useEffect, useState } from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Spinner from '@/common/Spinner';

const TabNavigator = dynamic(() => import("../TabNavigator/page"), {
  loading: () => <Spinner />,
  ssr: false,
});

const ClassTable = dynamic(() => import("./classes/page"), {
  loading: () => <Spinner />,
  ssr: false,
});

const TimeTable = dynamic(() => import("./timeTable/page"), {
  loading: () => <Spinner />,
  ssr: false,
});

const Attendance = dynamic(() => import("./attendence/page"), {
  loading: () => <Spinner />,
  ssr: false,
});

const Card = dynamic(() => import("./overView/Card"), {
  loading: () => <Spinner />,
  ssr: false,
});

const StudentClassDetails = dynamic(() => import("./attendence/StudentDetails"), {
  loading: () => <Spinner />,
  ssr: false,
});

type Tab = 'Overview' | 'Classes' | 'Time table' | 'Attendance';
type SubTab = 'StudentClassDetails' | 'Attendance';

const ClassManagementPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabs = searchParams.get('tab') as Tab | null;
  const subTabs = searchParams.get('subTab') as SubTab | null;
  const classId = searchParams.get('classId');
  const studentId = searchParams.get('studentId')

  const [selectedTab, setSelectedTab] = useState<Tab>(tabs || 'Overview');
  const [selectedSubTab, setSelectedSubTab] = useState<SubTab>(subTabs || 'StudentClassDetails');

  useEffect(() => {
    if (tabs && ['Overview', 'Classes', 'Time table', 'Attendance'].includes(tabs)) {
      setSelectedTab(tabs);
    }
  }, [tabs]);

  useEffect(() => {
    if (selectedTab === 'Attendance' && subTabs && ['StudentClassDetails'].includes(subTabs)) {
      setSelectedSubTab(subTabs);
    } else {
      setSelectedSubTab('Attendance'); // Default sub-tab
    }
  }, [selectedTab, subTabs]);

  useEffect(() => {
    if (selectedTab === 'Attendance') {
      router.push(`?tab=${selectedTab}&subTab=${selectedSubTab}&classId=${classId}&studentId=${studentId}`);
    } else {
      router.push(`?tab=${selectedTab}`);
    }
  }, [selectedTab, selectedSubTab, router]);

  const renderContent = () => {
    switch (selectedTab) {
      case 'Overview':
        return (
          <div className="w-full h-59"><Card /></div>
        );
      case 'Classes':
        return <div className="w-full h-98 rounded-lg p-4"><ClassTable /></div>;
      case 'Time table':
        return <div className="w-full h-98 rounded-lg p-4"><TimeTable /></div>;
      case 'Attendance':
        return (
          <div className="w-full h-98 rounded-lg p-4">
            {selectedSubTab === 'StudentClassDetails' ? <StudentClassDetails studentId={String(studentId)} classId={String(classId)} /> : <Attendance />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <TabNavigator>
      <div className="w-full h-auto md:h-14 flex flex-wrap justify-between md:justify-start space-x-4 md:space-x-20 bg-white pl-4 md:pl-10 border border-t-zinc-200 ml-[-1px]">
        <div className="relative mt-3">
          <span
            className={`text-[#565656] text-xs md:text-sm cursor-pointer ${selectedTab === 'Overview' ? 'font-medium' : ''}`}
            onClick={() => setSelectedTab('Overview')}
          >
            Overview
          </span>
          {selectedTab === 'Overview' && (
            <TiArrowSortedUp className="absolute mt-2 left-1/2 transform -translate-x-1/2 text-gray-500" />
          )}
        </div>
        <div className="relative mt-3">
          <span
            className={`text-[#565656] text-xs md:text-sm cursor-pointer ${selectedTab === 'Classes' ? 'font-medium' : ''}`}
            onClick={() => setSelectedTab('Classes')}
          >
            Classes
          </span>
          {selectedTab === 'Classes' && (
            <TiArrowSortedUp className="absolute mt-2 left-1/2 transform -translate-x-1/2 text-gray-500" />
          )}
        </div>
        <div className="relative mt-3">
          <span
            className={`text-[#565656] text-xs md:text-sm cursor-pointer ${selectedTab === 'Time table' ? 'font-medium' : ''}`}
            onClick={() => setSelectedTab('Time table')}
          >
            Time table
          </span>
          {selectedTab === 'Time table' && (
            <TiArrowSortedUp className="absolute mt-2 left-1/2 transform -translate-x-1/2 text-gray-500" />
          )}
        </div>
        <div className="relative mt-3">
          <span
            className={`text-[#565656] text-xs md:text-sm cursor-pointer ${selectedTab === 'Attendance' ? 'font-medium' : ''}`}
            onClick={() => setSelectedTab('Attendance')}
          >
            Attendance
          </span>
          {selectedTab === 'Attendance' && (
            <TiArrowSortedUp className="absolute mt-2 left-1/2 transform -translate-x-1/2 text-gray-500" />
          )}
        </div>
      </div>
      {renderContent()}
    </TabNavigator>
  );
};

export default ClassManagementPage;
