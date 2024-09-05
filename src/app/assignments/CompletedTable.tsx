import Table from '@/components/table';
import React, { useEffect, useMemo } from 'react';
import { SubmitTableColumns } from '../assignments/data';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getAssignments } from '@/app/store/actions/assignment';
import { useRouter } from 'next/navigation';
import { formattedDate } from "@/common/DateAndTimeCommon";
import Spinner from '@/common/Spinner';

const CompletedTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector((state: { auth: any }) => state.auth.login?.token);
  const assignmentData = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments?.data || []);
  const assignmentLoading = useAppSelector((state: { assignment: any }) => state.assignment.loading);

  useEffect(() => {
    if (token) {
      const page = "1";
      const assignmentLimit = "10"
      dispatch(getAssignments(token, page, assignmentLimit));
    }
  }, [dispatch, token]);

  const handleRowClick = (rowData: any) => {
    router.push(`/assignments/viewAssignment/${rowData?.id}`);
  };

  const assignment = useMemo(() => {
    return (assignmentData || [])
      .flatMap((assignment: any) => {
        const students = assignment.students.split(',');
        return students.map((student: string) => ({
          id: assignment.id,
          assignmentTitle: assignment.assignmentTitle,
          subject: assignment.subject,
          students: student.trim(),
          material: assignment.material,
          date: formattedDate(assignment.date),
          questions: assignment.questions,
          createdAt: formattedDate(assignment.createdAt),
          updatedAt: formattedDate(assignment.updatedAt),
          status: assignment.status
        }));
      })
      .filter((assignment: any) => assignment.status === 'completed');
  }, [assignmentData]);

  return (
    <div className='h-full'>
      {
        assignmentLoading && <Spinner />
      }
      <Table
        columns={SubmitTableColumns}
        data={assignment}
        includeCheckbox={false}
        onRowClick={handleRowClick}
        border={"rounded-b-2xl rounded-tr-2xl"}
      />
    </div>
  );
}

export default CompletedTable;
