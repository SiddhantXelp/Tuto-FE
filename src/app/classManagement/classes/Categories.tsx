
"use client"
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Table from '@/components/table';
import { columns } from './data';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getClasses } from '@/app/store/actions/classes';
import moment from 'moment';
import { useRouter } from 'next/navigation';

interface ClassesData {
  material: string;
  subject: string;
}

interface ClassesState {
  setClasses: {
    resource: {
      data: ClassesData[];
    };
  };
}

export const CategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const memberAuthToken = useAppSelector((state: { auth: any }) => state.auth.login?.token);
  const classesData = useAppSelector((state: { classes: any }) => state.classes.setClasses?.data);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getClasses(memberAuthToken));
  }, [dispatch, memberAuthToken]);


  const formatTime = (time: string) => {
    return time ? moment(time, 'HH:mm').format('hh:mm A') : 'NA';
  };

  const formattedDate = (isoDateString: any) => isoDateString ? moment(isoDateString).format('MMMM Do YYYY') : "NA";

  const handleRowClick = (rowData: any) => {
    router.push(`/assignments/viewAssignment/${rowData?.assignmentId}?studentId=${rowData?.id}`);
  };

  const handelGetId = (id: any) => {
    console.log("::::::::::id", id)

  }


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



  useEffect(() => {
    if (classesData && classesData.length > 0) {

      const updatedTableData = classesData.map((classData: any) => ({
        id: classData?.id,
        classTitle: classData?.title,
        subject: classData.subject.name,
        student: "0",
        date: formattedDate(classData?.scheduleDate),
        time: `${formatTime(classData.classStartTime)} - ${formatTime(classData.classEndTime)}`,
        duration: calculateDuration(classData?.classStartTime, classData?.classEndTime),
        assignment: classData?.materialUrl,
        material: (
          <a href={classData.materialUrl} download>
            <Icon icon="ph:link-bold" width="18" height="18" color="gray" />
          </a>
        ),
      }));
      setTableData(updatedTableData);
    }
  }, [classesData]);


  return (
    <div>
      <Table columns={columns} data={tableData} includeCheckbox={true} onRowClick={handleRowClick} border={"rounded-b-2xl rounded-tr-2xl"} onCheckboxChange={handelGetId} />
    </div>
  );
};

export default CategoriesPage;




