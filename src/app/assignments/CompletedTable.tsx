import React from 'react';
import {completedTableData,SubmitTableColumns} from '../assignments/data';
import Table from '@/components/table';


const CompletedTable = () => {
  return (
    <div>
        <Table columns={SubmitTableColumns} data={completedTableData} includeCheckbox={false} />
    </div>
  )
}

export default CompletedTable