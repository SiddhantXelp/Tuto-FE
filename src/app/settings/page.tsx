
"use client"
import React, { useState } from 'react';
import Spinner from '@/common/Spinner';
import dynamic from 'next/dynamic';

const TabNavigator = dynamic(() => import("../TabNavigator/page"), {
  loading: () => <Spinner />,
  ssr: false,
});
type ToggleProps = {
  id: string;
  label: string;
  enabled: boolean;
  onToggle: (id: string) => void;
};

const ToggleSwitch: React.FC<ToggleProps> = ({ id, label, enabled, onToggle }) => (
  <div className="flex items-center justify-between py-2">
    <span className='text-xs'>{label}</span>
    <button
      onClick={() => onToggle(id)}
      className={`relative inline-flex h-5 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${enabled ? 'bg-gray-500' : 'bg-gray-200'
        }`}
    >
      <span
        className={` inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-5 ml-1' : 'translate-x-1'
          }`}
      />
    </button>
  </div>
);

type NotificationCategory = {
  id: string;
  title: string;
  toggles: { id: string; label: string; enabled: boolean }[];
};

type CategoryProps = {
  category: NotificationCategory;
  onToggleAll: (categoryId: string) => void;
  onToggleItem: (categoryId: string, toggleId: string) => void;
};

const NotificationCategory: React.FC<CategoryProps> = ({ category, onToggleAll, onToggleItem }) => {
  const allEnabled = category.toggles.every(toggle => toggle.enabled);

  return (
    <div className="notification-category p-4 border rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">{category.title}</span>
        <div className='flex flex-row justify-evenly align-middle items-center'>
          <span className='text-xs mr-2'>Select All</span>
          <button
            onClick={() => onToggleAll(category.id)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${allEnabled ? 'bg-gray-500' : 'bg-gray-200'
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${allEnabled ? 'translate-x-5 ml-1' : 'translate-x-1'
                }`}
            />
          </button>
        </div>
      </div>
      {category.toggles.map(toggle => (
        <ToggleSwitch
          key={toggle.id}
          id={toggle.id}
          label={toggle.label}
          enabled={toggle.enabled}
          onToggle={() => onToggleItem(category.id, toggle.id)}
        />
      ))}
    </div>
  );
};

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState<NotificationCategory[]>([
    {
      id: 'class-management',
      title: 'Class Management',
      toggles: [
        { id: 'class-schedule', label: 'Class Schedule Updates', enabled: false },
        { id: 'class-enrollment', label: 'New Class Enrollment Requests', enabled: true },
        { id: 'attendance', label: 'Student Attendance Alerts', enabled: false },
        { id: 'cancellations', label: 'Class Cancellations or Rescheduling', enabled: false },
      ],
    },
    {
      id: 'assignment-homework',
      title: 'Assignment and Homework',
      toggles: [
        { id: 'homework', label: 'Homework Assignment Notifications', enabled: false },
        { id: 'submission', label: 'Assignment Submission Alerts', enabled: true },
        { id: 'grading', label: 'Grading and Feedback Notifications', enabled: false },
        { id: 'reminders', label: 'Assignment Reminders', enabled: false },
      ],
    },
    {
      id: 'payment-revenue',
      title: 'Payment and Revenue',
      toggles: [
        { id: 'payment-received', label: 'Payment Received Notifications', enabled: false },
        { id: 'pending-payment', label: 'Pending Payment Alerts', enabled: false },
        { id: 'subscription-renewal', label: 'Subscription Renewal Reminders', enabled: false },
        { id: 'payment-history', label: 'Payment History Updates', enabled: false },
      ],
    },
    {
      id: 'application-updates',
      title: 'Application Updates',
      toggles: [
        { id: 'news-announcements', label: 'Platform News and Announcements', enabled: false },
        { id: 'new-features', label: 'New Feature Introductions', enabled: false },
        { id: 'system-maintenance', label: 'System Maintenance Notifications', enabled: false },
      ],
    },
  ]);

  const handleToggleAll = (categoryId: string) => {
    setSettings(prevSettings =>
      prevSettings.map(category =>
        category.id === categoryId
          ? {
            ...category,
            toggles: category.toggles.map(toggle => ({
              ...toggle,
              enabled: !category.toggles.every(t => t.enabled),
            })),
          }
          : category
      )
    );
  };

  const handleToggleItem = (categoryId: string, toggleId: string) => {
    setSettings(prevSettings =>
      prevSettings.map(category =>
        category.id === categoryId
          ? {
            ...category,
            toggles: category.toggles.map(toggle =>
              toggle.id === toggleId ? { ...toggle, enabled: !toggle.enabled } : toggle
            ),
          }
          : category
      )
    );
  };
  console.log(settings, "settings");


  return (
    <TabNavigator>
      <div className='bg-white p-6 h-[850px] shadow-xl rounded-lg mt-5 m-5'>
        <div>
          <span className='text-lg text-gray-800'>Notification settings</span>
        </div>
        <div className='ml-10 mt-5'>
          <span className='text-buttonGray text-sm'>Choose which updates you are looking for</span>
        </div>
        <div className="notification-settings grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {settings.map(category => (
            <NotificationCategory
              key={category.id}
              category={category}
              onToggleAll={handleToggleAll}
              onToggleItem={handleToggleItem}
            />
          ))}
        </div>
      </div>
    </TabNavigator>
  );
};

export default NotificationSettings;