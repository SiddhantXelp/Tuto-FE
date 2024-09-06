// import Table from '@/components/table';
// import React, { useEffect, useMemo } from 'react';
// import { SubmitTableColumns } from '../assignments/data';
// import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
// import { getAssignments } from '@/app/store/actions/assignment';
// import { useRouter } from 'next/navigation';
// import { formattedDate } from "@/common/DateAndTimeCommon";
// import Spinner from '@/common/Spinner';

// const PendingTable = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const token = useAppSelector((state: { auth: any }) => state.auth.login?.token);
//   const assignmentData = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments?.data || []);
//   const assignmentLoading = useAppSelector((state: { assignment: any }) => state.assignment.loading);

//   useEffect(() => {
//     if (token) {
//       const page = "1";
//       const assignmentLimit = "10"
//       dispatch(getAssignments(token, page, assignmentLimit));
//     }
//   }, [dispatch, token]);

//   const handleRowClick = (rowData: any) => {
//     router.push(`/assignments/viewAssignment/${rowData?.id}`);
//   };

//   const assignment = useMemo(() => {
//     return (assignmentData || [])
//       .flatMap((assignment: any) => {
//         const students = assignment.students.split(',');
//         return students.map((student: string) => ({
//           id: assignment.id,
//           assignmentTitle: assignment.assignmentTitle,
//           subject: assignment.subject,
//           students: student.trim(),
//           material: assignment.material,
//           date: formattedDate(assignment.date),
//           questions: assignment.questions,
//           createdAt: formattedDate(assignment.createdAt),
//           updatedAt: formattedDate(assignment.updatedAt),
//           status: assignment.status
//         }));
//       })
//       .filter((assignment: any) => assignment.status === 'pending');
//   }, [assignmentData]);

//   return (
//     <div className='h-full'>
//       {
//         assignmentLoading && <Spinner />
//       }
//       <Table
//         columns={SubmitTableColumns}
//         data={assignment}
//         includeCheckbox={false}
//         onRowClick={handleRowClick}
//         border={"rounded-b-2xl rounded-tr-2xl"}
//       />
//     </div>
//   );
// }

// export default PendingTable;

import Table from '@/components/table';
import React, { useEffect, useMemo, useState } from 'react';
import { SubmitTableColumns } from '../assignments/data';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getAssignments } from '@/app/store/actions/assignment';
import { useRouter } from 'next/navigation';
import { formattedDate } from "@/common/DateAndTimeCommon";
import Spinner from '@/common/Spinner';
import Pagination from '@/common/Pagination';

const PendingTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const token = useAppSelector((state: { auth: any }) => state.auth.login?.token);
  const assignmentData = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments?.data || []);
  const assignmentPages = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments || []);
  const assignmentLoading = useAppSelector((state: { assignment: any }) => state.assignment.loading);

  const totalPages = assignmentPages?.totalPages;
  const storedCurrentPage = assignmentPages?.currentPage;

  const assignmentLimit = 10; // Number of items per page (can be dynamic based on API response if needed)

  // Manage local currentPage state for controlling pagination
  const [currentPage, setCurrentPage] = useState(storedCurrentPage);

  // Fetch assignments on page load and when currentPage changes
  useEffect(() => {
    if (token) {
      dispatch(getAssignments(token, currentPage.toString(), assignmentLimit.toString()));
    }
  }, [dispatch, token, currentPage]);

  const handleRowClick = (rowData: any) => {
    router.push(`/assignments/viewAssignment/${rowData?.id}`);
  };

  // Memoize assignment data and filter by status
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
      .filter((assignment: any) => assignment.status === 'pending');
  }, [assignmentData]);

  // Pagination UI handle
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Update current page state
    }
  };


  return (
    <div className='h-full'>
      {assignmentLoading && <Spinner />}
      <Table
        columns={SubmitTableColumns}
        data={assignment}
        includeCheckbox={false}
        onRowClick={handleRowClick}
        border={"rounded-b-2xl rounded-tr-2xl"}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PendingTable;
