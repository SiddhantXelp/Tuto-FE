"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getClassById } from '@/app/store/actions/classes';
import TabNavigator from "../../../TabNavigator/page";
import moment from 'moment';
import StartClassDialog from '../../overView/StartClass';
import Image from 'next/image';
import { students } from "./data";
import { IoMdPersonAdd } from "react-icons/io";
import CommonModel from "./CommonModel";
import Link from 'next/link';

const ClassDetails = () => {
    const [open, setOpen] = useState(false);
    const [openAssignmentModel, setAssignmentModel] = useState(false);
    const [openClassModel, setClassModel] = useState(false);
    const [openRecordingModel, setRecordingModel] = useState(false);
    const [openTimeDateModel, setTimeDateModel] = useState(false);


    const params = useParams();
    const dispatch = useAppDispatch();
    const viewClassData = useAppSelector((state: { classes: any }) => state.classes.ClassById?.data[0]);
    const id = params.id
    const memberAuthToken = useAppSelector((state: { auth: any }) => state.auth.login?.token);

    useEffect(() => {
        if (id) {
            dispatch(getClassById(memberAuthToken, id));
        }

    }, [id]);


    const combinedDateTime = moment(viewClassData?.classSchedule?.scheduleDate).format('YYYY-MM-DD') + ' ' + viewClassData?.classSchedule?.classStartTime;

    const formattedDateTime = moment(combinedDateTime, 'YYYY-MM-DD HH:mm').format('h:mm A, MMM D');


    const calculateDuration = (startTime: string, endTime: string) => {
        if (startTime && endTime) {
            const startMoment = moment(startTime, 'HH:mm');
            const endMoment = moment(endTime, 'HH:mm');


            if (endMoment.isBefore(startMoment)) {
                endMoment.add(1, 'day');
            }

            const durationMinutes = endMoment.diff(startMoment, 'minutes');
            const durationHours = Math.floor(durationMinutes / 60);
            const durationMins = durationMinutes % 60;

            const formattedDuration = `${durationHours} hr ${durationMins} min`;

            return formattedDuration;
        } else {
            return "Invalid time input";
        }
    };


    const duration = calculateDuration(viewClassData?.classSchedule?.classStartTime, viewClassData?.classSchedule?.classEndTime);

    return (
        <TabNavigator>
            <StartClassDialog open={open} setOpen={setOpen} classLink={viewClassData?.videoCallLink} />

            <div className="m-5  h-full bg-white rounded-lg p-4 flex flex-col gap-y-4 shadow-md mt-5 sm:h-full">
                <div className="flex justify-between items-center border-b border-gray-300 pb-2 m-2">
                    <div className="relative flex flex-col justify-between p-4 mb-11 rounded-lg w-full max-w-[441px] h-[200px] sm:h-[250px] md:h-[200px]">
                        <div className="relative w-full h-full">
                            <Image
                                src="/school-subjects.jpg"
                                alt="Description of image"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white pl-5 p-2 rounded-b-lg">
                            {viewClassData?.subject?.name || "NA"}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 mt-0">
                        <button className="bg-gray-500 text-white py-2 px-4 rounded-[23px] hover:bg-gray-600 w-48 text-sm" onClick={() => setOpen(true)}>
                            Start Class
                        </button>
                        <Link href="/classManagement">
                            <button className="bg-gray-200 text-[#565656] py-2 px-4 rounded-[23px] hover:bg-gray-600 hover:text-white border border-[#707070] text-sm w-48">
                                Save & Exit
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Class title:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">{viewClassData?.title || "NA"}</span>
                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Status:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">NA</span>
                    </div>
                    <div className="relative flex flex-col mx-4 md:mx-8 w-full md:w-auto cursor-pointer" onClick={() => setRecordingModel(!openRecordingModel)}>
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Recording:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">NA</span>
                        <CommonModel isOpen={openRecordingModel} onClose={() => setRecordingModel(false)}>
                            <div className='flex justify-between'>
                                <button className='border border-gray-400 p-2 rounded-md w-24'>Allow</button>
                                <button className='border border-gray-400 p-2 rounded-md mx-5 w-24'>Deny</button>
                            </div>
                        </CommonModel>
                    </div>
                </div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto cursor-pointer" onClick={() => setTimeDateModel(!openTimeDateModel)}>
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Time & Date:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">{formattedDateTime}</span>
                        <CommonModel isOpen={openTimeDateModel} onClose={() => setTimeDateModel(false)}>
                            <div>
                                <h1 className='text-sm'>Edit Time & Date</h1>

                                <div className='mt-5 rounded-md border border-gray-400 pl-2 text-sm'>
                                    <h1>Date</h1>
                                    <input type="date" />
                                </div>

                                <div className='mt-5 rounded-md border border-gray-400 pl-2 text-sm'>
                                    <h1>Start Time</h1>
                                    <input type="Time" />
                                </div>

                                <div className='mt-5 rounded-md border border-gray-400 pl-2 text-sm'>
                                    <h1>End Time</h1>
                                    <input type="Time" />
                                </div>


                                <button className='w-full bg-[#565656] rounded-md p-4 text-white mt-5 text-sm opacity-200'>Submit</button>

                            </div>
                        </CommonModel>
                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Duration:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">{viewClassData ? duration : ""}</span>
                    </div>
                    <div className="relative flex flex-col mx-4 md:mx-8 w-full md:w-auto cursor-pointer" onClick={() => setAssignmentModel(!openAssignmentModel)} >
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Assignments:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">Chapter 1 Homework</span>
                        <CommonModel isOpen={openAssignmentModel} onClose={() => setAssignmentModel(false)}>
                            <button className='w-full bg-gray-500 rounded-md p-2 text-white text-sm'>Create new Assignment</button>
                            <button className='w-full bg-gray-500 rounded-md p-2 text-white mt-5 text-sm'>View and Correct</button>
                        </CommonModel>

                    </div>
                    <div className="relative flex flex-col mx-4 md:mx-8 w-full md:w-auto cursor-pointer" onClick={() => setClassModel(!openClassModel)} >
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Class Materials:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">{viewClassData?.materialUrl || "NA"}</span>
                        <CommonModel isOpen={openClassModel} onClose={() => setClassModel(false)}>
                            <button className='w-full bg-gray-500 rounded-md p-2 text-white text-sm'>Upload Material</button>
                            <button className='w-full bg-gray-500 rounded-md p-2 text-white mt-5 text-sm'>View and Edit</button>
                        </CommonModel>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center pb-4 md:pb-2 w-full">
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full">
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Students</span>
                        <div className="overflow-x-auto w-full mt-5 justify-between flex">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr>
                                        <th className="py-5 px-4 font-normal text-[#565656]">Name</th>
                                        <th className="py-5 px-4 font-normal text-[#565656]">Grade</th>
                                        <th className="py-5 px-4 font-normal text-[#565656]">Attendance</th>
                                        <th className="py-5 px-4 font-normal text-[#565656]">Parent Info</th>
                                        <th className="py-5 px-4 font-normal text-[#565656]">Group</th>
                                        <th className="py-5 px-4 font-normal text-[#565656]">Assignment</th>
                                        <th className="py-5 px-4 font-normal text-[#565656]">Remark</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {viewClassData && viewClassData?.students.map((student: any, index: any) => (
                                        <tr key={index} className="border-b p-5">
                                            <td className="py-5 px-4 font-normal text-[#565656]">{student?.studentFullName || "N/A"}</td>
                                            <td className="py-5 px-4 font-normal text-[#565656]">{student?.grade || "N/A"}</td>
                                            <td className="py-5 px-4 font-normal text-[#565656]">{student?.attendance || "N/A"}</td>
                                            <td className="py-5 px-4 font-normal text-[#565656]">{student?.parentInfo || "N/A"}</td>
                                            <td className="py-5 px-4 font-normal text-[#565656]">{student?.groupTitle || "N/A"}</td>
                                            <td className="py-5 px-4 font-normal text-[#565656]">{student?.assignment || "N/A"}</td>
                                            <td className="py-5 px-4 font-normal text-[#565656]">{student?.remark || "N/A"}</td>
                                        </tr>
                                    ))}

                                    {/* { viewClassData.length > 0 && <div>There is no any student added in this class</div>} */}
                                </tbody>
                            </table>
                            <span className="text-xs md:text-sm font-semibold text-[#565656]"><IoMdPersonAdd size={20} /></span>

                        </div>
                    </div>

                </div>

                <div className='flex justify-end'>
                    <button className="bg-gray-200 text-[#565656] py-2 px-4 rounded-[23px] hover:bg-gray-600 hover:text-white border border-[#707070] text-sm w-48">
                        Cancel Class
                    </button>
                </div>

            </div>
        </TabNavigator>
    )


}


export default ClassDetails;









// "use client";

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
// import { getClassById } from '@/app/store/actions/classes';
// import TabNavigator from "../../../TabNavigator/page";
// import moment from 'moment';
// import StartClassDialog from '../../overView/StartClass';

// const ClassDetails = () => {

//     const params = useParams();
//     const dispatch = useAppDispatch();
//     const viewClassData = useAppSelector((state: { classes: any }) => state.classes.ClassById);

//     console.log("viewClassData", viewClassData);
//     const id = params.id;
//     const memberAuthToken = "hasidfhiuewhrhsdjsahksjhfsuidjhsyujx";

//     useEffect(() => {
//         if (id) {
//             dispatch(getClassById(memberAuthToken, id));
//         }
//     }, [id]);

//     const combinedDateTime = moment(viewClassData?.scheduleDate).format('YYYY-MM-DD') + ' ' + viewClassData?.classStartTime;
//     const formattedDateTime = moment(combinedDateTime, 'YYYY-MM-DD HH:mm').format('h:mm A, MMM D');

//     const calculateDuration = (startTime: string, endTime: string) => {
//         if (startTime && endTime) {
//             const startMoment = moment(startTime, 'HH:mm');
//             const endMoment = moment(endTime, 'HH:mm');

//             if (endMoment.isBefore(startMoment)) {
//                 endMoment.add(1, 'day');
//             }

//             const durationMinutes = endMoment.diff(startMoment, 'minutes');
//             const durationHours = Math.floor(durationMinutes / 60);
//             const durationMins = durationMinutes % 60;

//             const formattedDuration = `${durationHours} hr ${durationMins} min`;

//             return formattedDuration;
//         } else {
//             return "Invalid time input";
//         }
//     };

//     const duration = calculateDuration(viewClassData?.classStartTime, viewClassData?.classEndTime);
//     const [open, setOpen] = useState(false);

//     // State for editing fields
//     const [isEditing, setIsEditing] = useState({ title: false, status: false, recording: false, dateTime: false, duration: false, assignments: false, materials: false });
//     const [editValues, setEditValues] = useState({
//         title: viewClassData?.title || "NA",
//         status: "Scheduled",
//         recording: "Enabled",
//         dateTime: formattedDateTime,
//         duration: duration,
//         assignments: "Chapter 1 Homework",
//         materials: viewClassData?.materialUrl || "NA",
//     });

//     const handleEdit = (field: string) => {
//         setIsEditing({ ...isEditing, [field]: true });
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
//         setEditValues({ ...editValues, [field]: e.target.value });
//     };

//     const handleBlur = (field: string) => {
//         setIsEditing({ ...isEditing, [field]: false });
//         console.log(editValues); // Log values on blur
//     };

//     return (
//         <TabNavigator>
//             <StartClassDialog open={open} setOpen={setOpen} />

//             <div className="w-full h-full bg-white rounded-2xl p-4 flex flex-col gap-y-4 shadow-md mt-10 sm:h-full" style={{ height: "500px" }}>
//                 <div className="flex justify-between items-center border-b border-gray-300 pb-2">
//                     <div className="w-80 h-48 bg-slate-500 rounded-[23px] flex flex-col justify-between p-4 mb-11">
//                         <h1 className="text-white">{viewClassData?.subject?.name || "NA"}</h1>
//                     </div>
//                     <div className="flex flex-col space-y-2 mt-0">
//                         <button className="bg-gray-500 text-white py-5 px-4 rounded-[23px] hover:bg-gray-600 w-48" onClick={() => setOpen(true)}>
//                             Start Class
//                         </button>
//                         <button className="bg-gray-200 text-[#565656] py-5 px-4 rounded-[23px] hover:bg-gray-600 hover:text-white">
//                             Save & Exit
//                         </button>
//                     </div>
//                 </div>

//                 <div className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
//                     <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
//                         <span className="text-xs md:text-sm font-semibold text-[#565656]">Class title:</span>
//                         {isEditing.title ? (
//                             <input
//                                 className="text-xs md:text-sm text-gray-500"
//                                 value={editValues.title}
//                                 onChange={(e) => handleChange(e, 'title')}
//                                 onBlur={() => handleBlur('title')}
//                                 autoFocus
//                             />
//                         ) : (
//                             <span className="text-xs md:text-sm text-gray-500" onClick={() => handleEdit('title')}>{editValues.title}</span>
//                         )}
//                     </div>
//                     <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
//                         <span className="text-xs md:text-sm font-semibold text-[#565656]">Status:</span>
//                         {isEditing.status ? (
//                             <input
//                                 className="text-xs md:text-sm text-gray-500"
//                                 value={editValues.status}
//                                 onChange={(e) => handleChange(e, 'status')}
//                                 onBlur={() => handleBlur('status')}
//                                 autoFocus
//                             />
//                         ) : (
//                             <span className="text-xs md:text-sm text-gray-500" onClick={() => handleEdit('status')}>{editValues.status}</span>
//                         )}
//                     </div>
//                     <div className="flex flex-col mx-4 md:mx-8 w-full md:w-auto">
//                         <span className="text-xs md:text-sm font-semibold text-[#565656]">Recording:</span>
//                         {isEditing.recording ? (
//                             <input
//                                 className="text-xs md:text-sm text-gray-500"
//                                 value={editValues.recording}
//                                 onChange={(e) => handleChange(e, 'recording')}
//                                 onBlur={() => handleBlur('recording')}
//                                 autoFocus
//                             />
//                         ) : (
//                             <span className="text-xs md:text-sm text-gray-500" onClick={() => handleEdit('recording')}>{editValues.recording}</span>
//                         )}
//                     </div>
//                 </div>

//                 <div className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
//                     <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
//                         <span className="text-xs md:text-sm font-semibold text-[#565656]">Time & Date:</span>
//                         {isEditing.dateTime ? (
//                             <input
//                                 className="text-xs md:text-sm text-gray-500"
//                                 value={editValues.dateTime}
//                                 onChange={(e) => handleChange(e, 'dateTime')}
//                                 onBlur={() => handleBlur('dateTime')}
//                                 autoFocus
//                             />
//                         ) : (
//                             <span className="text-xs md:text-sm text-gray-500" onClick={() => handleEdit('dateTime')}>{editValues.dateTime}</span>
//                         )}
//                     </div>
//                     <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
//                         <span className="text-xs md:text-sm font-semibold text-[#565656]">Duration:</span>
//                         {isEditing.duration ? (
//                             <input
//                                 className="text-xs md:text-sm text-gray-500"
//                                 value={editValues.duration}
//                                 onChange={(e) => handleChange(e, 'duration')}
//                                 onBlur={() => handleBlur('duration')}
//                                 autoFocus
//                             />
//                         ) : (
//                             <span className="text-xs md:text-sm text-gray-500" onClick={() => handleEdit('duration')}>{editValues.duration}</span>
//                         )}
//                     </div>
//                     <div className="flex flex-col mx-4 md:mx-8 w-full md:w-auto">
//                         <span className="text-xs md:text-sm font-semibold text-[#565656]">Assignments:</span>
//                         {isEditing.assignments ? (
//                             <input
//                                 className="text-xs md:text-sm text-gray-500"
//                                 value={editValues.assignments}
//                                 onChange={(e) => handleChange(e, 'assignments')}
//                                 onBlur={() => handleBlur('assignments')}
//                                 autoFocus
//                             />
//                         ) : (
//                             <span className="text-xs md:text-sm text-gray-500" onClick={() => handleEdit('assignments')}>{editValues.assignments}</span>
//                         )}
//                     </div>
//                 </div>

//                 <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
//                     <span className="text-xs md:text-sm font-semibold text-[#565656]">Materials:</span>
//                     {isEditing.materials ? (
//                         <input
//                             className="text-xs md:text-sm text-gray-500"
//                             value={editValues.materials}
//                             onChange={(e) => handleChange(e, 'materials')}
//                             onBlur={() => handleBlur('materials')}
//                             autoFocus
//                         />
//                     ) : (
//                         <span className="text-xs md:text-sm text-gray-500" onClick={() => handleEdit('materials')}>{editValues.materials}</span>
//                     )}
//                 </div>
//             </div>
//         </TabNavigator>
//     );
// };

// export default ClassDetails;
