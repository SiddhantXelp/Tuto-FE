import React from 'react';
import {completedTableData,SubmitTableColumns} from '../assignments/data';
import Table from '@/components/table';


const CompletedTable = () => {
  return (
    <div>
        <Table columns={SubmitTableColumns} data={completedTableData} includeCheckbox={false} border={"rounded-b-2xl rounded-tr-2xl"}/>
    </div>
  )
}

export default CompletedTable