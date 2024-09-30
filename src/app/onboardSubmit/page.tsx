"use client";

import Link from 'next/link';
import React from 'react';
import { FaVideo, FaCalendar, FaFileVideo } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdPricetag } from "react-icons/io";
import TabNavigator from "../TabNavigator/page";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setCreateUser } from "@/app/store/actions/auth";
import { setCreateStudentPackages } from "@/app/store/actions/student";
import Swal from 'sweetalert2'
import { useSearchParams } from 'next/navigation';

const OnboardSubmit = () => {
  // const studentPackage = useAppSelector((state: { student: any }) => state.student.createStudentPackage);
  const userData = useAppSelector((state: { auth: any }) => state.auth.createUser);
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  const meetMedium = searchParams.get('meetMedium');
  const subjects = searchParams.get('subjects');

  console.log("subjects", subjects);
  const days = searchParams.get('days');
  const pricingCategory = searchParams.get('category');
  const recordSession = searchParams.get('recordSession');
  const price = searchParams.get("price");


  const handleSubmit = () => {
    dispatch(setCreateUser(null));
    dispatch(setCreateStudentPackages(null));
    Swal.fire({
      title: 'Success!',
      text: 'Package Created Successfully.',
      icon: 'success',
      confirmButtonText: 'Done'
    });

  };

  return (
    <TabNavigator>
      <div className='flex justify-center items-center min-h-screen  p-4'>
        <div className='w-full max-w-md bg-[#F8F5F5] shadow-xl border  rounded-[19px] p-6'>
          <div className='mb-6 text-center'>
            <h1 className='text-2xl font-semibold text-gray-700'>{userData?.fullName || ""}</h1>
          </div>
          <div className='flex justify-center mb-6 h-8'>
            <div className='border-b-2 border-gray-500 w-28 h-8'>
            </div>
          </div>





          <div className='space-y-0'>
            <div className='bg-white p-4 shadow-md -mx-6'>
              <div className='flex items-center space-x-3'>
                <FaVideo size={"24"} color='gray' />
                <p className='text-sm text-gray-600'>
                  {meetMedium === "ZO" ? "Zoom" : "Google Meet"}
                </p>
              </div>
            </div>

            <div className='p-4 shadow-md -mx-6'>
              <div className='flex items-center space-x-3'>
                <HiOutlineMenuAlt2 size={"24"} color='gray' />
                <p className='text-sm text-gray-600'>No. of Subjects</p>
                <span className='ml-auto text-gray-600'>{subjects?.length || 0}</span>
              </div>
            </div>

            <div className='bg-white p-4 shadow-md -mx-6'>
              <div className='flex items-center space-x-3'>
                <FaCalendar size={"24"} color='gray' />
                <p className='text-sm text-gray-600'>Days</p>
                <span className='ml-auto text-gray-600'>{days || ""}</span>
              </div>
            </div>

            <div className='p-4 shadow-md -mx-6'>
              <div className='flex items-center space-x-3'>
                <IoMdPricetag size={"24"} color='gray' />
                <p className='text-sm text-gray-600'>Pricing</p>
                <span className='ml-auto text-gray-600'>
                  {pricingCategory ? `${pricingCategory} Rs ${price}` : ""}
                </span>
              </div>
            </div>

            <div className='bg-white p-4 shadow-md -mx-6'>
              <div className='flex items-center space-x-3'>
                <FaFileVideo size={"24"} color='gray' />
                <p className='text-sm text-gray-600'>Video Recording</p>
                <span className='ml-auto text-gray-600'>
                  {recordSession ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          </div>

          <div className='mt-6 text-center'>
            <Link href="/">
              <button
                className='w-full inline-block bg-gray-400 text-white py-2 px-4 rounded-md'
                onClick={handleSubmit}
              >
                Save & Proceed
              </button>
            </Link>
          </div>
        </div>
      </div>
    </TabNavigator>
  );
};

export default OnboardSubmit;
