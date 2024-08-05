

"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { GrAdd } from "react-icons/gr";
import Link from 'next/link';
import { recentStudentColumns, recentStudentsData } from './data';
import Table from '@/components/table';
import TabNavigator from "../TabNavigator/page";
import { useAppDispatch } from '../store/hooks';

const StudentPage: React.FC = () => {
  const dispatch = useAppDispatch();



  const data = [
    {
      cardName: "Students according to subjects",
      subject: 'English',
      details: ['20 Total', '10 Pending']
    },
    {
      cardNameEnd: "View all",
      subject: 'Telugu',
      details: ['20 Total', '10 Pending']
    },
    {
      cardName: "Students according to subjects",
      subject: 'Group A',
      details: ['20 Total', '10 Pending']
    },
    {
      cardNameEnd: "View all",
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
                  <p className='text-xxxs text-buttonGray'>Newly joined:55</p>
                  <p className='text-xxxs text-buttonGray'>Recently Left:55</p>
                </div>
              </div>
            </div>
          </Link>

          <div>
            <span className='text-buttonGray text-xs'>Performance</span>
            <div className='md:w-32 lg:w-36 xl:w-60 2xl:w-64 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
            </div>
          </div>

          <div>
            <span className='text-buttonGray text-xs'>Progress reports</span>
            <div className='md:w-32 lg:w-36 xl:w-60 2xl:w-64 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
              <div className="flex flex-row flex-initial justify-between mt-3">
                <div >
                  <p className='text-buttonGray text-xxxs'>01 Suresh</p>
                  <p className='text-buttonGray text-xxxs mt-1'>02. Mathew</p>
                  <p className='text-buttonGray text-xxxs mt-1'>03. Shiva</p>
                  <p className='text-buttonGray text-xxxs mt-1'>04. Sanjay</p>
                </div>
                <div>
                  <p className='text-buttonGray text-xxxs'>98/100</p>
                  <p className='text-buttonGray text-xxxs mt-1'>80/100</p>
                  <p className='text-buttonGray text-xxxs mt-1'>78/100</p>
                  <p className='text-buttonGray text-xxxs mt-1'>75/100</p>
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
                    <p className='text-buttonGray text-xxs'>Group A</p>
                    <p className='text-buttonGray text-xxs mt-1'>Group B</p>
                    <p className='text-buttonGray text-xxs mt-1'>Group C</p>
                    <p className='text-buttonGray text-xxs mt-1'>Group D</p>
                  </div>
                  <div>
                    <p className='text-buttonGray text-xxs'>20</p>
                    <p className='text-buttonGray text-xxs mt-1'>25</p>
                    <p className='text-buttonGray text-xxs mt-1'>66</p>
                    <p className='text-buttonGray text-xxs mt-1'>38</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5  items-center  mt-5'>
          {data.map((item, index) => (
            <div className={(index === 0 || index === 2) ? 'cursor-pointer' : ''} key={index} onClick={() => (index === 0 || index === 2) && handleClick(index)}>
              <div className='flex flex-row justify-between'>
                <span className='text-buttonGray text-xxxs'>{item.cardName}</span>
                <span className='text-buttonGray mr-5'>
                  <p className='text-xxxs'>
                    {item.cardNameEnd}
                  </p>
                </span>
              </div>
              <div className='flex flex-wrap gap-4 items-center '>
                <div className='sm:w-24 md:w-32 lg:w-38 xl:w-56 2xl:w-48 h-30 bg-buttonGray border rounded-md flex flex-col justify-between p-4'>
                  <div>
                    <h1 className='text-white text-xs font-bold'>{item.subject}</h1>
                    {item.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className='text-white text-xxs'>{detail}</li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className='md:w-28  lg:w-32 xl:w-40 2xl:w-44 h-20 bg-buttonGray border rounded-md mt-2 flex items-center justify-center'>
            <div className='flex flex-col items-center'>
              <GrAdd color='white' size={"20px"} />
              <p className='text-white text-xxs'>Add Student</p>
            </div>
          </div>
        </div>

        <div className="mt-10 ">
          <h2 className="text-xs font-semibold mb-4 text-buttonGray">Recently added students</h2>
          <Table columns={recentStudentColumns} data={recentStudentsData} includeCheckbox={false} />
        </div>
      </div>
    </TabNavigator>
  );
};

export default StudentPage;