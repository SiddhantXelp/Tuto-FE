'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoFileDirectoryFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getDeleteFolder, getUpdateFolder, setUpdateFolder } from '@/app/store/actions/myFiles';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import CommonModel from "@/common/CommonModel";
import InputMain from '../InputMain';
import NavigationString from '../NavigationString';
interface CardProps {
    data: any;
}

const Card: React.FC<CardProps> = ({ data }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editFolderModel, setEditFolderModel] = useState(false);
    const [editFolderName, setEditFolderName] = useState("");

    const dispatch = useAppDispatch();
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleCopyLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        alert(data.fileLink);
        setIsDropdownOpen(false);
    };

    const handleCardClick = () => {
        if (!isDropdownOpen) {
            router.push(`/myFiles/SubFiles/${data.id}`);
        }
    };

    const token = useAppSelector((state: { auth: any }) => state.auth.login?.token);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        // dispatch(getDeleteFolder(token, String(data?.id)));
        Swal.fire({
            title: NavigationString.DO_YOU_WANT_PROCEED,
            // text: 'Do you really want to delete this item?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Add your delete logic here

                dispatch(getDeleteFolder(token, String(data?.id)));

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
        
        const payload = {
            title: editFolderName
        }

        dispatch(getUpdateFolder(token, payload, data?.id))

    }

    return (
        <div
            className="bg-white p-6 rounded-xl shadow-md h-[12rem] flex flex-col cursor-pointer relative"
            ref={dropdownRef}
            onClick={handleCardClick}
        >
            <CommonModel open={editFolderModel} setOpen={setEditFolderModel}>
                <div>
                    <label className="block text-[#707070] text-[12px] md:text-[14px] mb-0">Folder Name</label>
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
            <div className="flex items-center">
                <GoFileDirectoryFill size={40} color="#565656" />
                <div className="relative ml-auto">
                    <BsThreeDotsVertical
                        size={24}
                        color="#565656"
                        onClick={handleToggleDropdown}
                        id="dropdownDividerButton"
                    />
                    {/* <MdDelete size={20}
                        color="red"
                        onClick={handleDelete} /> */}

                </div>
            </div>

            <div className="mt-auto">
                <h2 className="text-lg font-normal text-[#565656]">{data.title}</h2>
            </div>

            {isDropdownOpen && (
                <div
                    id="dropdownDivider"
                    className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ul
                        className="py-2 text-sm text-gray-700"
                        aria-labelledby="dropdownDividerButton"
                    >
                        {/* <li>
                            <button
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Share clicked');
                                }}
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setEditFolderModel(true);
                                }}
                            >
                                Rename
                            </button>
                        </li>
                        {/* <li>
                            <button
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Download clicked');
                                }}
                            >
                                Download
                            </button>
                        </li> */}
                        <li>
                            <button
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Card;
