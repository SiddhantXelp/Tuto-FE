import React from 'react'
import {PendingTableData,SubmitTableColumns} from '../assignments/data'
import Table from '@/components/table'
const PendingTable = () => {
  return (
    <div>
       <Table columns={SubmitTableColumns} data={PendingTableData} includeCheckbox={false} border={"rounded-b-2xl rounded-tr-2xl"} />
    </div>
  )
}

export default PendingTable