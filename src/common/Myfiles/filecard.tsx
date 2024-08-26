'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoFileDirectoryFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppDispatch } from '@/app/store/hooks';
import { getDeleteFolder } from '@/app/store/actions/assignment';

interface CardProps {
    data: any;
}

const Card: React.FC<CardProps> = ({ data }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
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
        router.push(`/myFiles/SubFiles/${data.id}`);
    };

    const token = "jkadfjaskdaskdkasdhjaksljdsajd";
    const handelDelete = () => {
        dispatch(getDeleteFolder(token, String(data?.id)));
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

    return (
        <div
            className="bg-white p-6 rounded-xl shadow-md h-[12rem] flex flex-col cursor-pointer relative"
            ref={dropdownRef}
            onClick={handleCardClick}
        >
            <div className="flex items-center">
                <GoFileDirectoryFill size={40} color="#565656" />
                <div className="relative ml-auto">
                    <BsThreeDotsVertical
                        size={24}
                        color="#565656"
                        onClick={handleToggleDropdown}
                        id="dropdownDividerButton"
                    />
                    {isDropdownOpen && (
                        <div
                            id="dropdownDivider"
                            className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-10"
                        >
                            <ul
                                className="py-2 text-sm text-gray-700"
                                aria-labelledby="dropdownDividerButton"
                            >
                                <li>
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
                                </li>
                                <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => console.log('Rename clicked')}
                                    >
                                        Rename
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => console.log('Download clicked')}
                                    >
                                        Download
                                    </button>
                                </li>
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

            <div className="mt-auto" >
                <h2 className="text-lg font-normal text-[#565656]">{data.title}</h2>
            </div>
        </div>
    );
};

export default Card;
