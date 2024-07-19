'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { IoMdNotifications, IoMdPersonAdd } from "react-icons/io";
import { PiStepsFill } from "react-icons/pi";
import DialogComponent from '@/common/Card';

const Header: React.FC = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const [open, setOpen] = useState(false);

  const dialogOpen = () => {
    setOpen(true);
  };

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
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
              <div className='flex flex-row justify-center align-center gap-1 items-center content-center'>
                <p className='text-xs text-buttonGray' onClick={dialogOpen}>Create new Class</p>
                <p><PiStepsFill size={"16px"} color='gray' /></p>
              </div>
              <Link href='/onboarding'>
                <div className='flex flex-row justify-center content-center gap-1 alignitem-center items-center'>
                  <p className='text-xs text-buttonGray'>Onboard Student</p>
                  <p className='mt-1'>
                    <IoMdPersonAdd size={"16px"} color='gray' />
                  </p>
                </div>
              </Link>
              <div className='items-center'>
                <IoMdNotifications size={"16px"} color='gray' />
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
              <span className="font-semibold text-sm">HQ</span>
            </div>
          </div>
        </div>
      </div>
      <DialogComponent open={open} setOpen={setOpen} />
    </div>
  );
};

export default Header;
