'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import TabNavigator from "@/app/TabNavigator/page";
import { MdKeyboardArrowRight, MdDownload, MdKeyboardArrowLeft } from "react-icons/md";
import { BsPencilSquare, BsEraserFill } from "react-icons/bs";
import { LuPencilRuler } from "react-icons/lu";
import { CiText } from "react-icons/ci";
import { RiEditBoxFill } from "react-icons/ri";
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getAssignmentById, getCompleteAssignment, setCompleteAssignment } from '@/app/store/actions/assignment';
import Spinner from "@/common/Spinner";
import CommonModel from "@/common/CommonModel";
import Swal from 'sweetalert2';
import { formatDate, formattedDate } from '@/common/DateAndTimeCommon';
import { data } from "@/app/assignments/viewAssignment/[id]/data";
import { toast } from 'react-toastify';
import { generatePdf } from '@/common/AssignmentReportDownload';
import * as fabric from 'fabric';

const ViewAssignmentDetails = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const getAssignmentResponse = useAppSelector((state: { assignment: any }) => state?.assignment?.setAssignmentById?.data[0] || "");
    const getCompletedAssignmentResponse = useAppSelector((state: { assignment: any }) => state?.assignment?.setCompletedAssignment || []);
    const isLoading = useAppSelector((state: { assignment: any }) => state?.assignment?.loading);
    const token = useAppSelector((state: { auth: any }) => state?.auth?.login?.token);
    const [open, setOpen] = useState(false);
    const assignmentData = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments?.data || []);
    const { id } = useParams();
    const searchParams = useSearchParams();
    const studentId = searchParams.get('studentId');
    const [currentAssignmentId, setCurrentAssignmentId] = useState(id);
    const [currentStudentId, setCurrentStudentId] = useState(studentId);
    const [totalMarks, setTotalMarks] = useState("");
    const [remark, setRemark] = useState("");
    const [loading, setLoading] = useState(false);
    const [brushColor, setBrushColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const canvasRef = useRef<fabric.Canvas | null>(null);
    const canvasElementRef = useRef<HTMLCanvasElement | null>(null);

    const [activeTool, setActiveTool] = useState<'pen' | 'eraser' | 'text' | 'edit'>('pen');

    const assignment = useMemo(() => {
        return (assignmentData || [])
            .map((assignment: any) => ({
                id: assignment.id,
                assignmentTitle: assignment?.assignment.assignmentTitle,
                subject: assignment?.assignment?.subject,
                students: assignment?.fullName,
                material: assignment?.assignment?.material,
                status: assignment?.assignment?.status,
                assignmentId: assignment?.assignment.id,
            }));
    }, [assignmentData]);

    useEffect(() => {
        if (currentAssignmentId && currentStudentId) {
            dispatch(getAssignmentById(token, String(currentAssignmentId), String(currentStudentId)));
        }
    }, [dispatch, token, currentAssignmentId, currentStudentId]);

    useEffect(() => {
        if (getAssignmentResponse) {
            setRemark(getAssignmentResponse?.assignment?.remark === null ? "" : getAssignmentResponse?.assignment?.remark)
        }

    }, [getAssignmentResponse])

    useEffect(() => {
        if (getCompletedAssignmentResponse?.status) {
            router.push("/assignments/subjects");
            Swal.fire({
                title: 'Success!',
                text: 'Assignment completed!',
                icon: 'success',
                confirmButtonText: 'Done'
            });
            dispatch(setCompleteAssignment(null));
        }
    }, [getCompletedAssignmentResponse?.status]);

    const handleCompleteAssignment = () => {

        if (!totalMarks) {
            toast.error("Please Add Total Marks");
            return;
        }
        const status = {
            status: "completed",
            marksGained: Number(totalMarks || 0),
            remark: remark
        }

        dispatch(getCompleteAssignment(token, status, id, String(currentStudentId)));
    }

    const handleNextClick = () => {
        const result = getIndexByAssignmentAndStudent(currentAssignmentId, currentStudentId);

        if (result?.nextAssignment) {
            const { assignmentId: nextAssignmentId, id: nextStudentId } = result.nextAssignment;
            router.push(`/assignments/viewAssignment/${nextAssignmentId}?studentId=${nextStudentId}`);
            setCurrentAssignmentId(nextAssignmentId);
            setCurrentStudentId(nextStudentId);
            setOpen(false)
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'No more assignments!',
                icon: 'error',
                confirmButtonText: 'ok'
            });
        }
    };

    const getIndexByAssignmentAndStudent = (assignmentId: any, studentId: any) => {
        const assignments = assignment;
        const index = assignments.findIndex((entry: any) =>
            entry.assignmentId === assignmentId && entry.id === studentId
        );
        if (index === -1) {
            console.log('No matching assignment found.');
            return null;
        }
        const nextAssignment = assignments[index + 1];
        return {
            index,
            nextAssignment: nextAssignment || null
        };
    }

    const nextPage = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const previousPage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleDownload = async () => {
        const data = {
            studentName: getAssignmentResponse?.fullName,
            grade: "N/A",
            subject: getAssignmentResponse?.assignment?.subject,
            totalMarks: getAssignmentResponse?.assignment?.totalMarks || 0,
            marksGained: getAssignmentResponse?.assignment?.marksGained || 0,
            submittedDate: formattedDate(getAssignmentResponse?.assignment?.date),
            dueDate: formattedDate(getAssignmentResponse?.assignment?.date),
            remark: getAssignmentResponse?.assignment?.remark
        };
        await generatePdf(data, setLoading);
    }

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        switch (activeTool) {
            case 'pen':
                canvas.isDrawingMode = true;
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                canvas.freeDrawingBrush.color = brushColor;
                canvas.freeDrawingBrush.width = brushSize;
                break;
            case 'eraser':
                canvas.isDrawingMode = false; // Disable drawing mode
                canvas.selection = true; // Allow objects to be selected for erasing
                canvas.on('mouse:down', (event) => {
                    if (event.target && event.target.type !== 'i-text') {
                        canvas.remove(event.target); // Remove only non-text objects
                    }
                });
                break;
            case 'text':
                canvas.isDrawingMode = false;
                break;
            case 'edit':
                canvas.isDrawingMode = false;
                break;
            default:
                canvas.isDrawingMode = false;
        }
    }, [activeTool, brushColor, brushSize]);

    const addText = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const text = new fabric.IText('Edit me', {
            left: 50,
            top: 50,
            fill: '#000000',
            fontSize: 20,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        setActiveTool('edit');
    };

    const enableTextEditing = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const activeObject: any = canvas.getActiveObject();

        if (activeObject && activeObject.type === 'i-text') {
            activeObject.enterEditing();
            canvas.renderAll();
        } else {
            toast.info("Please select a text object to edit.");
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && canvasElementRef.current) {
            const fabricCanvas = new fabric.Canvas(canvasElementRef.current, {
                isDrawingMode: true,
                backgroundColor: 'white',
            });
            fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
            fabricCanvas.freeDrawingBrush.color = brushColor;
            fabricCanvas.freeDrawingBrush.width = brushSize;

            canvasRef.current = fabricCanvas;
            const image = new Image();
            image.src = data[currentIndex].imageUrl;
            image.onload = () => {
                const fabricImage = new fabric.Image(image, {
                    left: 0,
                    top: 0,
                    selectable: false,
                    hasControls: false,
                    evented: false,
                    scaleX: 500 / image.width,
                    scaleY: 700 / image.height,
                });

                fabricCanvas.add(fabricImage);
                // fabricImage.sendToBack(); // Ensure the image stays at the back
            };
            return () => {
                fabricCanvas.dispose();
            };
        }
    }, [currentIndex, data]);

    const downloadImage = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL({
            format: 'png',
            multiplier: 2,
        });

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas-image.png';
        link.click();
    };

    return (
        <TabNavigator>
            {
                (isLoading || loading) && <Spinner />
            }

            <CommonModel open={open} setOpen={setOpen}>

                <button
                    type="button"
                    className="w-full bg-[#6D6D6D] text-white py-2 rounded"
                    onClick={handleCompleteAssignment}
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
                                <h1 className="text-xs md:text-sm font-medium">{getAssignmentResponse?.fullName || "NA"}</h1>
                                {/* <h1 className="text-xs ">6th grade</h1> */}
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
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">{getAssignmentResponse?.assignment?.subject || "NA"}</h1>
                            </div>
                            <div className="flex items-center gap-2" onClick={handleDownload}>
                                <MdDownload className="text-[#565656] text-base" />
                                <h1 className="text-xs md:text-sm text-[#565656] cursor-pointer">Download</h1>
                            </div>
                        </div>
                        <div className='border-b border-gray-300 mb-3'></div>

                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xs md:text-sm font-medium text-[#565656]">Type</h1>
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">N/A</h1>
                            </div>
                        </div>
                        <div className='border-b border-gray-300 mb-3'></div>

                        {/* Due Date and Submitted Date Section */}
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xs md:text-sm font-medium text-[#565656]">Due date</h1>
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">{formatDate(getAssignmentResponse?.assignment?.date) || "NA"}</h1>
                            </div>
                            <div>
                                <h1 className="text-xs md:text-sm font-medium text-[#565656]">Submitted date</h1>
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">{formatDate(getAssignmentResponse?.assignment?.date) || "NA"}</h1>
                            </div>
                        </div>
                        <div className='border-b border-gray-300 mb-3'></div>

                        {/* Total Marks Section */}
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xs md:text-sm font-medium text-[#565656]">Total marks</h1>
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">{getAssignmentResponse?.assignment?.totalMarks}</h1>
                            </div>
                        </div>
                        <div className='border-b border-gray-300 mb-3'></div>

                        {/* Marks Gained Section */}
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xs md:text-sm font-medium text-[#565656]">Marks gained</h1>
                                <h1 className="text-sm md:text-base font-semibold text-[#565656]">{getAssignmentResponse?.assignment?.marksGained === null ? 0 : getAssignmentResponse?.assignment?.marksGained}</h1>
                            </div>
                        </div>
                        <div className='border-b border-gray-300 mb-3'></div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg w-full md:w-2/4  h-auto flex flex-col items-center justify-center">
                        {/* Image Display */}
                        <canvas
                            id="drawing-canvas"
                            ref={canvasElementRef}
                            width={500}
                            height={700}
                            className="border border-gray-300 rounded-lg"
                        >u
                        </canvas>
                        <div className="flex justify-between w-full mt-4">
                            {/* View Question Paper Section */}
                            <div className="flex items-center gap-2">
                                <BsPencilSquare className="text-[#565656] text-base" />
                                <h1 className="text-xs md:text-sm text-[#565656] cursor-pointer">View question paper</h1>
                            </div>

                            {/* Page Dropdown Upside */}
                            <div className="relative">
                                <div
                                    className="flex items-center gap-2 border border-[#707070] p-2 rounded-md cursor-pointer"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="text-sm text-[#565656]">
                                        Page {currentIndex + 1}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transform ${dropdownOpen ? 'rotate-0' : 'rotate-180'} text-[#707070]`}
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {dropdownOpen && (
                                    <ul className="absolute bottom-full mb-2 w-full bg-white shadow-md rounded-md border border-[#707070] z-10">
                                        {data.map((_, index) => (
                                            <li
                                                key={index}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#565656]"
                                                onClick={() => {
                                                    setCurrentIndex(index);
                                                    setDropdownOpen(false);
                                                }}
                                            >
                                                Page {index + 1}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/4 flex flex-col space-y-4 p-4">
                        <div className="flex justify-center gap-6 mt-4">
                            <button
                                onClick={() => setActiveTool('pen')}
                                className={`p-2 rounded ${activeTool === 'pen' ? 'bg-[#565656] text-white' : 'bg-gray-200'}`}
                                title="Pencil"
                            >
                                <BsPencilSquare size={25} />
                            </button>

                            <button
                                onClick={() => setActiveTool('eraser')}
                                className={`p-2 rounded ${activeTool === 'eraser' ? 'bg-[#565656] text-white' : 'bg-gray-200'}`}
                                title="Eraser"
                            >
                                <BsEraserFill size={25} />
                            </button>

                            <button
                                onClick={addText}
                                className={`p-2 rounded ${activeTool === 'text' ? 'bg-[#565656] text-white' : 'bg-gray-200'}`}
                                title="Add Text"
                            >
                                <CiText size={25} />
                            </button>

                            <button
                                onClick={enableTextEditing}
                                className={`p-2 rounded ${activeTool === 'edit' ? 'bg-[#565656] text-white' : 'bg-gray-200'}`}
                                title="Edit Text"
                            >
                                <RiEditBoxFill size={25} />
                            </button>

                        </div>

                        {activeTool === 'pen' && (
                            <div className="mb-4 p-4 border rounded-lg shadow-md bg-gray-50">
                                {/* Color Picker */}
                                <div className="flex items-center mb-3">
                                    <label
                                        htmlFor="colorPicker"
                                        className="text-gray-700 font-semibold mr-3"
                                    >
                                        Select Color:
                                    </label>
                                    <input
                                        id="colorPicker"
                                        type="color"
                                        value={brushColor}
                                        onChange={(e) => setBrushColor(e.target.value)}
                                        className="w-12 h-8 border-none p-0"
                                    />
                                </div>

                                {/* Brush Size Slider */}
                                <div className="flex items-center">
                                    <label
                                        htmlFor="brushSize"
                                        className="text-gray-700 font-semibold mr-3"
                                    >
                                        Brush Size:
                                    </label>
                                    <input
                                        id="brushSize"
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={brushSize}
                                        onChange={(e: any) => setBrushSize(e.target.value)}
                                        className="w-24"
                                    />
                                    <span className="ml-2 text-gray-600">{brushSize}px</span>
                                </div>
                            </div>
                        )}
                        {/* 
                    {activeTool === 'eraser' && (
                    <div className="mb-4 p-4 border rounded-lg shadow-md bg-gray-50">
                        <div className="flex items-center">
                        <label
                            htmlFor="brushSize"
                            className="text-gray-700 font-semibold mr-3"
                        >
                            Brush Size:
                        </label>
                        <input
                            id="brushSize"
                            type="range"
                            min="1"
                            max="50"
                            value={brushSize}
                            onChange={handleBrushSizeChange}
                            className="w-24"
                        />
                        <span className="ml-2 text-gray-600">{brushSize}px</span>
                        </div>
                    </div>
                    )} */}
                        {/* <button className='rounded-xl bg-[#707070] p-2 w-48 text-white text-base' onClick={downloadImage}>Download Image</button> */}
                        <div>
                            <h1 className="text-sm font-semibold mb-2 text-[#565656]">Remarks</h1>
                            <textarea
                                rows={10}
                                className="border border-gray-300 rounded-md w-full bg-gray-100 p-2"
                                placeholder="Enter remarks here..."
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                            />
                        </div>

                        {/* Page Input Section */}
                        {/* <div>
                            <h1 className="text-sm text-[#565656] font-semibold"> Page {currentIndex + 1}</h1>
                            <input
                                type="text"
                                className="border border-gray-300 w-full rounded-md h-10 mt-2 p-2"
                                placeholder="Marks"
                            />
                        </div> */}

                        <div className="flex flex-col md:flex-row justify-between gap-2 mt-4">
                            {/* Previous Button */}
                            <button
                                onClick={previousPage}
                                className={`rounded-3xl border border-[#707070] w-full p-2 flex items-center justify-center gap-2 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={currentIndex === 0}
                            >
                                <MdKeyboardArrowLeft color={"#565656"} />
                                <span className='text-[#565656] text-sm'>Page {currentIndex === 0 ? 1 : currentIndex}</span>
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={nextPage}
                                className={`rounded-3xl border border-[#707070] w-full p-2 flex items-center justify-center gap-2 md:ml-3 ${currentIndex === data.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={currentIndex === data.length - 1}
                            >
                                <span className='text-[#565656] text-sm'>Page {currentIndex + 2 > data.length ? data.length : currentIndex + 2}</span>
                                <MdKeyboardArrowRight color={"#565656"} />
                            </button>
                        </div>


                        {/* Total and Finish Paper Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            {/* Total Marks Section */}
                            <div className="flex-1 w-full md:w-auto">
                                <h1 className="text-sm font-semibold text-[#565656]">Total</h1>
                                <input
                                    type="text"
                                    className="border border-gray-300 w-full rounded-md h-10 mt-2 p-2"
                                    placeholder="Marks"
                                    value={totalMarks}
                                    onChange={(e) => setTotalMarks(e.target.value)}
                                />
                            </div>

                            {/* Finish Paper Button Section */}
                            <div className="flex-1 w-full md:w-auto text-center md:text-right" onClick={() => setOpen(true)}>
                                <button className="rounded-3xl bg-[#565656] text-white py-2 px-6 mt-4 md:mt-8 w-full md:w-auto">
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

export default ViewAssignmentDetails;
