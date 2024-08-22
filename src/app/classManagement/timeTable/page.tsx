// 'use client';

// import React, { useState, useEffect } from 'react';
// import { DayPilot, DayPilotCalendar, DayPilotMonth, DayPilotEvent } from "@daypilot/daypilot-lite-react";

// interface Event {
//   id: number;
//   text: string;
//   start: string;
//   end: string;
//   barColor?: string;
// }

// const TimeTable: React.FC = () => {
//   const [calendar, setCalendar] = useState<DayPilotCalendar | null>(null);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [view, setView] = useState<'Day' | 'Week' | 'Month'>('Week');
//   const [startDate, setStartDate] = useState<string>('2024-09-07');

//   useEffect(() => {
//     setEvents([
//       {
//         id: 1,
//         text: "Event 1",
//         start: "2024-09-07T10:30:00",
//         end: "2024-09-07T13:00:00",
//         barColor: "#6aa84f"
//       },
//       {
//         id: 2,
//         text: "Event 2",
//         start: "2024-09-06T09:30:00",
//         end: "2024-09-06T11:30:00",
//         barColor: "#6aa84f"
//       },
//     ]);
//   }, []);

//   const onEventClick = async (args: { e: DayPilotEvent }) => {
//     if (!calendar) return; // Ensure calendar is set

//     const modal = await DayPilot.Modal.prompt("Update event text:", args.e.data.text);
//     if (!modal.result) { return; }
//     const e = args.e;
//     e.data.text = modal.result;
//     calendar.events.update(e);
//   };

//   const goToToday = () => {
//     const today = DayPilot.Date.today().toString();
//     setStartDate(today);
//     setView('Day');
//   };

//   return (
//     <div>
//         <div className='flex justify-between'>
//       <div className="toolbar flex space-x-2">
//         <button 
//           onClick={() => setView('Day')} 
//           className={`rounded-md flex items-center justify-center mb-3 py-1.5 px-8 ${view === 'Day' ? 'bg-selectedButton text-white' : 'bg-gray-300 text-gray-800'}`}
//         >
//           <p className="tesm">Today</p>
//         </button>
//         <button 
//           onClick={() => setView('Week')} 
//           className={`rounded-md flex items-center justify-center mb-3 py-1.5 px-8 ${view === 'Week' ? 'bg-selectedButton text-white' : 'bg-gray-300 text-gray-800'}`}
//         >
//           <p className="text-sm">Weekly</p>
//         </button>
//         <button 
//           onClick={() => setView('Month')} 
//           className={`rounded-md flex items-center justify-center mb-3 py-1.5 px-8 ${view === 'Month' ? 'bg-selectedButton text-white' : 'bg-gray-300 text-gray-800'}`}
//         >
//           <p className="text-sm">Monthly</p>
//         </button>
//         {/* <button 
//           onClick={goToToday} 
//           className={`rounded-full flex items-center justify-center p-2 ${view === 'Day' && startDate === DayPilot.Date.today().toString() ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'}`}
//         >
//           <p className="text-xxxs">Today</p>
//         </button> */}
//       </div>
//       <div className='rounded-md flex items-center justify-center mb-3 py-1.5 px-8 bg-selectedButton text-white'>
//       <p className="text-sm">Month</p>
//       </div>
//       </div>

//       {view === 'Day' && (
//         <DayPilotCalendar
//           viewType={"Day"}
//           startDate={startDate}
//           timeRangeSelectedHandling={"Enabled"}
//           events={events}
//           onEventClick={onEventClick}
//           controlRef={setCalendar}
//         />
//       )}
//       {view === 'Week' && (
//         <DayPilotCalendar
//           viewType={"Week"}
//           startDate={startDate}
//           timeRangeSelectedHandling={"Enabled"}
//           events={events}
//           onEventClick={onEventClick}
//           controlRef={setCalendar}
//         />
//       )}
//       {view === 'Month' && (
//         <DayPilotMonth
//           startDate={startDate}
//           events={events}
//           onEventClick={onEventClick}
//           controlRef={setCalendar}
//         />
//       )}
//     </div>
//   );
// }

// export default TimeTable;
'use client';

import React, { useState, useEffect } from 'react';
import { DayPilotCalendar, DayPilotMonth, DayPilotEvent } from "@daypilot/daypilot-lite-react";
import { useAppSelector } from '@/app/store/hooks';
import moment from 'moment';
import { useRouter } from 'next/navigation';

interface Event {
  id: number;
  text: string;
  start: string;
  end: string;
  barColor?: string;
}

const TimeTable: React.FC = () => {
  const [calendar, setCalendar] = useState<DayPilotCalendar | null>(null);
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [view, setView] = useState<'Day' | 'Week' | 'Month'>('Week');
  const [startDate, setStartDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const classesData = useAppSelector((state: { classes: any }) => state.classes.setClasses?.classes);

  useEffect(() => {
    if (classesData) {
      const formattedEvents = formatEventData(classesData);
      setEvents(formattedEvents);
    }
  }, [classesData]);

  useEffect(() => {
    filterEvents();
  }, [view, startDate, events]);

  const formatEventData = (classes: any[]): Event[] => {
    return classes.map((cls) => {
      const startDate = moment(cls.scheduleDate).format('YYYY-MM-DD');
      const startTime = cls.classStartTime;
      const endTime = cls.classEndTime;
      const start = `${startDate}T${startTime}:00`;
      const end = `${startDate}T${endTime}:00`;
      // const eventText = `${cls.title} - ${cls.subject.description}`;
      const eventText = `${cls.title}`;

      return {
        id: cls.id,
        text: eventText,
        start: start,
        end: end,
        barColor: cls.platform === 'Zoom' ? "#6aa84f" : "#ff0000"
      };
    });
  };

  const filterEvents = () => {
    const today = moment().startOf('day');
    const startOfWeek = today.clone().startOf('week');
    const endOfWeek = today.clone().endOf('week');
    const startOfMonth = today.clone().startOf('month');
    const endOfMonth = today.clone().endOf('month');

    const filtered = events.filter(event => {
      const eventStart = moment(event.start);
      const eventEnd = moment(event.end);

      switch (view) {
        case 'Day':
          return eventStart.isSame(today, 'day');
        case 'Week':
          return eventStart.isBetween(startOfWeek, endOfWeek, 'day', '[]') || eventEnd.isBetween(startOfWeek, endOfWeek, 'day', '[]');
        case 'Month':
          return eventStart.isBetween(startOfMonth, endOfMonth, 'day', '[]') || eventEnd.isBetween(startOfMonth, endOfMonth, 'day', '[]');
        default:
          return true;
      }
    });

    setFilteredEvents(filtered);
  };

  const onEventClick = async (args: { e: DayPilotEvent }) => {
    const eventId = args.e.id();
    console.log("::::::::eventId", eventId);
    router.push(`/classManagement/classDetails/${eventId}`);
  };

  const goToToday = () => {
    const today = moment().format('YYYY-MM-DD');
    setStartDate(today);
    setView('Day');
  };


  return (
    <div>
      <div className='flex justify-between'>
        <div className="toolbar flex space-x-2">
          <button
            onClick={() => {
              setView('Day');
              goToToday();
            }}
            className={`rounded-md flex items-center justify-center mb-3 py-1.5 px-8 ${view === 'Day' ? 'bg-selectedButton text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            <p className="text-sm">Today</p>
          </button>
          <button
            onClick={() => setView('Week')}
            className={`rounded-md flex items-center justify-center mb-3 py-1.5 px-8 ${view === 'Week' ? 'bg-selectedButton text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            <p className="text-sm">Weekly</p>
          </button>
          <button
            onClick={() => setView('Month')}
            className={`rounded-md flex items-center justify-center mb-3 py-1.5 px-8 ${view === 'Month' ? 'bg-selectedButton text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            <p className="text-sm">Monthly</p>
          </button>
        </div>
        <div className='rounded-md flex items-center justify-center mb-3 py-1.5 px-8 bg-selectedButton text-white'>
          <p className="text-sm">Month</p>
        </div>
      </div>

      {view === 'Day' && (
        <DayPilotCalendar
          viewType={"Day"}
          startDate={startDate}
          timeRangeSelectedHandling={"Enabled"}
          events={filteredEvents}
          onEventClick={onEventClick}
          controlRef={setCalendar}
        />
      )}
      {view === 'Week' && (
        <DayPilotCalendar
          viewType={"Week"}
          startDate={startDate}
          timeRangeSelectedHandling={"Enabled"}
          events={filteredEvents}
          onEventClick={onEventClick}
          controlRef={setCalendar}
        />
      )}
      {view === 'Month' && (
        <DayPilotMonth
          startDate={startDate}
          events={filteredEvents}
          onEventClick={onEventClick}
          controlRef={setCalendar}
        />
      )}
    </div>
  );
}

export default TimeTable;
