// 'use client';

// import React, { useState, useEffect } from 'react';
// import { DayPilot, DayPilotCalendar, DayPilotEvent } from "@daypilot/daypilot-lite-react";

// interface Event {
//   id: number;
//   text: string;
//   start: string;
//   end: string;
//   barColor?: string;
// }

// const Table: React.FC = () => {
//   const [calendar, setCalendar] = useState<DayPilotCalendar | null>(null);
//   const [events, setEvents] = useState<Event[]>([]);

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

//   return (
//     <DayPilotCalendar
//       viewType={"Week"}
//       startDate={"2024-09-07"}
//       timeRangeSelectedHandling={"Enabled"}
//       events={events}
//       onEventClick={onEventClick}
//       controlRef={setCalendar}
//     />
//   );
// }

// export default Table;


// import React, {useEffect, useState} from "react";
// import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";

// export default function Table() {

//     const [calendar, setCalendar] = useState<DayPilot.Calendar>();

//     const initialConfig: DayPilot.CalendarConfig = {
//         viewType: "Week",
//         startDate : "2024-10-01",
//         locale: "en-us"
//     };

//     const [config, setConfig] = useState(initialConfig);

//     useEffect(() => {

//         if (!calendar || calendar?.disposed()) {
//             return;
//         }
//         const events: DayPilot.EventData[] = [
//             {
//                 id: 1,
//                 text: "Event 1",
//                 start: "2024-10-02T10:30:00",
//                 end: "2024-10-02T13:00:00",
//                 tags: {
//                     participants: 2,
//                 }
//             },

//             // ...

//         ];

//         calendar.update({events});
//     }, [calendar]);


//     return (
//         <div>
//             <DayPilotCalendar
//                 {...config}
//                 controlRef={setCalendar}
//             />
//         </div>
//     )
// }



'use client';

import React, { useState, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotEvent } from "@daypilot/daypilot-lite-react";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import moment from 'moment';

interface Event {
  id: string;
  text: string;
  start: string;
  end: string;
  barColor?: string;
}

const Table: React.FC = () => {
  const [calendar, setCalendar] = useState<DayPilotCalendar | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const classesData = useAppSelector((state: { classes: any }) => state.classes.setClasses?.classes);

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


  return (
    <div>
      <DayPilotCalendar
        viewType={"Days"}
        days={7}
        startDate={new Date().toISOString().split('T')[0]}
        timeRangeSelectedHandling={"Enabled"}
        events={events}
        controlRef={setCalendar}
      />
    </div>
  );
}

export default Table;
