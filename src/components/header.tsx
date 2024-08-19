'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { IoMdNotifications, IoMdPersonAdd } from "react-icons/io";
import { PiStepsFill } from "react-icons/pi";
import DialogComponent from '@/common/Card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getLogin, setLogin } from "@/app/store/actions/auth";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const dialogOpen = () => {
    setOpen(true);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    console.log('Logged out');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('user');
    dispatch(setLogin(null));
    router.push('/auth/Login');

  };

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user") || localStorage.getItem("userInfo");


    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const imageUrl = userInfo && userInfo.picture ? userInfo.picture : "/profile.png";


  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-white': selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">Logo</span>
          </Link>
        </div>
        <div className="hidden md:block ">
          <div className='flex flex-row gap-14'>
            <div className='flex flex-row gap-8 alignitem-center items-center'>
              <div className='flex flex-row justify-center align-center gap-1 items-center content-center cursor-pointer	'>
                <p className='text-sm text-buttonGray' onClick={dialogOpen}>Create new Class</p>
                <p className='ml-1'><PiStepsFill size={"17px"} color='gray' /></p>
              </div>
              <Link href='/onboarding'>
                <div className='flex flex-row justify-center content-center gap-1 alignitem-center items-center'>
                  <p className='text-sm  text-buttonGray'>Onboard Student</p>
                  <p className='ml-1'>
                    <IoMdPersonAdd size={"17px"} color='gray' />
                  </p>
                </div>
              </Link>
              <div className='items-center'>
                <IoMdNotifications size={"17px"} color='gray' />
              </div>
              {/* <div className='flex flex-row justify-center content-center gap-0 alignitem-center items-center'>
                <p className='text-xs text-buttonGray'>{userInfo ? userInfo.name : ""}</p>
              </div> */}
            </div>

            <button
              id="dropdownDividerButton"
              onClick={handleToggleDropdown}
              className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center"
              type="button"
            >
              <span className="font-semibold text-sm">
                {userInfo ? (
                  <Image
                    src={imageUrl}
                    alt="Profile"
                    width={100}
                    height={100}
                  />
                ) : (
                  <p></p>
                )}
              </span>
            </button>

            {isDropdownOpen && (
              <div
                id="dropdownDivider"
                className="z-10 absolute right-0 mt-10  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDividerButton"
                >
                  <li>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <DialogComponent open={open} setOpen={setOpen} />
    </div>
  );
};

export default Header;
