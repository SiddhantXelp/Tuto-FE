
"use client"
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Table from '@/components/table';
import { columns } from './data';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getClasses } from '@/app/store/actions/classes';

interface ClassesData {
  material:string;
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
  const classesData = useAppSelector((state: { classes: ClassesState }) => state.classes.setClasses?.classes);
  const GETClassData = useAppSelector((state: { classes: ClassesState }) => state.classes);
  // console.log(GETClassData,"GETClassData");
  


  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getClasses(memberAuthToken));
  }, [dispatch, memberAuthToken]);

  useEffect(() => {
    if (classesData && classesData.length > 0) {
      const updatedTableData = classesData.map((classData:any) => ({
        classTitle: "Math 101",
        subject: classData.subject.name,
        student: "John Doe",
        date: "2024-09-07",
        time: "10:30 AM",
        duration: "2 hours",
        assignment: "Homework 1",
        material: (
          <a href={classData.materialUrl} download>
            <Icon icon="ph:link-bold" width="18" height="18" color="gray" />
          </a>
        ),
      }));
      setTableData(updatedTableData);
    }
  }, [classesData]);

  // console.log(tableData, "tableData");

  // console.log(classesData,"classesDataclassesDataclassesData")

  return (
    <div className="p-4">
      <Table columns={columns} data={tableData} includeCheckbox={true} />
    </div>
  );
};

export default CategoriesPage;




