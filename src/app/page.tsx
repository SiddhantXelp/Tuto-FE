import { TiGroup } from "react-icons/ti";
import { BiSolidBarChartAlt2 } from "react-icons/bi";

export default function Home() {
  return (
    <>
      
      <div className="border-dashed border border-zinc-500 w-full  rounded-lg flex flex-row h-auto p-2">
     <div className="flex flex-row gap-5">
       <div>
        <span className="text-buttonGray text-sm">Students</span>
        <div className="w-56 h-32 bg-white shadow-lg rounded-xl p-2">
        <li className="text-buttonGray text-sm">200 students</li>
        <div className="ml-5 flex flex-col mt-2">
          <span className="text-buttonGray text-xxs" >144 Active students</span>
          <span className="text-buttonGray text-xxs">14 Newly registered</span>
        </div>
        <div className=" flex justify-end mt-10">
            <p><TiGroup size={15}/></p>
          </div>
        </div>
      </div>
      
      <div>
  <span className="text-buttonGray text-sm">Class Management</span>
  <div className="w-56 h-32 bg-white shadow-lg rounded-xl p-2">
    <ol className="list">
      <li className="text-buttonGray text-sm break-words">
        20 classes scheduled for next 7 days
      </li>
    </ol>
    <div className="ml-5 flex flex-col">
      <span className="text-buttonGray text-xxs">2 classes available</span>
      <span className="text-buttonGray text-xxs"></span>
      <div className="flex justify-end mt-10">
        <p><BiSolidBarChartAlt2 size={15} /></p>
      </div>
    </div>
  </div>
</div>

       
       <div>

       </div>
       </div>
      </div>
     
     
     
     
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
    </>
  );
}
