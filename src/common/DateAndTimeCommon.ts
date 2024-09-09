import moment from "moment";

//CurrentDate
export const currentDate: Date = new Date();

//Current Date and Year
export const currentMonthYear = moment().format('MMMM YYYY');


//Convert Time to AM/PM
export const formatTime = (time: string) => {
    return time ? moment(time, 'HH:mm').format('hh:mm A') : 'NA';
};

//Convert Date to Proper Way
export const formattedDate = (date: any) => date ? moment(date).format('MMMM Do YYYY') : "NA";


//Convert to Date Like DD-MM-YYYY
export const formatDate = (dateString: string) => {
    return moment(dateString).format('DD-MM-YYYY');
}

export const formatShortWeekday = (locale: any, date: any) => {
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return weekdays[date.getDay()];
};


const combinedDateTime = (scheduleDate: any, classStartTime: any) => moment(scheduleDate).format('YYYY-MM-DD') + ' ' + classStartTime;

//Combine Time and Date
export const formattedDateTime = (combinedDateTime: any) => moment(combinedDateTime, 'YYYY-MM-DD HH:mm').format('h:mm A, MMM D');


const calculateDuration = (startTime: string, endTime: string) => {
    if (startTime && endTime) {
        const startMoment = moment(startTime, 'HH:mm');
        const endMoment = moment(endTime, 'HH:mm');


        if (endMoment.isBefore(startMoment)) {
            endMoment.add(1, 'day');
        }

        const durationMinutes = endMoment.diff(startMoment, 'minutes');
        const durationHours = Math.floor(durationMinutes / 60);
        const durationMins = durationMinutes % 60;

        const formattedDuration = `${durationHours} hr ${durationMins} min`;

        return formattedDuration;
    } else {
        return "Invalid time input";
    }
};

//Calculate Duration Between Start Time and End Time 
export const duration = (classStartTime: any, classEndTime: any) => calculateDuration(classStartTime, classEndTime);

