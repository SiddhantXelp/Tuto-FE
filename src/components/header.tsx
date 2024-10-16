"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { IoMdNotifications, IoMdPersonAdd } from "react-icons/io";
import { PiStepsFill } from "react-icons/pi";
import DialogComponent from '@/common/Card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { setLogin, setSignup } from "@/app/store/actions/auth";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import NotificationDrawer from '@/app/notifications/page';
import CommonModel from '@/common/CommonModel';
import InputMain from '@/common/InputMain';
import { getCreateGroup, setCreateGroup } from '@/app/store/actions/student';
import Swal from 'sweetalert2';
import { FaUserGroup } from "react-icons/fa6";

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
  const [groupModel, setGroupModel] = useState(false);
  const [groupTitle, setGroupTitle] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const router = useRouter();

  const token = useAppSelector(state => state?.auth?.login?.token);

  const dialogOpen = () => {
    setOpen(true);
  };

  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    // console.log('Logged out');
    // document.cookie = 'token=; path=/; max-age=0;';
    localStorage.removeItem('userInfo');
    localStorage.removeItem('user');
    dispatch(setLogin(null));
    dispatch(setSignup(null))
    router.push('/auth/login');
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user") || localStorage.getItem("userInfo");

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const imageUrl = userInfo && userInfo.picture ? userInfo.picture : "/profile.png";

  const toggleNotificationDrawer = () => {

    setIsNotificationDrawerOpen(!isNotificationDrawerOpen);

  };

  const handelCreateGroup = () => {
    const data = {
      title: groupTitle
    }

    dispatch(getCreateGroup(token, data));
  }

  const createGroupResponce = useAppSelector(state => state?.student?.getCreateGroup);

  useEffect(() => {
    if (createGroupResponce) {
      Swal.fire({
        title: 'Success!',
        text: 'Group Created Successfully.',
        icon: 'success',
        confirmButtonText: 'Done'
      });
      dispatch(setCreateGroup(null));
      setGroupModel(false);
      setGroupTitle("")
    }

  }, [createGroupResponce])
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
            <span className="font-bold text-xl flex">Logo</span>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className='flex flex-row gap-14'>
            <div className='flex flex-row gap-8 align item-center items-center'>

              <div className='flex flex-row justify-center align-center gap-1 items-center content-center cursor-pointer'>
                <p className='text-sm text-buttonGray' onClick={() => setGroupModel(true)}>Create Group</p>
                <p className='ml-1'><FaUserGroup size={"17px"} color='gray' /></p>
              </div>

              <div className='flex flex-row justify-center align-center gap-1 items-center content-center cursor-pointer'>
                <p className='text-sm text-buttonGray' onClick={dialogOpen}>Create new class</p>
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
              <div className='items-center cursor-pointer' onClick={toggleNotificationDrawer}>
                <IoMdNotifications size={"17px"} color='gray' />
              </div>
            </div>

            <button
              id="dropdownDividerButton"
              onClick={handleToggleDropdown}
              className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center cursor-pointer"
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
                ref={dropdownRef}
                id="dropdownDivider"
                className="z-10 absolute right-0 mt-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
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
      <CommonModel open={groupModel} setOpen={setGroupModel}>
        <div>
          <label className="block text-[#707070] text-[12px] md:text-[14px] mb-0">Group title</label>
          <InputMain
            name="groupTitle"
            value={groupTitle}
            onChange={(e) => setGroupTitle(e.target.value)}
            placeholder=""
            label=""
            type=""
            id=""
          />
          <div className='mt-8'>
            <button type="submit" className='w-full bg-[#707070] h-10 rounded-md text-white text-sm md:text-base' onClick={handelCreateGroup}>Create Group</button>
          </div>

        </div>
      </CommonModel>

      {
        isNotificationDrawerOpen && <NotificationDrawer isOpen={isNotificationDrawerOpen} setIsOpen={setIsNotificationDrawerOpen} />
      }
    </div>
  );
};

export default Header;

