'use client';

import React, { useState, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotMonth } from "@daypilot/daypilot-lite-react"; // Import DayPilotMonth for month view
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
  const [calendar, setCalendar] = useState<DayPilotCalendar | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const classesData = useAppSelector((state: { classes: any }) => state.classes.setClasses?.data);

  // Format event data
  const formatEventData = (classes: any[]): Event[] => {
    return classes.map((cls) => {
      const startDate = moment(cls.scheduleDate).format('YYYY-MM-DD');
      const startTime = cls.classStartTime;
      const endTime = cls.classEndTime;
      const start = `${startDate}T${startTime}:00`;
      const end = `${startDate}T${endTime}:00`;
      const eventText = `${cls.title} - ${cls.subject.description}`;

      return {
        id: cls.id,
        text: eventText,
        start: start,
        end: end,
        barColor: cls.platform === 'Zoom' ? "#6aa84f" : "#ff0000"
      };
    });
  };

  useEffect(() => {
    if (classesData) {
      setEvents(formatEventData(classesData));
    }
  }, [classesData]);

  const handleEventClick = (args: any) => {
    const eventId = args.e.id();
    router.push(`/classManagement/classDetails/${eventId}`);
  };

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
          controlRef={setCalendar}
        />
      )}
      {view === 'Weekly' && (
        <DayPilotCalendar
          viewType={"Week"}  
          startDate={new Date().toISOString().split('T')[0]}
          timeRangeSelectedHandling={"Enabled"}
          events={events}
          onEventClick={handleEventClick}
          controlRef={setCalendar}
        />
      )}
      {view === 'Monthly' && (
        <DayPilotMonth  // Use DayPilotMonth for month view
          startDate={new Date().toISOString().split('T')[0]}
          events={events}
          onEventClick={handleEventClick}
          controlRef={setCalendar}
        />
      )}
      
    </div>
  );
}

export default Table;
