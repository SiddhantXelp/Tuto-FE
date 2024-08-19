"use client"

import { useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import TabNavigator from '../../app/TabNavigator/page';


export default function IndexPage() {
  const chats = [
    {
      id: 1,
      name: 'Jhon Lebowski',
      message: 'I am excited to see you in class!',
      time: '08:00 PM',
      image: 'https://img.freepik.com/free-photo/3d-cartoon-portrait-person-practicing-law-related-profession_23-2151419547.jpg?size=626&ext=jpg',
      messages: [
        { id: 1, text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', time: '08:00 PM', sender: 'other' },
        { id: 2, text: 'Lorem Ipsum is simply dummy text.', time: '08:00 PM', sender: 'me' },

      ]
    },
    {
      id: 2,
      name: 'Jane Doe',
      message: 'Can we reschedule our meeting?',
      time: '07:45 PM',
      image: 'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3447.jpg?size=626&ext=jpg',
      messages: [
        { id: 1, text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', time: '07:46 PM', sender: 'other' },
        { id: 2, text: 'Sure, what time works for you hijhkkbhkukhyycmh hgjhgg  gjhjbumyjb gjhgbhvg hjbgjhm g gbyjb  fbtkvytyyutyttyjgyjtuytrtbmjbtyutbgjhvg?', time: '07:46 PM', sender: 'me' },
        { id: 3, text: 'No, what time works for you ', time: '07:46 PM', sender: 'me' },

   
      ]
    }
  ];

  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <TabNavigator>
      <div className="flex h-[850px] bg-white shadow-2xl rounded-xl">
        <ChatList chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        <ChatWindow selectedChat={selectedChat} />
      </div>
    </TabNavigator>
  );
}