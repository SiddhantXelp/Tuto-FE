'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import { GoFileDirectoryFill } from "react-icons/go";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getDeleteFiles, getDeleteFolder, getUpdateFiles, getUpdateFolder } from '@/app/store/actions/myFiles';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import CommonModel from "@/common/CommonModel";
import InputMain from '../InputMain';

interface CardProps {
    data: any;
    id: any;
    type: string;
    onClick?: (id: any) => void;
    mainData: string
}

const Card: React.FC<CardProps> = ({ data, id, type, onClick, mainData }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editFolderModel, setEditFolderModel] = useState(false);
    // const [editFileModel, setEditFileModel] = useState(false);
    const [editFolderName, setEditFolderName] = useState("");

    const router = useRouter();
    const dispatch = useAppDispatch();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleCopyLink = () => {
        alert(data.fileLink);
        setIsDropdownOpen(false);
    };

    const handleCardClick = () => {
        if (type === "file") {
            router.push(`/myFiles/Files/${id}`);
        }
    };

    const handleClick = () => {
        if (onClick) {
            onClick(id); // Call the onClick function with the id
        }
    };

    const token = useAppSelector((state: { auth: any }) => state.auth.login?.token);

    const handelDelete = () => {
        // if (type === "folder") {
        //     dispatch(getDeleteFolder(token, String(id)))
        // } else {
        //     dispatch(getDeleteFiles(token, String(id)))
        // }
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this item?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Add your delete logic here

                if (type === "folder") {
                    dispatch(getDeleteFolder(token, String(id)))
                } else {
                    dispatch(getDeleteFiles(token, String(id)))
                }

                Swal.fire(
                    'Deleted!',
                    'The item has been deleted.',
                    'success'
                );

            }
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handelUpdateFolder = () => {

        if (type === "folder") {
            const payload = {
                title: editFolderName
            }
            dispatch(getUpdateFolder(token, payload, id))
        }
        else {
            // const payload = {
            //     mainData,
            //     fileName: editFolderName
            // }
            const payload = {
                "folderId": mainData?.folderId,
                "fileName": editFolderName,
                "fileMeta": {
                    "description": "Example PDF files"
                },
                "fileType": mainData?.fileType,
                "fileUrl": mainData?.fileUrl
            }
            dispatch(getUpdateFiles(token, payload, id));
            // console.log(":::::::::::::data", mainData)

        }

    }

    return (
        <div
            className="bg-white p-1 sm:p-6 rounded-xl h-auto flex flex-col relative border border-black w-auto cursor-pointer"
            ref={dropdownRef}
        >
            <CommonModel open={editFolderModel} setOpen={setEditFolderModel}>
                <div>
                    <label className="block text-[#707070] text-[12px] md:text-[14px] mb-0">{type === "folder" ? "Folder Name" : "File Name"}</label>
                    <InputMain
                        name="groupTitle"
                        value={editFolderName}
                        onChange={(e) => setEditFolderName(e.target.value)}
                        placeholder=""
                        label=""
                        type=""
                        id=""
                    />
                    <div className='mt-8'>
                        <button type="submit" className='w-full bg-[#707070] h-10 rounded-md text-white text-sm md:text-base' onClick={handelUpdateFolder}>Edit Folder Name</button>
                    </div>

                </div>
            </CommonModel>

            <div className="flex items-center space-x-3">
                {type === 'pdf' ? (
                    <FaFilePdf size={34} />
                ) : (
                    <GoFileDirectoryFill size={40} color="#565656" />
                )}

                <div className="min-w-0 flex-1" onClick={handleClick}>
                    <h2 className="text-sm sm:text-sm md:text-sm font-medium text-gray-700 break-words">
                        {data}
                    </h2>
                </div>

                <div className="relative">
                    <BsThreeDotsVertical
                        size={24}
                        color="#565656"
                        onClick={handleToggleDropdown}
                        id="dropdownDividerButton"
                    />
                    {/* <MdDelete size={20}
                        color="red"
                        onClick={handelDelete} /> */}
                    {isDropdownOpen && (
                        <div
                            id="dropdownDivider"
                            className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-10"
                        >
                            <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDividerButton">
                                {/* <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => console.log('Share clicked')}
                                    >
                                        Share
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={handleCopyLink}
                                    >
                                        Copy link
                                    </button>
                                </li> */}
                                <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setEditFolderModel(true)}
                                    >
                                        Rename
                                    </button>
                                </li>
                                {/* <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => console.log('Download clicked')}
                                    >
                                        Download
                                    </button>
                                </li> */}
                                <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={handelDelete}
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
