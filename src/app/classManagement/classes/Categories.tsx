import React, { useEffect } from 'react';
import Table from '@/components/table';
import { columns, data } from './data';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getClasses } from '@/app/store/actions/classes';

interface ClassesData {
  media: {
    file_url: string;
  };
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




  const classesData = useAppSelector((state: { classes: ClassesState }) => state.classes.setClasses);

  console.log('.................classesData', classesData)

  useEffect(() => {
    dispatch(getClasses(memberAuthToken));
  }, [dispatch, memberAuthToken]);


  return (
    <div className="p-4">
      <Table columns={columns} data={data} includeCheckbox={true} />
    </div>
  );
}



