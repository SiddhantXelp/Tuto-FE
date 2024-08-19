import Table from '@/components/table'
import React, { useEffect } from 'react'
import { SubmitTableColumns } from '../assignments/data';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getAssignments, setAssignments } from '@/app/store/actions/assignment';
import { useRouter } from 'next/navigation';

const SubmitTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = "jaSflkASDOIQJWkjaklsdnklandhoiadjklmasnjdi"
  const assignmentData = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments?.assignments || []);
  useEffect(() => {
    if (token) {
      dispatch(getAssignments(token))
    }
  }, [dispatch, token]);

  const handleRowClick = (rowData: any) => {
    console.log(":::::::::::::>>>>>>>>>>>>>>", rowData?.id);
    router.push(`/assignments/viewAssignment/${rowData?.id}`)
  };


  return (
    <div className='h-full'>
      <Table columns={SubmitTableColumns} data={assignmentData} includeCheckbox={false} onRowClick={handleRowClick} />
    </div>
  )
}

export default SubmitTable