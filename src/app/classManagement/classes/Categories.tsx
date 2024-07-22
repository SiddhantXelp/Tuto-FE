import React from 'react';
import Table from '@/components/table';
import { columns, data } from './data';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="p-4">
      <Table columns={columns} data={data} includeCheckbox={true} />
    </div>
  );
}



