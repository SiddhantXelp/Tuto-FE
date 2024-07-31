import Table from '@/components/table'
import React from 'react'
import {SubmitTableData,SubmitTableColumns} from '../assignments/data';

const SubmitTable = () => {
  return (
    <div>
       <Table columns={SubmitTableColumns} data={SubmitTableData} includeCheckbox={false} />
    </div>
  )
}

export default SubmitTable