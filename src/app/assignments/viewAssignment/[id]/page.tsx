'use client';

import React, { useEffect, useMemo, useState } from 'react';
import TabNavigator from "@/app/TabNavigator/page";
import { MdKeyboardArrowRight, MdDownload, MdKeyboardArrowLeft, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { BsPencilSquare, BsEraserFill } from "react-icons/bs";
import { LuPencilRuler } from "react-icons/lu";
import { CiText } from "react-icons/ci";
import { RiEditBoxFill } from "react-icons/ri";
import { useRouter, useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getAssignmentById, getCompleteAssignment, setCompleteAssignment } from '@/app/store/actions/assignment';
import Spinner from "@/common/Spinner";
import CommonModel from "@/common/CommonModel";
import Swal from 'sweetalert2';
import { formatDate } from '@/common/DateAndTimeCommon';

const MyFilesPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const getAssignmentResponse = useAppSelector(state => state?.assignment?.setAssignmentById?.assignment || []);
    const getCompletedAssignmentResponse = useAppSelector(state => state?.assignment?.setCompletedAssignment || []);
    const isLoading = useAppSelector(state => state?.assignment?.loading);
    const token = useAppSelector((state: { auth: any }) => state?.auth?.login?.token);
    const [open, setOpen] = useState(false);
    const assignmentData = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments?.data || []);
    const { id } = useParams()

    const assignment = useMemo(() => {
        return (assignmentData || [])
            .map((assignment: any) => ({
                id: assignment.id,
                assignmentTitle: assignment?.assignment.assignmentTitle,
                subject: assignment?.assignment?.subject,
                students: assignment?.fullName,
                material: assignment?.assignment?.material,
                status: assignment?.assignment?.status
            }));
    }, [assignmentData]);

    const currentIndex = assignment.findIndex((item: any) => item.id === id);
    const nextAssignmentId = assignment.slice(currentIndex + 1).find((item: any) => item.id !== id)?.id || null;

    useEffect(() => {
        if (id) {
            dispatch(getAssignmentById(token, String(id)));
        }
    }, [dispatch, token, id]);

    const handelCompleteAssignment = () => {
        const status = {
            status: "completed"
        }
        dispatch(getCompleteAssignment(token, status, id));
    }

    useEffect(() => {

        if (getCompletedAssignmentResponse?.status) {
            router.push("/assignments/subjects");
            Swal.fire({
                title: 'Success!',
                text: 'Paper completed!',
                icon: 'success',
                confirmButtonText: 'Done'
            });
            dispatch(setCompleteAssignment(null));
        }

    }, [getCompletedAssignmentResponse?.status])


    const handleNextClick = () => {
        if (nextAssignmentId) {
            router.push(`/assignments/viewAssignment/${nextAssignmentId}`);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'No more assignments!',
                icon: 'error',
                confirmButtonText: 'ok'
            });
        }
    };

    return (
        <TabNavigator>
            {
                isLoading && <Spinner />
            }
            <CommonModel open={open} setOpen={setOpen}>
                <button
                    type="button"
                    className="w-full bg-[#6D6D6D] text-white py-2 rounded"
                    onClick={handelCompleteAssignment}
                >
                    Finish and exit
                </button>
                <h1 className='flex justify-center text-[#707070] m-3'>or</h1>
                <button
                    type="button"
                    className="w-full bg-[#6D6D6D] text-white py-2 rounded"
                    onClick={handleNextClick}
                >
                    Next paper
                </button>
            </CommonModel>
            <div className="p-4 md:p-7 bg-white rounded-xl m-2">
                <div className="flex flex-col md:flex-row gap-4 h-full">
                    <div className="w-full md:w-1/4 flex flex-col space-y-4">

                        {/* View Card */}
                        <div className="bg-[#D1D1D1] rounded-lg h-20 w-56 flex items-center p-2 md:p-4">
                            <img src="/profile.png" className="h-10 w-10 rounded-full" alt="Profile" />
                            <div className="ml-2 md:ml-5 flex-1">
                                <h1 className="text-xs md:text-sm font-medium">{"NA" || "NA"}</h1>
                                <h1 className="text-xs ">6th grade</h1>
                            </div>
                            <div className="border-l border-black h-16 md:h-full mx-2 md:mx-4"></div>
                            <div className="ml-2 md:ml-3">
                                <h1 className="text-xs md:text-sm text-[#565656] cursor-pointer">View</h1>
                            </div>
                        </div>

                        {/* Subject Section */}
                        <div className="pt-5 flex justify-between items-center">
                            <div>
                                <h1 className="text-xs md:text-sm font-medium text-[#565656]">Subject</h1>
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">{getAssignmentResponse?.subject || "NA"}</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdDownload className="text-[#565656] text-base" />
                                <h1 className="text-xs md:text-sm text-[#565656] cursor-pointer">Download</h1>
                            </div>
                        </div>
                        <div className='border-b border-gray-300 mb-3'></div>

                        {/* Type Section */}
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xs md:text-sm font-medium text-[#565656]">Type</h1>
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">Written</h1>
                            </div>
                        </div>
                        <div className='border-b border-gray-300 mb-3'></div>

                        {/* Due Date and Submitted Date Section */}
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xs md:text-sm font-medium text-[#565656]">Due date</h1>
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">{formatDate(getAssignmentResponse?.date) || "NA"}</h1>
                            </div>
                            <div>
                                <h1 className="text-xs md:text-sm font-medium text-[#565656]">Submitted date</h1>
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">{formatDate(getAssignmentResponse?.date) || "NA"}</h1>
                            </div>
                        </div>
                        <div className='border-b border-gray-300 mb-3'></div>

                        {/* Total Marks Section */}
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xs md:text-sm font-medium text-[#565656]">Total marks</h1>
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">100</h1>
                            </div>
                        </div>
                        <div className='border-b border-gray-300 mb-3'></div>

                        {/* Marks Gained Section */}
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xs md:text-sm font-medium text-[#565656]">Marks gained</h1>
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">100</h1>
                            </div>
                        </div>
                        <div className='border-b border-gray-300 mb-3'></div>

                    </div>


                    <div className="w-full md:w-2/4 flex flex-col items-center">
                        <div className="bg-gray-100 p-4 rounded-lg w-full h-auto flex flex-col items-center justify-center">
                            <img src="/homeWork.png" alt="Large Image" className="object-cover rounded-lg h-[700px] w-[500px]" />

                            <div className="flex justify-between w-full mt-4">
                                <div className="flex items-center gap-2">
                                    <BsPencilSquare className="text-[#565656] text-base" />
                                    <h1 className="text-xs md:text-sm text-[#565656] cursor-pointer">View question paper</h1>
                                </div>
                                <div className="flex items-center gap-2 border  border-[#707070] p-2 rounded-md w-28">
                                    <h1 className="text-sm font-medium text-[#565656] mr-2">Page 2</h1>
                                    <MdOutlineKeyboardArrowUp className="text-[#565656]" size={25} />

                                </div>


                            </div>
                        </div>
                    </div>


                    <div className="w-full md:w-1/4 flex flex-col space-y-4 p-4">
                        {/* Item List */}
                        <div className="bg-gray-100 p-4 rounded-lg flex flex-wrap justify-center gap-4">
                            <div className="flex items-center justify-center w-1/4 md:w-1/6 p-2">
                                <LuPencilRuler size={25} className="text-gray-700" />
                            </div>
                            <div className="flex items-center justify-center w-1/4 md:w-1/6 p-2">
                                <BsEraserFill size={25} className="text-gray-700" />
                            </div>
                            <div className="flex items-center justify-center w-1/4 md:w-1/6 p-2">
                                <CiText size={25} className="text-gray-700" />
                            </div>
                            <div className="flex items-center justify-center w-1/4 md:w-1/6 p-2">
                                <RiEditBoxFill size={25} className="text-gray-700" />
                            </div>
                        </div>
                        {/* Remarks Section */}
                        <div>
                            <h1 className="text-sm font-semibold mb-2 text-[#565656]">Remarks</h1>
                            <textarea
                                rows={10}
                                className="border border-gray-300 rounded-md w-full bg-gray-100 p-2"
                                placeholder="Enter remarks here..."
                            />
                        </div>

                        {/* Page Input Section */}
                        <div>
                            <h1 className="text-sm text-[#565656] font-semibold">Page 2</h1>
                            <input
                                type="text"
                                className="border border-gray-300 w-full rounded-md h-10 mt-2 p-2"
                                placeholder="Marks"
                            />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col md:flex-row justify-between gap-2">
                            <button className="rounded-3xl border border-[#707070] w-full p-2 flex items-center justify-center gap-2">
                                <MdKeyboardArrowLeft color={"#565656"} />
                                <span className='text-[#565656] text-sm'>Page 1</span>
                            </button>
                            <button className="rounded-3xl border border-[#707070] w-full p-2 flex items-center justify-center gap-2 md:ml-3">
                                <span className='text-[#565656] text-sm'>Page 3</span>
                                <MdKeyboardArrowRight color={"#565656"} />
                            </button>
                        </div>
                        {/* Total and Finish Paper Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-[#565656]">Total</h1>
                                <input
                                    type="text"
                                    className="border border-gray-300 w-full md:w-48 rounded-md h-10 mt-2 p-2"
                                    placeholder="Marks"
                                />
                            </div>

                            <div className="flex-1 text-center md:text-right" onClick={() => setOpen(true)}>
                                <button className="rounded-3xl bg-[#565656] text-white p-2 mt-4 md:mt-8 w-full md:w-44">
                                    Finish Paper
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </TabNavigator>
    );
};

export default MyFilesPage;
