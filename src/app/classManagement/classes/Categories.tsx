import React from 'react';
import Table from '@/components/table';
import { data } from './data';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="p-4">
      <Table data={data} />
    </div>
  );
}



