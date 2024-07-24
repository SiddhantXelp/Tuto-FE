"use client"
import React from 'react';
import { FiEdit3 } from "react-icons/fi";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";


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
    <>
     <div className='w-full h-10 bg-white shadow-md flex flex-row gap-20 items-center'>
      {buttonNames.map((names)=>(
      <span className='text-buttonGray text-sm ml-4'>{names}</span>
    ))}
     </div>

  <div>
  <div className='grid grid-cols-3 gap-4'>
    <div>
      <span className='text-buttonGray text-sm'>Revenue Analytics</span>
      <div className='w-96 h-72 bg-white shadow-lg border rounded-xl flex justify-center items-center'>

 <div style={{ width: 150, height: 150 }}>
 <div style={{ width: 150, height: 150, position: 'relative' }}>
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
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 20%)', textAlign: 'center',color:'#565656' }}>
        {"children"}
      </div>
    </div>
    <div>
     <div className='flex flex-row gap-4 mt-4'>
      <div style={{width:"20px",height:"20px",backgroundColor:"#1F78B4"}}>
      </div>
      <p className='text-buttonGray text-xxs mt-1'>60% Received Payment</p>
      </div>
      <div className='flex flex-row gap-4 mt-1'>
      <div style={{width:"20px",height:"20px",backgroundColor:"#FFA0A0"}}>
      </div>
      <p className='text-buttonGray text-xxs mt-1'>40% Pending Payment</p>
      </div>
    </div>
</div>
      </div>
    </div>

    <div>
      <span className='text-buttonGray text-sm'>Payment Information</span>
      <div className='w-96 h-72 bg-white shadow-lg border rounded-xl'>
       <div className='p-4'>
           <div className='flex flex-col border-b-2 border-buttonGray'>
           <span className='text-buttonGray text-xxs'>Salary Payment Mode</span>
           <span className='text-buttonGray text-sm'>Bank transfer</span>
            </div>
        
        <div className='flex flex-row justify-between'>
          <div>
            <div className='mt-4'>
             <p className='text-buttonGray text-xxs'>BANK</p>
             <p className='text-buttonGray text-sm'>HDFC Bank</p>
            </div>
            <div className='mt-4'>
              <p className='text-buttonGray text-xxs'>ACCOUNT NUMBER</p>
              <p className='text-buttonGray text-sm'>501005368217455</p>
            </div>
            <div className='mt-4'>
            <p className='text-buttonGray text-xxs'>IFSC CODE</p>
            <p className='text-buttonGray text-sm'>HDFC5454480</p>
            </div>
          </div>

          <div>
          <div className='mt-4'>
            <p className='text-buttonGray text-xxs'>NAME ON THE ACCOUNT</p>
            <p className='text-buttonGray text-sm'>Shiva shanker S</p>
            </div>
          </div>
        </div>
        <div>
          <div className='flex justify-end mt-10'>
            <FiEdit3 size={25} color='gray'/>
          </div>
        </div>

      </div>
      </div>
    </div>

 <div>
  <span className='text-buttonGray text-sm'>Pending Payments</span>
   <div className='w-96 h-72 bg-white shadow-lg border rounded-xl'>
 <div className='flex flex-row justify-between p-4'>
  <div>
    <div>
      <span className='text-buttonGray text-xxs'>Students</span>
    </div>
    {pendinding.Studet.map((names)=>(
    <div className='mt-1'>
      <span className='text-buttonGray text-sm'>{names}</span>
    </div>
    ))}

  </div>

  <div>
    <div>
       <span className='text-buttonGray text-xxs'>Amount</span>
    </div>
    {pendinding.amount.map((amount)=>(
    <div className='mt-1'>
    <span className='text-buttonGray text-sm'>{amount}</span>
    </div>
    ))}
  </div>

  <div>
  <div>
  <span className='text-buttonGray text-xxs'>Due date</span>
    </div>
    {pendinding.date.map((dates)=>(
    <div className='mt-1'>
    <span className='text-buttonGray text-sm'>{dates}</span>
    </div>
    ))}
  </div>
 </div>
   </div>
  </div>

    <div>
      <span className='text-buttonGray text-sm'>Payment History</span>
      <div className='w-96 h-72 bg-white shadow-lg border rounded-xl'>

      <div className='flex flex-row justify-between p-4'>
    <div>
    <div>
      <span className='text-buttonGray text-xxs'>Students</span>
    </div>
    {paymentHistory.Studet.map((studentName)=>(
    <div className='mt-1'>
      <span className='text-buttonGray text-sm'>{studentName}</span>
    </div>
    ))}

  </div>

  <div>
    <div>
     <span className='text-buttonGray text-xxs'>Amount</span>
    </div>
    {paymentHistory.amount.map((amount)=>(
    <div className='mt-1'>
    <span className='text-buttonGray text-sm'>{amount}</span>
    </div>
    ))}
  </div>

  <div>
  <div>
  <span className='text-buttonGray text-xxs'>Due date</span>
    </div>
    {paymentHistory.dueDate.map((dueDate)=>(
    <div className='mt-1'>
    <span className='text-buttonGray text-sm'>{dueDate}</span>
    </div>
    ))}
  </div>

  <div>
    <div>
      <span className='text-buttonGray text-xxs'>Paid date</span>
    </div>
    {paymentHistory.paidDate.map((paidDate)=>(
    <div className='mt-1'>
      <span className='text-buttonGray text-sm'>{paidDate}</span>
    </div>
    ))}

  </div>
 </div>
 </div>
 </div>

  </div>
</div>


    </>
  );
};

export default PaymentPage;
