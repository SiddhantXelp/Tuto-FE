"use client";

import Link from 'next/link';
import React, { useEffect } from 'react'
import { FaVideo, FaCalendar, FaFileVideo } from "react-icons/fa6";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdPricetag } from "react-icons/io";
import TabNavigator from "../TabNavigator/page";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setCreateUser } from "@/app/store/actions/auth";
import { setCreateStudentPackages } from "@/app/store/actions/student";

const OnboardSubmit = () => {
  const studentPackage = useAppSelector((state: { student: any }) => state.student.createStudentPackage);
  const userData = useAppSelector((state: { auth: any }) => state.auth.createUser);
  const dispatch = useAppDispatch();

  console.log("KKKKKKKKKKKKKKKKKstudentPackage", userData);


  const handelSubmit = () => {
    dispatch(setCreateUser(null));
    dispatch(setCreateStudentPackages(null))

  }

  return (
    <TabNavigator>
      <div className='flex justify-center items-center h-auto'>
        <div className='w-2/4 bg-gray-100 shadow-lg rounded p-0 mt-10 border-gray-300 border-solid border-2'>

          <table className="table-auto w-full">
            <thead>
              <tr className='bg-slate-100 h-40 w-full justify-center'>
                <th className='text-2xl text-buttonGray'>{userData && userData?.user?.fullName}</th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-white'>
                <td className='h-12'>
                  <div className='flex flex-row gap-5'>
                    <FaVideo size={"20"} className='ml-2' color='gray' />
                    <p className='text-xs text-buttonGray'>{studentPackage?.meetMedium === "ZO" ? "Zoom" : "Google Meet"}</p>
                  </div>
                </td>
              </tr>
              <tr className='bg-slate-100'>
                <td className='h-12'>
                  <div className='flex flex-row gap-5'>
                    <HiOutlineMenuAlt2 size={"20"} className='ml-2' color='gray' />
                    <p className='text-xs text-buttonGray'>No.of subjects</p>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='text-xs text-buttonGray'>{studentPackage?.subjects ? studentPackage?.subjects.length : 0}</td>
                  </div>
                </td>
              </tr>
              <tr className='bg-white'>
                <td className='h-12'>
                  <div className='flex flex-row gap-5'>
                    <FaCalendar size={"20"} className='ml-2' color='gray' />
                    <p className='text-xs text-buttonGray'>Days</p>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='text-xs text-buttonGray'>{studentPackage?.days ? studentPackage?.days : ""}</td>
                  </div>
                </td>
              </tr>
              <tr className='bg-slate-100'>
                <td className='h-12'>
                  <div className='flex flex-row gap-5'>
                    <IoMdPricetag size={"20"} className='ml-2' color='gray' />
                    <p className='text-xs text-buttonGray'>Pricing</p>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='text-xs text-buttonGray'>{studentPackage?.pricingCategory?.category ? studentPackage?.pricingCategory?.category : ""} Rs {studentPackage?.pricingCategory?.category ? studentPackage?.pricingCategory?.price : ""}</td>
                  </div>
                </td>
              </tr>
              <tr className='bg-white'>
                <td className='h-12'>
                  <div className='flex flex-row gap-5'>
                    <FaFileVideo size={"20"} className='ml-2' color='gray' />
                    <p className='text-xs text-buttonGray'>Video Recording</p>
                    <td></td>
                    <td></td>
                    <td className='text-xs text-buttonGray'>{studentPackage?.recordSession ? "Available" : "Not-Available"}</td>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>

          <Link href="/">
            <div className='m-5'>
              <button className='w-full bg-gray-400 h-10 rounded-md text-white' onClick={handelSubmit}>Save & Proceed</button>
            </div>
          </Link>
        </div>
      </div>
    </TabNavigator>
  )
}

export default OnboardSubmit