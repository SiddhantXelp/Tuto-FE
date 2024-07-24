

"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { GrAdd } from "react-icons/gr";
import Link from 'next/link';
import { recentStudentColumns, recentStudentsData } from './data';
import Table from '@/components/table';

const StudentPage: React.FC = () => {
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
    <div className='w-full h-auto'>
      <div className='flex flex-row gap-10'>
        <Link href="/studentsTable">
          <div>
            <span className='text-buttonGray text-sm'>No.of Students</span>
            <div className='w-64 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
              <div className='flex-grow flex items-center justify-center'>
                <h1 className='text-2xl text-black-400 font-bold'>
                  280
                </h1>
              </div>
              <div className='flex flex-row gap-4'>
                <p className='text-xxs text-buttonGray'>Newly joined: 55</p>
                <p className='text-xxs text-buttonGray'>Recently Left: 55</p>
              </div>
            </div>
          </div>
        </Link>

        <div>
          <span className='text-buttonGray text-sm'>Performance</span>
          <div className='w-64 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
          </div>
        </div>

        <div>
          <span className='text-buttonGray text-sm'>Progress reports</span>
          <div className='w-64 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
            <div className="flex flex-row flex-initial justify-between mt-3">
              <div >
                <p className='text-buttonGray text-xxs'>01 Suresh</p>
                <p className='text-buttonGray text-xxs mt-1'>02. Mathew</p>
                <p className='text-buttonGray text-xxs mt-1'>03. Shiva</p>
                <p className='text-buttonGray text-xxs mt-1'>04. Sanjay</p>
              </div>
              <div>
                <p className='text-buttonGray text-xxs'>98/100</p>
                <p className='text-buttonGray text-xxs mt-1'>80/100</p>
                <p className='text-buttonGray text-xxs mt-1'>78/100</p>
                <p className='text-buttonGray text-xxs mt-1'>75/100</p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/studentsTable">
          <div>
            <span className='text-buttonGray text-sm'>Groups</span>
            <div className='w-64 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
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

      <div className='flex flex-row gap-10 mt-10 '>
        {data.map((item, index) => (
          <div className={(index === 0 || index === 2) ? 'cursor-pointer' : ''} key={index} onClick={() => (index === 0 || index === 2) && handleClick(index)}>
            <div className='flex flex-row justify-between'>
              <span className='text-buttonGray text-xs'>{item.cardName}</span>
              <span className='text-buttonGray mt-1'>
                <p className='text-xxs'>
                  {item.cardNameEnd}
                </p>
              </span>
            </div>
            <div className='flex flex-wrap gap-4 items-center '>
              <div className='w-56 h-30 bg-buttonGray border rounded-md flex flex-col justify-between p-4'>
                <div>
                  <h1 className='text-white text-sm font-bold'>{item.subject}</h1>
                  {item.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className='text-white text-xxs'>{detail}</li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className='w-44 h-30 bg-buttonGray border rounded-md mt-6 flex items-center justify-center'>
          <div className='flex flex-col items-center'>
            <GrAdd color='white' size={"30px"} />
            <p className='text-white text-sm'>Add Student</p>
          </div>
        </div>
      </div>

      <div className="mt-10 ">
        <h2 className="text-xs font-semibold mb-4 text-buttonGray">Recently added students</h2>
      <Table columns={recentStudentColumns} data={recentStudentsData} includeCheckbox={false} />
      </div>
    </div>
  );
};

export default StudentPage;
