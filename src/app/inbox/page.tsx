"use client"

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Spinner from '@/common/Spinner';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getUsersList } from '@/app/store/actions/user';

const TabNavigator = dynamic(() => import("../TabNavigator/page"), {
  loading: () => <Spinner />,
  ssr: false,
});

const ChatList = dynamic(() => import("./components/ChatList"), {
  loading: () => <Spinner />,
  ssr: false,
});

const ChatWindow = dynamic(() => import("./components/ChatWindow"), {
  loading: () => <Spinner />,
  ssr: false,
});

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: { auth: any }) => state.auth?.login || []);
  const getUsers = useAppSelector((state: { user: any }) => state.user?.setUsers?.users || []);
  const usersLoading = useAppSelector((state: { user: any }) => state.user?.loading);


  const filterUserId = token?.user?.id
    ? getUsers?.filter((item: any) => item?.id !== token?.user?.id)
    : [];

  useEffect(() => {
    // if (token) {
    dispatch(getUsersList(token));
    // }
  }, [])

  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <TabNavigator>
      {
        usersLoading && <Spinner />
      }
      <div className="flex h-[850px] bg-white shadow-2xl rounded-xl mt-3 ml-2">
        <ChatList chats={filterUserId} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        <ChatWindow selectedChat={selectedChat} />
      </div>
    </TabNavigator>
  );
}