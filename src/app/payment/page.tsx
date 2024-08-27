"use client"
import React from 'react';
import { FiEdit3 } from "react-icons/fi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Spinner from '@/common/Spinner';
import dynamic from 'next/dynamic';

const TabNavigator = dynamic(() => import("../TabNavigator/page"), {
  loading: () => <Spinner />,
  ssr: false,
});


const PaymentPage = () => {
  const buttonNames = ["Payment summary", "Pending Payments", "Pending Payments", "Payment history"]
  const pendinding = {
    Studet: ["Sham sundhar", "Sham sundhar"],
    amount: ["7000rs", "7000rs"],
    date: ["07-06-2023", "07-06-2023"]
  };

  const paymentHistory = {
    Studet: ["Sham sundhar", "Sham sundhar"],
    amount: ["7000rs", "7000rs"],
    dueDate: ["07-06-2023", "07-06-2023"],
    paidDate: ["07-06-2023", "07-06-2023"]
  };
  const percentage = 60;

  return (
    <TabNavigator>
      <div className='p-4'>
        <div className='w-full h-14 bg-white shadow-md flex flex-wrap gap-4 items-center p-4 rounded-lg'>
          {buttonNames.map((name, index) => (
            <span key={index} className='text-buttonGray text-sm'>{name}</span>
          ))}
        </div>

        <div className='mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {/* Revenue Analytics */}
          <div className='bg-white shadow-lg border rounded-xl flex flex-col items-center p-4 h-98'>
            <span className='text-buttonGray text-sm mb-2'>Revenue Analytics</span>
            <div className='flex flex-col items-center'>
              <div className='w-32 h-32'>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    strokeLinecap: 'butt',
                    textSize: '16px',
                    pathTransitionDuration: 0.5,
                    pathColor: '#1F78B4',
                    textColor: '#1F78B4',
                    trailColor: '#FFA0A0',
                    backgroundColor: '#3e98c7',
                  })}
                />
              </div>
              <div className='flex flex-col items-center mt-4'>
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 bg-[#1F78B4]'></div>
                  <p className='text-buttonGray text-sm'>60% Received Payment</p>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                  <div className='w-4 h-4 bg-[#FFA0A0]'></div>
                  <p className='text-buttonGray text-sm'>40% Pending Payment</p>
                </div>
              </div>
            </div>
            <RiMoneyRupeeCircleFill size={24} className='mt-4' />
          </div>

          {/* Payment Information */}
          <div className='bg-white shadow-lg border rounded-xl h-98'>
            <div className='p-4'>
              <span className='text-buttonGray text-sm mb-2 block'>Payment Information</span>
              <div className='flex flex-col border-b-2 border-buttonGray mb-4'>
                <span className='text-buttonGray text-sm'>Salary Payment Mode</span>
                <span className='text-buttonGray text-sm'>Bank Transfer</span>
              </div>
              <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col'>
                  <div className='mb-4'>
                    <p className='text-buttonGray text-sm'>BANK</p>
                    <p className='text-buttonGray text-sm'>HDFC Bank</p>
                  </div>
                  <div className='mb-4'>
                    <p className='text-buttonGray text-sm'>ACCOUNT NUMBER</p>
                    <p className='text-buttonGray text-sm'>501005368217455</p>
                  </div>
                  <div className='mb-4'>
                    <p className='text-buttonGray text-sm'>IFSC CODE</p>
                    <p className='text-buttonGray text-sm'>HDFC5454480</p>
                  </div>
                </div>
                <div>
                  <div className='mb-4'>
                    <p className='text-buttonGray text-sm'>NAME ON THE ACCOUNT</p>
                    <p className='text-buttonGray text-sm'>Shiva Shanker S</p>
                  </div>
                </div>
              </div>
              <div className='flex justify-end'>
                <FiEdit3 size={20} color='gray' />
              </div>
            </div>
          </div>

          {/* Pending Payments */}
          <div className='bg-white shadow-lg border rounded-xl h-98 overflow-auto'>
            <div className='p-4'>
              <span className='text-buttonGray text-sm mb-2 block'>Pending Payments</span>
              <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col'>
                  <div className='mb-4'>
                    <span className='text-buttonGray text-sm'>Students</span>
                    {pendinding.Studet.map((name, index) => (
                      <div key={index} className='mt-1'>
                        <span className='text-buttonGray text-sm'>{name}</span>
                      </div>
                    ))}
                  </div>
                  <div className='mb-4'>
                    <span className='text-buttonGray text-sm'>Amount</span>
                    {pendinding.amount.map((amount, index) => (
                      <div key={index} className='mt-1'>
                        <span className='text-buttonGray text-sm'>{amount}</span>
                      </div>
                    ))}
                  </div>
                  <div className='mb-4'>
                    <span className='text-buttonGray text-sm'>Due Date</span>
                    {pendinding.date.map((date, index) => (
                      <div key={index} className='mt-1'>
                        <span className='text-buttonGray text-sm'>{date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white shadow-lg border rounded-xl h-98 overflow-auto'>
            <div className='p-4'>
              <span className='text-buttonGray text-sm mb-2 block'>Payment History</span>
              <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col'>
                  <div className='mb-4'>
                    <span className='text-buttonGray text-sm'>Students</span>
                    {paymentHistory.Studet.map((name, index) => (
                      <div key={index} className='mt-1'>
                        <span className='text-buttonGray text-sm'>{name}</span>
                      </div>
                    ))}
                  </div>
                  <div className='mb-4'>
                    <span className='text-buttonGray text-sm'>Amount</span>
                    {paymentHistory.amount.map((amount, index) => (
                      <div key={index} className='mt-1'>
                        <span className='text-buttonGray text-sm'>{amount}</span>
                      </div>
                    ))}
                  </div>
                  <div className='mb-4'>
                    <span className='text-buttonGray text-sm'>Due Date</span>
                    {paymentHistory.dueDate.map((date, index) => (
                      <div key={index} className='mt-1'>
                        <span className='text-buttonGray text-sm'>{date}</span>
                      </div>
                    ))}
                  </div>
                  <div className='mb-4'>
                    <span className='text-buttonGray text-sm'>Paid Date</span>
                    {paymentHistory.paidDate.map((date, index) => (
                      <div key={index} className='mt-1'>
                        <span className='text-buttonGray text-sm'>{date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>



    </TabNavigator>
  );
};

export default PaymentPage;
