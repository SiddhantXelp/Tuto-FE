'use client';

import React, { useMemo } from 'react';
import { DayPilotCalendar, DayPilotMonth } from "@daypilot/daypilot-lite-react";
import { useAppSelector } from '@/app/store/hooks';
import moment from 'moment';
import { useRouter } from 'next/navigation';

interface Event {
  id: string;
  text: string;
  start: string;
  end: string;
  barColor?: string;
}

interface ScheduleProps {
  view: string;  // Accept the view (Day, Week, Month) as a prop
}

const Table: React.FC<ScheduleProps> = ({ view }) => {
  const router = useRouter();
  const classesData = useAppSelector((state: { classes: any }) => state?.classes?.setClasses?.data ?? []);

  // Format event data with null checks
  const formatEventData = (classes: any[]): Event[] => {
    if (!Array.isArray(classes)) {
      return [];
    }

    return classes.map((cls: any) => {
      const startDate = cls?.classSchedule?.scheduleDate ? moment(cls?.classSchedule?.scheduleDate).format('YYYY-MM-DD') : '2024-08-02';
      const startTime = cls?.classSchedule?.classStartTime || '00:00';
      const endTime = cls?.classSchedule?.classEndTime || '23:59';
      const start = `${startDate}T${startTime}:00`;
      const end = `${startDate}T${endTime}:00`;
      const eventText = cls?.title && cls?.subject?.description ? `${cls.title} - ${cls.subject.description}` : 'No Title';

      return {
        id: cls?.id ?? '',
        text: eventText,
        start: start,
        end: end,
        barColor: cls?.platform === 'Zoom' ? "#6aa84f" : "#ff0000"
      };
    });
  };

  // Memoize the event data to prevent recalculating unless classesData changes
  const events = useMemo(() => {
    if (classesData && Array.isArray(classesData)) {
      return formatEventData(classesData);
    }
    return [];
  }, [classesData]);

  const handleEventClick = (args: any) => {
    const eventId = args?.e?.id() ?? '';
    if (eventId) {
      router.push(`/classManagement/classDetails/${eventId}`);
    }
  };

  // Check for valid `view` prop
  if (!['Daily', 'Weekly', 'Monthly'].includes(view)) {
    return <div className='bg-white mt-2'>Invalid view type.</div>;
  }

  // Render calendar views conditionally based on `view` prop
  return (
    <div className='bg-white mt-2'>
      {view === 'Daily' && (
        <DayPilotCalendar
          viewType={"Day"}
          startDate={new Date().toISOString().split('T')[0]}
          timeRangeSelectedHandling={"Enabled"}
          events={events}
          onEventClick={handleEventClick}
        />
      )}
      {view === 'Weekly' && (
        <DayPilotCalendar
          viewType={"Week"}
          startDate={new Date().toISOString().split('T')[0]}
          timeRangeSelectedHandling={"Enabled"}
          events={events}
          onEventClick={handleEventClick}
        />
      )}
      {view === 'Monthly' && (
        <DayPilotMonth  // Use DayPilotMonth for month view
          startDate={new Date().toISOString().split('T')[0]}
          events={events}
          onEventClick={handleEventClick}
        />
      )}
    </div>
  );
}

export default Table;
