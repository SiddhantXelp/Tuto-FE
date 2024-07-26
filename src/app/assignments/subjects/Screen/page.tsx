import React from 'react'
import { GrAdd } from 'react-icons/gr';

const page = () => {
    const data = [
        {
         subject: 'Maths',
          details: ['20 Total', '10 Pending']
        },
        {
          subject: 'Physics',
          details: ['20 Total', '10 Pending']
        },
        {
          subject: 'Social',
          details: ['20 Total', '10 Pending']
        },
        {
          subject: 'English',
          details: ['20 Total', '10 Pending']
        },
        {
            subject: 'Maths',
            details: ['20 Total', '10 Pending']
          },
          {
            subject: 'Maths',
            details: ['20 Total', '10 Pending']
          },
          {
            subject: 'Maths',
            details: ['20 Total', '10 Pending']
          },
          {
            subject: 'Maths',
            details: ['20 Total', '10 Pending']
          },
          {
            subject: 'Maths',
            details: ['20 Total', '10 Pending']
          },
      ];
  return (
    <>
        <div className='flex flex-row justify-between items-center'>
            <span className='text-buttonGray text-xs'>Subjects</span>
            
            <div className='md:w-28  lg:w-40 xl:w-40 2xl:w-44 h-10 bg-slate-400 border rounded-xl mt-2 flex items-center justify-center md:mr-4 lg:mr-12 xl:mr-20'>
            <div className='flex flex-row items-center gap-1'>
            <p className='text-white sm:text-xxxs text-xxs'>Create new assignment</p>
            <GrAdd color='white' size={"13px"} />
          </div>
        </div>
        </div>

         <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 items-center mt-5 gap-5'>
         {data.map((item, index) => (
        //   <Link href={getLinkHref(index)} key={index} passHref>
          <div className={(index === 0 || index === 2) ? 'cursor-pointer' : ''} key={index} >
           
            <div className='flex flex-wrap gap-4 items-center'>
              <div className='sm:w-24 md:w-32 lg:w-40 xl:w-56 2xl:w-72 h-30 bg-buttonGray border rounded-md flex flex-col justify-between p-4'>
                <div>
                  <h1 className='text-white text-xs font-bold'>{item.subject}</h1>
                  {item.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className='text-white text-xxs'>{detail}</li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        //   </Link>
        ))}
      
      </div>
    
    </>
  )
}

export default page