import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { getCommodityList } from '@/services/commodity';

const CommodityPage: React.FC = () => {
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: '商品名称',
      dataIndex: 'commodityDisplayName',
    },
    {
      title: '商品价格',
      dataIndex: 'commodityPrice',
    },
  ];

  const [params] = useState({ pageSize: 10, current: 1 });

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        columns={columns}
        params={params}
        rowKey="_id"
        request={async () => {
          const msg = await getCommodityList({
            pageSize: params.pageSize,
            pageNumber: params.current,
          });
          return {
            data: msg.data.list,
            total: msg.data.count,
          };
        }}
      />
    </PageContainer>
  );
};

export default CommodityPage;
