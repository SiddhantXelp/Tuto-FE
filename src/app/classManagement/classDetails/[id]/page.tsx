"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getClassById } from '@/app/store/actions/classes';
import TabNavigator from "../../../TabNavigator/page";
import moment from 'moment';


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

    return (
        <TabNavigator>
            <div className="w-full h-full bg-white rounded-lg p-4 flex flex-col gap-y-4 shadow-md mt-10 sm:h-full" style={{ height: "500px" }}>
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <div className="w-80 h-48 bg-slate-500 rounded-[23px] flex flex-col justify-between p-4 mb-11">
                        <h1 className="text-white">{viewClassData?.subject?.name || "NA"}</h1>
                    </div>
                    <div className="flex flex-col space-y-2 mt-0">
                        <button className="bg-gray-500 text-white py-2 px-4 rounded-[23px] hover:bg-gray-600 w-48">
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
                        <span className="text-xs md:text-sm text-gray-500">Scheduled</span>
                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-black">Recording:</span>
                        <span className="text-xs md:text-sm text-gray-500">Enabled</span>
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
