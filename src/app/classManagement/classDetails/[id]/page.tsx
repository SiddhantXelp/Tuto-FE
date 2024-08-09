"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getClassById } from '@/app/store/actions/classes';
import TabNavigator from "../../../TabNavigator/page";
import moment from 'moment';
import StartClassDialog from '../../overView/StartClass';


const ClassDetails = () => {

    const params = useParams();
    const dispatch = useAppDispatch();
    const viewClassData = useAppSelector((state: { classes: any }) => state.classes.ClassById);

    console.log("viewClassData", viewClassData);
    const id = params.id
    const memberAuthToken = "hasidfhiuewhrhsdjsahksjhfsuidjhsyujx";

    useEffect(() => {
        if (id) {
            dispatch(getClassById(memberAuthToken, id));
        }

    }, [id]);


    const combinedDateTime = moment(viewClassData?.scheduleDate).format('YYYY-MM-DD') + ' ' + viewClassData?.classStartTime;

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


    const duration = calculateDuration(viewClassData?.classStartTime, viewClassData?.classEndTime);
    const [open, setOpen] = useState(false);

    return (
        <TabNavigator>
            <StartClassDialog open={open} setOpen={setOpen} />

            <div className="w-full h-full bg-white rounded-lg p-4 flex flex-col gap-y-4 shadow-md mt-10 sm:h-full" style={{ height: "500px" }}>
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <div className="w-80 h-48 bg-slate-500 rounded-[23px] flex flex-col justify-between p-4 mb-11">
                        <h1 className="text-white">{viewClassData?.subject?.name || "NA"}</h1>
                    </div>
                    <div className="flex flex-col space-y-2 mt-0">
                        <button className="bg-gray-500 text-white py-2 px-4 rounded-[23px] hover:bg-gray-600 w-48" onClick={() => setOpen(true)}>
                            Start Class
                        </button>
                        <button className="bg-gray-200 text-black py-2 px-4 rounded-[23px] hover:bg-gray-600 hover:text-white">
                            Save & Exit
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-black">Class title:</span>
                        <span className="text-xs md:text-sm text-gray-500">{viewClassData?.title || "NA"}</span>
                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-black">Status:</span>
                        <span className="text-xs md:text-sm text-gray-500">NA</span>
                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-black">Recording:</span>
                        <span className="text-xs md:text-sm text-gray-500">NA</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-black">Time & Date:</span>
                        <span className="text-xs md:text-sm text-gray-500">{formattedDateTime}</span>
                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-black">Duration:</span>
                        <span className="text-xs md:text-sm text-gray-500">{viewClassData ? duration : ""}</span>
                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-black">Assignments:</span>
                        <span className="text-xs md:text-sm text-gray-500">Chapter 1 Homework</span>
                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-black">Class Materials:</span>
                        <span className="text-xs md:text-sm text-gray-500">{viewClassData?.materialUrl || "NA"}</span>
                    </div>
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
//                         <button className="bg-gray-500 text-white py-2 px-4 rounded-[23px] hover:bg-gray-600 w-48" onClick={() => setOpen(true)}>
//                             Start Class
//                         </button>
//                         <button className="bg-gray-200 text-black py-2 px-4 rounded-[23px] hover:bg-gray-600 hover:text-white">
//                             Save & Exit
//                         </button>
//                     </div>
//                 </div>

//                 <div className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
//                     <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
//                         <span className="text-xs md:text-sm font-semibold text-black">Class title:</span>
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
//                         <span className="text-xs md:text-sm font-semibold text-black">Status:</span>
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
//                         <span className="text-xs md:text-sm font-semibold text-black">Recording:</span>
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
//                         <span className="text-xs md:text-sm font-semibold text-black">Time & Date:</span>
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
//                         <span className="text-xs md:text-sm font-semibold text-black">Duration:</span>
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
//                         <span className="text-xs md:text-sm font-semibold text-black">Assignments:</span>
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
//                     <span className="text-xs md:text-sm font-semibold text-black">Materials:</span>
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
