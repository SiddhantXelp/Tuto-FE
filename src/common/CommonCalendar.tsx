import React from "react";
import Calendar from "react-calendar"; // Assuming you're using this Calendar library
import 'react-calendar/dist/Calendar.css';

interface CommonCalendarProps {
  currentDate: Date;
  events: Date[]; // Array of event dates
  locale?: string;
  primaryColor?: string;
}

const CommonCalendar: React.FC<CommonCalendarProps> = ({
  currentDate,
  events = [],
  locale = "en-US",
  primaryColor = "#000",
}) => {
  const hasEvent = (date: Date) => {
    return events.some(
      (eventDate) =>
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  };

  const formatShortWeekday = (locale: any, date: Date) =>
    date.toLocaleDateString(locale, { weekday: "short" }).substring(0, 1);

  return (
    <Calendar
      value={currentDate}
      locale={locale}
      showNavigation={false}
      formatShortWeekday={formatShortWeekday}
      className="h-full w-full rounded-lg border-0"
      tileContent={({ date, view }) =>
        view === "month" && hasEvent(date) ? (
          <div className="flex justify-center items-center mt-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: primaryColor }}
            ></span>
          </div>
        ) : null
      }
      tileClassName={({ date, view }) =>
        view === "month" && isToday(date) ? "current-day" : ""
      }
    />
  );
};

export default CommonCalendar;
