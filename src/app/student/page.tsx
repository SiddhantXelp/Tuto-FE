import React from 'react';
import { GrAdd } from "react-icons/gr";
const StudentPage = () => {
  const data = [
    {
      cardName:"Students according to subjects",
      subject: 'English',
      details: ['20 Total', '10 Pending']
    },
    {
      cardNameEnd:"View all",
      subject: 'Telugu',
      details: ['20 Total', '10 Pending']
    },
    {
      cardName:"Students according to subjects",
      subject: 'Group A',
      details: ['20 Total', '10 Pending']
    },
    {
      cardNameEnd:"View all",
      subject: 'Group B',
      details: ['20 Total', '10 Pending']
    }
  ];

  const students = [
    { name: 'Shiva', grade: '05th', subjects: 'English, maths, hindi', attendance: '02/20', parentContact: '+91 955458465', enrollmentDate: '24/07/2022', performance: '2% ↓' },
    { name: 'Santhosh', grade: '09th', subjects: 'English, maths, hindi', attendance: '22/22', parentContact: '+91 955458465', enrollmentDate: '24/07/2022', performance: '4% ↑' },
    { name: 'Sandya', grade: '7th', subjects: 'English, maths, hindi', attendance: '22/22', parentContact: '+91 955458465', enrollmentDate: '24/07/2022', performance: '6% ↑' },
    { name: 'Sandya', grade: '08th', subjects: 'English, maths, hindi', attendance: '22/22', parentContact: '+91 955458465', enrollmentDate: '24/07/2022', performance: '2% ↓' },
  ];


  return (
    <div className='w-full h-auto'>
      <div className='flex flex-row gap-10'>
        <div>
          <span className='text-buttonGray text-sm'>No.of Students</span>
          <div className='w-72 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
          <div className='flex-grow flex items-center justify-center'>
         <h1 className='text-4xl text-black-400 font-bold'>
            280
          </h1>
         </div>
    
         <div className='flex flex-row gap-4'>
         <p className='text-sm text-buttonGray'>Newly joined: 55</p>
         <p className='text-sm text-buttonGray'>Recently Left: 55</p>
        </div>
         </div>
         </div>

         <div>
          <span className='text-buttonGray text-sm'>Performance</span>
         <div className='w-72 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
         </div>
         </div>

         <div>
          <span className='text-buttonGray text-sm'>Progress reports</span>
         <div className='w-72 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
         <div className="flex flex-row flex-initial justify-between mt-3">
          <div >
            <p className='text-buttonGray text-sm'>01 Suresh</p>
            <p className='text-buttonGray text-sm mt-1'>02. Mathew</p>
            <p className='text-buttonGray text-sm mt-1'>03. Shiva</p>
            <p className='text-buttonGray text-sm mt-1'>04. Sanjay</p>
          </div>
          <div>
            <p className='text-buttonGray text-sm'>98/100</p>
            <p className='text-buttonGray text-sm mt-1'>80/100</p>
            <p className='text-buttonGray text-sm mt-1'>78/100</p>
            <p className='text-buttonGray text-sm mt-1'>75/100</p>
          </div>
         </div>
         </div>
         </div>

         <div>
          <span className='text-buttonGray text-sm'>Groups</span>
         <div className='w-72 h-36 bg-white border rounded-md flex flex-col justify-between p-4'>
         <div className="flex flex-row flex-initial justify-between mt-3">
          <div >
            <p className='text-buttonGray text-sm'>Group A</p>
            <p className='text-buttonGray text-sm mt-1'>Group B</p>
            <p className='text-buttonGray text-sm mt-1'>Group C</p>
            <p className='text-buttonGray text-sm mt-1'>Group D</p>
          </div>
          <div>
            <p className='text-buttonGray text-sm'>20</p>
            <p className='text-buttonGray text-sm mt-1'>25</p>
            <p className='text-buttonGray text-sm mt-1'>66</p>
            <p className='text-buttonGray text-sm mt-1'>38</p>
          </div>
         </div>
         </div>
         </div>

       </div>

   <div className='flex flex-row gap-10 mt-10 '>
       {data.map((item, index) => (
      <div className=''>
      <div className='flex flex-row justify-between'>
      <span className='text-buttonGray text-sm'>{item.cardName}</span>
      <span className='text-buttonGray mt-1'> 
        <p className='text-xs'>
        {item.cardNameEnd}
         </p>
      </span>
      </div>
      <div className='flex flex-wrap gap-4 items-center '>
          <div key={index} className='w-56 h-30 bg-buttonGray border rounded-md flex flex-col justify-between p-4'>
            <div>
              <h1 className='text-white text-2xl font-bold'>{item.subject}</h1>
              
                {item.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className='text-white text-sm'>{detail}</li>
                ))}
              
            </div>
          </div>
       
      </div>
      
    </div>
  ))}

<div className='w-44 h-30 bg-buttonGray border rounded-md mt-6 flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <GrAdd color='white' size={"50px"} />
        <p className='text-white text-xl'>Add Student</p>
      </div>
    </div>
  </div>


  

<div className="mt-10 ">
  <h2 className="text-lg font-semibold mb-4">Recently added students</h2>
    <table className=" w-11/12	 bg-white border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-slate-100">
          <th className="py-2 px-4 border-b text-left text-buttonGray">Student</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray">Grade</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray">Subjects</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray">Attendance</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray">Parent Contact</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray">Enrollment date</th>
          <th className="py-2 px-4 border-b text-left text-buttonGray">Performance</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b flex items-center">
              <img src="/path/to/avatar.jpg" alt="avatar" className="w-8 h-8 rounded-full mr-2" />
              {student.name}
            </td>
            <td className="py-2 px-4 border-b text-buttonGray">{student.grade}</td>
            <td className="py-2 px-4 border-b text-buttonGray">{student.subjects}</td>
            <td className="py-2 px-4 border-b text-buttonGray">{student.attendance}</td>
            <td className="py-2 px-4 border-b text-buttonGray">{student.parentContact}</td>
            <td className="py-2 px-4 border-b text-buttonGray">{student.enrollmentDate}</td>
            <td className="py-2 px-4 border-b text-buttonGray">{student.performance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>


    </div>
  );
};

export default StudentPage;
