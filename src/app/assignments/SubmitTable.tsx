import Table from '@/components/table';
import React, { useEffect, useMemo } from 'react';
import { SubmitTableColumns } from '../assignments/data';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getAssignments } from '@/app/store/actions/assignment';
import { useRouter } from 'next/navigation';
import { formattedDate } from "@/common/DateAndTimeCommon";

const SubmitTable = () => {

  return (
    <div className='h-full'>
      <Table
        columns={SubmitTableColumns}
        data={[]}
        includeCheckbox={false}
        border={"rounded-b-2xl rounded-tr-2xl"}
      />
    </div>
  );
}

export default SubmitTable;
