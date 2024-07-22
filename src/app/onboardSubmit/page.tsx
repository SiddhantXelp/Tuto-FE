import React from 'react'
import { FaVideo,FaCalendar,FaFileVideo } from "react-icons/fa6";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdPricetag } from "react-icons/io";

const OnboardSubmit = () => {
  return (
    <div className='flex justify-center items-center h-auto'>
      <div className='w-2/4 bg-gray-100 shadow-lg rounded p-0 mt-10 border-gray-300 border-solid border-2'>
     
      <table className="table-auto w-full">
      <thead>
      <tr className='bg-slate-100 h-40 w-full justify-center'>
      <th className='text-3xl text-buttonGray'>Yeshwanth</th>
    </tr>
  </thead>
  <tbody>
     <tr className='bg-white'>
      <td className='h-12'>
        <div className='flex flex-row gap-5'>
        <FaVideo size={"25"} className='ml-2' color='gray'/>
        <p className='text-sm text-buttonGray'>Zoom Call</p>
        </div>
      </td>
    </tr>
    <tr className='bg-slate-100'>
      <td className='h-12'>
        <div className='flex flex-row gap-5'>
        <HiOutlineMenuAlt2 size={"25"} className='ml-2' color='gray'/>
        <p className='text-sm text-buttonGray'>No.of subjects</p>
        <td></td>
        <td></td>
        <td></td>
        <td className='text-sm text-buttonGray'>05</td>
        </div>
      </td>
    </tr>
    <tr className='bg-white'>
      <td className='h-12'>
        <div className='flex flex-row gap-5'>
        <FaCalendar size={"25"} className='ml-2' color='gray'/>
        <p className='text-sm text-buttonGray'>Days</p>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td className='text-sm text-buttonGray'>Sun,Mon,Fri</td>
        </div>
      </td>
    </tr>
    <tr className='bg-slate-100'>
      <td className='h-12'>
        <div className='flex flex-row gap-5'>
        <IoMdPricetag size={"25"} className='ml-2'color='gray'/>
        <p className='text-sm text-buttonGray'>Pricing</p>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td className='text-sm text-buttonGray'>Monthly:$15000</td>
        </div>
      </td>
    </tr>
    <tr className='bg-white'>
      <td className='h-12'>
        <div className='flex flex-row gap-5'>
        <FaFileVideo size={"25"} className='ml-2' color='gray'/>
        <p className='text-sm text-buttonGray'>VideoRecardings</p>
        <td></td>
        <td></td>
        <td className='text-sm text-buttonGray'>Available</td>
        </div>
      </td>
    </tr>
   
  </tbody>
</table>
​
<div className='m-5'>
          <button className='w-full bg-gray-400 h-12 rounded-md text-white'>Save & Proceed</button>
        </div>
      </div>
      </div>
  )
}

export default OnboardSubmit