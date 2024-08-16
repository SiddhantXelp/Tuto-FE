import Table from '@/components/table'
import React, { useEffect } from 'react'
import { SubmitTableData, SubmitTableColumns } from '../assignments/data';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getAssignments, setAssignments } from '@/app/store/actions/assignment';

const SubmitTable = () => {
  const dispatch = useAppDispatch();
  const token = "jaSflkASDOIQJWkjaklsdnklandhoiadjklmasnjdi"
  const assignmentData = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments?.assignments || []);
  useEffect(() => {
    if (token) {
      dispatch(getAssignments(token))
    }
  }, [dispatch, token]);


  return (
    <div className='h-full'>
      <Table columns={SubmitTableColumns} data={assignmentData} includeCheckbox={false} />
    </div>
  )
}

export default SubmitTable