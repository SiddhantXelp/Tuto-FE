"use client"
import React from 'react';
import { FiEdit3 } from "react-icons/fi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import TabNavigator from "../Dashboard/page";


const PaymentPage = () => {
  const buttonNames=["Payment summary","Pending Payments","Pending Payments","Payment history"]
  const pendinding ={
                   Studet:["Sham sundhar","Sham sundhar","Sham sundhar","Sham sundhar","Sham sundhar","Sham sundhar" ],
                   amount:["7000rs","7000rs","7000rs","7000rs","7000rs","7000rs"],
                   date:["07-06-2023","07-06-2023","07-06-2023","07-06-2023","07-06-2023","07-06-2023"]
                    };

   const paymentHistory ={
                      Studet:["Sham sundhar","Sham sundhar","Sham sundhar","Sham sundhar","Sham sundhar","Sham sundhar" ],
                      amount:["7000rs","7000rs","7000rs","7000rs","7000rs","7000rs"],
                      dueDate:["07-06-2023","07-06-2023","07-06-2023","07-06-2023","07-06-2023","07-06-2023"],
                      paidDate:["07-06-2023","07-06-2023","07-06-2023","07-06-2023","07-06-2023","07-06-2023"]
                       };
const percentage = 60;

  return (
    <TabNavigator>
     <div className='w-full h-10 bg-white shadow-md flex flex-row gap-20 items-center'>
      {buttonNames.map((names)=>(
      <span className='text-buttonGray text-xs ml-4'>{names}</span>
    ))}
     </div>

  <div>
  <div className='grid grid-cols-3 gap-4'>
    <div>
      <span className='text-buttonGray text-xs'>Revenue Analytics</span>
      <div className='md:w-56 lg:w-60 xl:w-72 2xl:w-72  h-72 bg-white shadow-lg border rounded-xl flex justify-center items-center p-10'>

 <div style={{ width: 120, height: 120 }}>
 <div style={{ width: 120, height: 120, position: 'relative' }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          strokeLinecap: 'butt',
          textSize: '12px',
          pathTransitionDuration: 0.5,
          pathColor: '#1F78B4',
          textColor: '#1F78B4',
          trailColor: '#FFA0A0',
          backgroundColor: '#3e98c7',
        })}
      />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 20%)', textAlign: 'center',color:'#565656' ,fontSize:"8px",marginTop:"8px"}}>
        {"Payments done"}
      </div>
    </div>
    <div>
     <div className='flex flex-row gap-2 mt-4'>
      <div style={{width:"15px",height:"15px",backgroundColor:"#1F78B4"}}>
      </div>
      <p className='text-buttonGray text-xxxs mt-1'>60% Received Payment</p>
      </div>
      <div className='flex flex-row gap-2 mt-1'>
      <div style={{width:"15px",height:"15px",backgroundColor:"#FFA0A0"}}>
      </div>
      <p className='text-buttonGray text-xxxs mt-1'>40% Pending Payment</p>
      </div>
    </div>
     </div>
     <div className='ml-auto mt-56'><RiMoneyRupeeCircleFill size={20}/></div>
      </div>
    </div>

    <div>
      <span className='text-buttonGray text-xs'>Payment Information</span>
      <div className='md:w-56 lg:w-60 xl:w-72 2xl:w-72   h-72 bg-white shadow-lg border rounded-xl'>
       <div className='p-4'>
           <div className='flex flex-col border-b-2 border-buttonGray'>
           <span className='text-buttonGray text-xxxs'>Salary Payment Mode</span>
           <span className='text-buttonGray text-xxs'>Bank transfer</span>
            </div>
        
        <div className='flex flex-row justify-between'>
          <div>
            <div className='mt-4'>
             <p className='text-buttonGray text-xxxs'>BANK</p>
             <p className='text-buttonGray text-xxs'>HDFC Bank</p>
            </div>
            <div className='mt-4'>
              <p className='text-buttonGray text-xxxs'>ACCOUNT NUMBER</p>
              <p className='text-buttonGray text-xxs'>501005368217455</p>
            </div>
            <div className='mt-4'>
            <p className='text-buttonGray text-xxxs'>IFSC CODE</p>
            <p className='text-buttonGray text-xxs'>HDFC5454480</p>
            </div>
          </div>

          <div>
          <div className='mt-4'>
            <p className='text-buttonGray text-xxxs'>NAME ON THE ACCOUNT</p>
            <p className='text-buttonGray text-xxs'>Shiva shanker S</p>
            </div>
          </div>
        </div>
        <div>
          <div className='flex justify-end mt-10'>
            <FiEdit3 size={20} color='gray'/>
          </div>
        </div>

      </div>
      </div>
    </div>

 <div>
  <span className='text-buttonGray text-xs'>Pending Payments</span>
   <div className='md:w-56 lg:w-60 xl:w-72 2xl:w-72  h-72 bg-white shadow-lg border rounded-xl'>
 <div className='flex flex-row justify-between p-4'>
  <div>
    <div>
      <span className='text-buttonGray text-xxxs'>Students</span>
    </div>
    {pendinding.Studet.map((names)=>(
    <div className='mt-1'>
      <span className='text-buttonGray text-xxs'>{names}</span>
    </div>
    ))}

  </div>

  <div>
    <div>
       <span className='text-buttonGray text-xxxs'>Amount</span>
    </div>
    {pendinding.amount.map((amount)=>(
    <div className='mt-1'>
    <span className='text-buttonGray text-xxs'>{amount}</span>
    </div>
    ))}
  </div>

  <div>
  <div>
  <span className='text-buttonGray text-xxxs'>Due date</span>
    </div>
    {pendinding.date.map((dates)=>(
    <div className='mt-1'>
    <span className='text-buttonGray text-xxs'>{dates}</span>
    </div>
    ))}
  </div>
 </div>
   </div>
  </div>

    <div>
      <span className='text-buttonGray text-xs'>Payment History</span>
      <div className='md:w-56 lg:w-60 xl:w-72 2xl:w-72  h-72 bg-white shadow-lg border rounded-xl'>

      <div className='flex flex-row justify-between p-1'>
    <div>
    <div>
      <span className='text-buttonGray text-xxxs'>Students</span>
    </div>
    {paymentHistory.Studet.map((studentName)=>(
    <div className='mt-1'>
      <span className='text-buttonGray text-xxs'>{studentName}</span>
    </div>
    ))}

  </div>

  <div>
    <div>
     <span className='text-buttonGray text-xxxs'>Amount</span>
    </div>
    {paymentHistory.amount.map((amount)=>(
    <div className='mt-1'>
    <span className='text-buttonGray text-xxxs'>{amount}</span>
    </div>
    ))}
  </div>

  <div>
  <div>
  <span className='text-buttonGray text-xxxs'>Due date</span>
    </div>
    {paymentHistory.dueDate.map((dueDate)=>(
    <div className='mt-1'>
    <span className='text-buttonGray text-xxs'>{dueDate}</span>
    </div>
    ))}
  </div>

  <div>
    <div>
      <span className='text-buttonGray text-xxxs'>Paid date</span>
    </div>
    {paymentHistory.paidDate.map((paidDate)=>(
    <div className='mt-1'>
      <span className='text-buttonGray text-xxs'>{paidDate}</span>
    </div>
    ))}

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
