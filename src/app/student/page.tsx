

"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { GrAdd } from "react-icons/gr";
import Link from 'next/link';
import { recentStudentColumns, recentStudentsData } from './data';
import Table from '@/components/table';
import TabNavigator from "../TabNavigator/page";
import { useAppDispatch } from '../store/hooks';
import PerformanceChart from '@/common/PerformanceChart';

const StudentPage: React.FC = () => {
  const dispatch = useAppDispatch();



  const data = [
    {
      cardName: "Students according to subjects",
      cardNametwo:"",
      subject: 'English',
      details: ['20 Total', '10 Pending']
    },
    {
      // cardNameEnd: "View all",
      cardName:"",
      cardNametwo:"View all",
      subject: 'Telugu',
      details: ['20 Total', '10 Pending']
    },
    {
      cardName: "Students according to subjects",
      cardNametwo:"",
      subject: 'Group A',
      details: ['20 Total', '10 Pending']
    },
    {
      // cardNameEnd: "View all",
      cardName:"",
      cardNametwo:"View all",
      subject: 'Group B',
      details: ['20 Total', '10 Pending']
    }
  ];

  const router = useRouter();

  const handleClick = (index: number) => {
    if (index === 0) {
      router.push('/SubjectsBasedTable');
    } else if (index === 2) {
      router.push('/groupBasedTable');
    }
  };



  return (
    <TabNavigator>
      <div className='w-full h-auto'>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
          <Link href="/studentsTable">
            <div>
              <span className='text-buttonGray text-xs'>No.of Students</span>
              <div className='md:w-36 lg:w-36 xl:w-60 2xl:w-64 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
                <div className='flex-grow flex items-center justify-center'>
                  <h1 className='text-xl text-black-400 font-bold'>
                    280
                  </h1>
                </div>
                <div className='flex flex-row gap-4'>
                  <p className='text-xs text-buttonGray'>Newly joined:55</p>
                  <p className='text-xs text-buttonGray'>Recently Left:55</p>
                </div>
              </div>
            </div>
          </Link>

          <div>
            <span className='text-buttonGray text-xs'>Performance</span>
            <div className='md:w-32 lg:w-36 xl:w-60 2xl:w-64 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
              <PerformanceChart/>
            </div>
          </div>

          <div>
            <span className='text-buttonGray text-xs'>Progress reports</span>
            <div className='md:w-32 lg:w-36 xl:w-60 2xl:w-64 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
              <div className="flex flex-row flex-initial justify-between mt-3">
                <div >
                  <p className='text-buttonGray text-xs'>01 Suresh</p>
                  <p className='text-buttonGray text-xs mt-1'>02. Mathew</p>
                  <p className='text-buttonGray text-xs mt-1'>03. Shiva</p>
                  <p className='text-buttonGray text-xs mt-1'>04. Sanjay</p>
                </div>
                <div>
                  <p className='text-buttonGray text-xs'>98/100</p>
                  <p className='text-buttonGray text-xs mt-1'>80/100</p>
                  <p className='text-buttonGray text-xs mt-1'>78/100</p>
                  <p className='text-buttonGray text-xs mt-1'>75/100</p>
                </div>
              </div>
            </div>
          </div>

          <Link href="/studentsTable">
            <div>
              <span className='text-buttonGray text-xs'>Groups</span>
              <div className='md:w-32 lg:w-36 xl:w-60 2xl:w-64 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
                <div className="flex flex-row flex-initial justify-between mt-3">
                  <div >
                    <p className='text-buttonGray text-xs'>Group A</p>
                    <p className='text-buttonGray text-xs mt-1'>Group B</p>
                    <p className='text-buttonGray text-xs mt-1'>Group C</p>
                    <p className='text-buttonGray text-xs mt-1'>Group D</p>
                  </div>
                  <div>
                    <p className='text-buttonGray text-xs'>20</p>
                    <p className='text-buttonGray text-xs mt-1'>25</p>
                    <p className='text-buttonGray text-xs mt-1'>66</p>
                    <p className='text-buttonGray text-xs mt-1'>38</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div >
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4 mt-7'>
            {data.map((item, index) => (
              <div key={index} className='flex flex-col'>
                {/* <div className={`mb-2 ${index === 0 || index === 2 ? 'cursor-pointer' : ''}`}
                  onClick={() => (index === 0 || index === 2) && handleClick(index)}>
                  <span className='text-buttonGray text-sm'>{item.cardName}</span>
                  {item.cardNameEnd && <span className='text-buttonGray text-sm ml-2'>{item.cardNameEnd}</span>}
                </div> */}


                {/* <div className='flex justify-between items-center mb-2  '> */}
                <div className={`mb-2 flex justify-between items-center ${index === 0 || index === 2 ? 'cursor-pointer' : ''}`}
                  onClick={() => (index === 0 || index === 2) && handleClick(index)}>
                  <span className='text-gray-600 text-xs'>{item.cardName}</span>
                  {item.cardNametwo && (
                    <span className='text-gray-600 text-xs'>
                      {item.cardNametwo}
                    </span>
                  )}
                </div>

                <div className={`rounded-md flex flex-col justify-between ${index === 0 || index === 2 ? 'cursor-pointer' : ''}`}
                  onClick={() => (index === 0 || index === 2) && handleClick(index)}>
                  <div className='flex flex-col items-center'>
                    <div className='w-full bg-[#707070] border rounded-md p-4'>
                      <h1 className='text-white text-base font-bold mb-2'>{item.subject}</h1>
                      <ul className='text-white space-y-1'>
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className='text-sm'>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/onboarding">
              <div className='bg-[#707070] border rounded-md shadow-sm flex items-center justify-center p-4 cursor-pointer h-28 w-full sm:w-48 mt-7'>
                <div className='flex flex-col items-center'>
                  <GrAdd color='white' size={"24px"} />
                  <p className='text-white text-sm mt-2'>Add Student</p>
                </div>
              </div>
            </Link>
          </div>
        </div>



        <div className="mt-10 ">
          <h2 className="text-sm font-semibold mb-4 text-buttonGray">Recently added students</h2>
          <Table columns={recentStudentColumns} data={recentStudentsData} includeCheckbox={false} />
        </div>
      </div>
    </TabNavigator>
  );
};

export default StudentPage;