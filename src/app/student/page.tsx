"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, Suspense, lazy, useState } from 'react';
import { GrAdd } from "react-icons/gr";
import Link from 'next/link';
import { recentStudentColumns, cardData } from './data';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getStudents } from '@/app/store/actions/student';
import dynamic from 'next/dynamic';
import Spinner from '@/common/Spinner';
import Pagination from 'react-js-pagination'; // Import react-js-pagination
import { getStudentGroup } from '@/app/store/actions/classes';

const TabNavigator = dynamic(() => import("../TabNavigator/page"), {
  loading: () => <Spinner />,
  ssr: false,
});

const Table = dynamic(() => import("@/components/table"), {
  loading: () => <Spinner />,
  ssr: false,
});

const PerformanceChart = lazy(() => import('@/common/PerformanceChart'));

const Student: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: { auth: any }) => state.auth.login?.token);
  const studentData = useAppSelector((state: { student: any }) => state.student?.getStudents || []);
  const studentLoading = useAppSelector((state: { student: any }) => state.student?.loading);
  const storedCurrentPage = studentData?.currentPage || 1; // Ensure default value
  const [currentPage, setCurrentPage] = useState(storedCurrentPage);
  const studentGroups = useAppSelector((state: { classes: any }) => state.classes.getstudentgroup?.data || []);

  useEffect(() => {
    const limit = "10";
    if (token) {
      dispatch(getStudents(token, currentPage, limit));
      dispatch(getStudentGroup(token));
    }
  }, [dispatch, token, currentPage]);


  const handelStudentCardClick = (index: number) => {
    if (index === 0) {
      router.push('/SubjectsBasedTable');
    } else if (index === 2) {
      router.push('/groupBasedTable');
    }
  }
  const handleClick = (group: any) => {
    const role = {
      group,
      allStudent: false
    }
    const queryString = new URLSearchParams(role as any).toString();
    router.push(`/groupBasedTable?${queryString}`);

  };

  const processedStudentData = useMemo(() =>
    (studentData?.students || []).map((student: any) => ({
      ...student,
      grade: student.educationalDetails?.grade || 'No Grade',
      subjects: student.educationalDetails?.subjects?.join(', ') || 'No Subjects',
    }))
    , [studentData]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); // Update current page state
  };



  return (
    <TabNavigator>
      {studentLoading && <Spinner />}
      <div className='w-full h-auto p-4 sm:p-4 md:p-5'>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
          <Link href="/studentsTable">
            <div>
              <span className='text-sm font-semibold mb-4 text-[#565656]'>No.of Students</span>
              <div className='w-full h-36 bg-white border rounded-md flex flex-col justify-between p-4 mt-2'>
                <div className='flex-grow flex items-center justify-center'>
                  <h1 className='text-[30px] text-black-400 font-bold text-[#565656] opacity-100'>{studentData?.totalItems || 0}</h1>
                </div>
                <div className='flex justify-between'>
                  <p className='text-sm text-[#565656]'>Newly joined: 5</p>
                  <p className='text-sm text-[#565656]'>Recently Left: 0</p>
                </div>
              </div>
            </div>
          </Link>

          <div>
            <span className='text-sm font-semibold text-[#565656]'>Performance</span>
            <div className='w-full h-36 bg-white border rounded-md mt-2'>
              <Suspense fallback={<div>Loading...</div>}>
                <PerformanceChart />
              </Suspense>
            </div>
          </div>

          <div>
            <span className='text-sm font-semibold mb-4 text-[#565656]'>Progress reports</span>
            <div className='w-full h-36 bg-white border rounded-md flex flex-col justify-between p-4 mt-2'>
              <div className="flex flex-row justify-between mt-3">
                <div>
                  <p className='text-[#565656] text-sm'>01 Suresh</p>
                  <p className='text-[#565656] text-sm mt-1'>02. Mathew</p>
                  <p className='text-[#565656] text-sm mt-1'>03. Shiva</p>
                  <p className='text-[#565656] text-sm mt-1'>04. Sanjay</p>
                </div>
                <div>
                  <p className='text-[#565656] text-sm'>98/100</p>
                  <p className='text-[#565656] text-sm mt-1'>80/100</p>
                  <p className='text-[#565656] text-sm mt-1'>78/100</p>
                  <p className='text-[#565656] text-sm mt-1'>75/100</p>
                </div>
              </div>
            </div>
          </div>

          <div onClick={() => {
            const role = {
              allStudent: true
            }
            const queryString = new URLSearchParams(role as any).toString();
            router.push(`/groupBasedTable?${queryString}`);
          }}>
            <span className='text-sm font-semibold mb-4 text-[#565656]'>Groups</span>
            <div className='w-full h-36 bg-white border rounded-md flex flex-col justify-between p-4 mt-2'>
              <div className="flex flex-row justify-between mt-3">
                <div>
                  {studentGroups && studentGroups.map((data: any, index: number) => (
                    <div key={index}>
                      <p className='text-[#565656] text-sm mt-1'>{data?.title || "N/A"}</p>

                    </div>
                  ))}
                </div>
                <div>
                  <p className='text-[#565656] text-sm'>20</p>
                  <p className='text-[#565656] text-sm mt-1'>25</p>
                  <p className='text-[#565656] text-sm mt-1'>66</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4 mt-7'>
          {cardData.map((item, index) => (
            <div key={index} className='flex flex-col'>
              <div
                className={`mb-2 flex justify-between items-center ${index === 0 || index === 2 ? 'cursor-pointer' : ''}`}
                onClick={() => (index === 0 || index === 2) && handelStudentCardClick(index)}
              >
                <span className='text-sm font-semibold text-[#565656]'>{item.cardName}</span>
                {item.cardNameEnd && (
                  <span className='text-sm text-[#565656]'>{item.cardNameEnd}</span>
                )}
              </div>

              <div className={`rounded-md flex flex-col justify-between ${index === 0 || index === 2 ? 'cursor-pointer' : ''}`}
                onClick={() => (index === 0 || index === 2) && handelStudentCardClick(index)}>
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

          {studentGroups && studentGroups.slice(0, 2).map((item: any, index: number) => (
            <div key={index} className='flex flex-col'>
              <div
                className={`mb-2 flex justify-between items-center`}
                onClick={() => handleClick(item?.id)}
              >
                <span className='text-sm font-semibold text-[#565656]'>
                  {index === 0 ? "Students according to Groups" : ""}
                </span>

                {index !== 0 && (
                  <span className='text-sm text-[#565656]'>View All</span>
                )}
              </div>

              <div className={`rounded-md flex flex-col justify-between`}
                onClick={() => handleClick(item?.id)}>
                <div className='flex flex-col items-center'>
                  <div className='w-full bg-[#707070] border rounded-md p-4'>
                    <h1 className='text-white text-base font-bold mb-2'>{item.title}</h1>
                    <ul className='text-white space-y-1'>
                      <li className='text-sm'>10 Total</li>
                      <li className='text-sm'>20 Pending</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link href="/onboarding">
            <div className='bg-[#707070] border rounded-md shadow-sm flex items-center justify-center p-4 cursor-pointer h-28 w-full sm:w-48 mt-7'>
              <div className='flex flex-col items-center'>
                <GrAdd color='white' size={"24px"} className='font-extrabold' />
                <p className='text-white text-sm mt-2'>Add Student</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-5">
          <h2 className="text-sm font-semibold mb-4 text-[#565656]">Recently added students</h2>
          <Table columns={recentStudentColumns} data={processedStudentData} includeCheckbox={false} border={"rounded-2xl"} />
          <div className="flex justify-center mt-4">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={10}
              totalItemsCount={studentData?.totalItems || 0}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              innerClass="pagination"
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </div>
      </div>
    </TabNavigator>
  );
};

export default Student;

