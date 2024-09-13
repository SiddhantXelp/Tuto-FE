export interface ClassData {
  classSchedule: {
      scheduleDate: string;
      classStartTime: string;
      classEndTime: string;
  };
  title: string;
}

export const processClassData = (
  viewClassData: ClassData[],
  currentDate: Date
) => {
  // Sort classes by date and time
  const sortedClassData = [...viewClassData].sort((a, b) => {
      const dateA = new Date(`${a.classSchedule.scheduleDate}T${a.classSchedule.classStartTime}:00`);
      const dateB = new Date(`${b.classSchedule.scheduleDate}T${b.classSchedule.classStartTime}:00`);
      return dateA.getTime() - dateB.getTime();
  });

  let previousClass: ClassData | null = null;
  let nextClass: ClassData | null = null;
  const upcomingClasses: ClassData[] = [];
  const sevenDaysLater = new Date(currentDate);
  sevenDaysLater.setDate(currentDate.getDate() + 7);

  const upcomingClassesInNext7Days = sortedClassData.filter((cls) => {
      const classStartDateTime = new Date(`${cls.classSchedule.scheduleDate}T${cls.classSchedule.classStartTime}:00`);
      return classStartDateTime > currentDate && classStartDateTime <= sevenDaysLater;
  });

  // Loop through sorted classes to find previous and next class
  for (let cls of sortedClassData) {
      const classStartDateTime = new Date(`${cls.classSchedule.scheduleDate}T${cls.classSchedule.classStartTime}:00`);
      const classEndDateTime = new Date(`${cls.classSchedule.scheduleDate}T${cls.classSchedule.classEndTime}:00`);
      if (classEndDateTime <= currentDate) {
          previousClass = cls;
      } else if (classStartDateTime > currentDate) {
          if (!nextClass) {
              nextClass = cls;
          } else {
              upcomingClasses.push(cls);
          }
      }
  }

  const previousTime = previousClass ? `${previousClass.classSchedule.classStartTime} - ${previousClass.classSchedule.classEndTime}` : "N/A";
  const nextClassTime = nextClass ? `${nextClass.classSchedule.classStartTime} - ${nextClass.classSchedule.classEndTime}` : "N/A";
  const previousClassName = previousClass ? previousClass.title : "N/A";
  const nextClassName = nextClass ? nextClass.title : "N/A";

  return {
      previousClass,
      nextClass,
      previousTime,
      nextClassTime,
      previousClassName,
      nextClassName,
      upcomingClasses,
      upcomingClassesInNext7Days,
  };
};
