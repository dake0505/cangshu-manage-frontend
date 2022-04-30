import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';

const CommodityPage: React.FC = () => {
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
  ];

  return (
    <PageContainer>
      <ProTable columns={columns} />
    </PageContainer>
  );
};

export default CommodityPage;
