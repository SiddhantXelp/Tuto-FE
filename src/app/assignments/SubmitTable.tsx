import Table from '@/components/table'
import React, { useEffect, useMemo } from 'react'
import { SubmitTableColumns } from '../assignments/data';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getAssignments, setAssignments } from '@/app/store/actions/assignment';
import { useRouter } from 'next/navigation';
import { formattedDate } from "@/common/DateAndTimeCommon";

const SubmitTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector((state: { auth: any }) => state.auth.login?.token);
  const assignmentData = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments?.assignments || []);
  useEffect(() => {
    if (token) {
      dispatch(getAssignments(token))
    }
  }, [dispatch, token]);

  const handleRowClick = (rowData: any) => {
    router.push(`/assignments/viewAssignment/${rowData?.id}`)
  };

  const assignment = useMemo(() =>
    (assignmentData || []).map((student: any) => ({
      ...student,
      date: formattedDate(student.date),
    }))
    , [assignmentData]);


  return (
    <div className='h-full'>
      <Table columns={SubmitTableColumns} data={assignment} includeCheckbox={false} onRowClick={handleRowClick} border={"rounded-b-2xl rounded-tr-2xl"}/>
    </div>
  )
}

export default SubmitTable