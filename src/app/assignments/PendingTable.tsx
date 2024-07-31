import React from 'react'
import {PendingTableData,SubmitTableColumns} from '../assignments/data'
import Table from '@/components/table'
const PendingTable = () => {
  return (
    <div>
       <Table columns={SubmitTableColumns} data={PendingTableData} includeCheckbox={false} />
    </div>
  )
}

export default PendingTable