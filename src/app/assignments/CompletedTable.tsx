import Table from '@/components/table';
import React, { useEffect, useMemo, useState } from 'react';
import { SubmitTableColumns } from '../assignments/data';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getAssignments } from '@/app/store/actions/assignment';
import { useRouter } from 'next/navigation';
import { formattedDate } from "@/common/DateAndTimeCommon";
import Spinner from '@/common/Spinner';
import Pagination from 'react-js-pagination'; // Import react-js-pagination
import { BsDownload } from 'react-icons/bs';
import { generatePdf } from '@/common/AssignmentReportDownload';

const PendingTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const token = useAppSelector((state: { auth: any }) => state.auth.login?.token);
  const assignmentData = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments?.data || []);
  const assignmentPages = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments || []);
  const assignmentLoading = useAppSelector((state: { assignment: any }) => state.assignment.loading);

  const totalPages = assignmentPages?.totalPages || 0; // Ensure default value
  const storedCurrentPage = assignmentPages?.currentPage || 1; // Ensure default value

  const assignmentLimit = 10; // Number of items per page (can be dynamic based on API response if needed)
  const [currentPage, setCurrentPage] = useState(storedCurrentPage);

  // Fetch assignments on page load and when currentPage changes
  useEffect(() => {
    // if (token) {
    dispatch(getAssignments(token, currentPage.toString(), assignmentLimit.toString(), "completed"));
    // }
  }, [dispatch, currentPage]);

  const handleRowClick = (rowData: any) => {
    router.push(`/assignments/viewAssignment/${rowData?.assignmentId}?studentId=${rowData?.id}`);
  };

  // Memoize assignment data and filter by status
  const assignment = useMemo(() => {
    return (assignmentData || [])
      .map((assignment: any) => ({
        id: assignment.id,
        assignmentTitle: assignment?.assignment.assignmentTitle,
        subject: assignment?.assignment?.subject,
        students: assignment?.fullName,
        material: assignment?.assignment?.material,
        date: formattedDate(assignment?.assignment.date),
        status: assignment?.assignment?.status
          ? assignment.assignment.status.charAt(0).toUpperCase() + assignment.assignment.status.slice(1)
          : "",
        assignmentId: assignment?.assignment.id,
        download: <BsDownload color="gray" size={13} />,
        totalMarks: assignment?.assignment?.totalMarks,
        marksGained: assignment?.assignment?.marksGained

      }));
  }, [assignmentData]);
  // Pagination UI handle
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); // Update current page state
  };


  const handelDownload = async (rowData: any) => {
    const data = {
      studentName: rowData?.students,
      grade: "N/A",
      subject: rowData?.subject,
      totalMarks: rowData?.totalMarks || 0,
      marksGained: rowData?.marksGained || 0,
      submittedDate: rowData?.date,
      dueDate: rowData?.date
    };
    await generatePdf(data, setLoading);
  }



  return (
    <div className='h-full'>
      {assignmentLoading || loading && <Spinner />}
      <Table
        columns={SubmitTableColumns}
        data={assignment}
        includeCheckbox={false}
        onRowClick={handleRowClick}
        border={"rounded-b-2xl rounded-tr-2xl"}
        onDownloadClick={handelDownload}

      />
      <div className="flex justify-center mt-4">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={assignmentLimit}
          totalItemsCount={totalPages * assignmentLimit} // Adjust this based on the actual data
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          innerClass="pagination"
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
};

export default PendingTable;

