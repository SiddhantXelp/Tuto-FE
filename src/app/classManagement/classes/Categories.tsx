
"use client"
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Table from '@/components/table';
import { columns } from './data';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getClasses } from '@/app/store/actions/classes';
import moment from 'moment';

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
  const memberAuthToken = 'sid';
  const classesData = useAppSelector((state: { classes: any }) => state.classes.setClasses?.classes);
  const GETClassData = useAppSelector((state: { classes: any }) => state.classes);


  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getClasses(memberAuthToken));
  }, [dispatch, memberAuthToken]);


  const formatTime = (time: string) => {
    return time ? moment(time, 'HH:mm').format('hh:mm A') : 'NA';
  };

  const formattedDate = (isoDateString: any) => isoDateString ? moment(isoDateString).format('MMMM Do YYYY') : "NA";



  useEffect(() => {
    if (classesData && classesData.length > 0) {

      const updatedTableData = classesData.map((classData: any) => ({
        classTitle: classData?.title,
        subject: classData.subject.name,
        student: "Raj",
        date: formattedDate(classData?.scheduleDate),
        time: formatTime(classData.classStartTime),
        duration: "1hr",
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
    <div className="p-4">
      <Table columns={columns} data={tableData} includeCheckbox={true} />
    </div>
  );
};

export default CategoriesPage;




