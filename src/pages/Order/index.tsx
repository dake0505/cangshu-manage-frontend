import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space } from 'antd';
import { queryOrderList } from '@/services/order';

const Order: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const queryList = async () => {
    const res = await queryOrderList({ pageNumber: 1, pageSize: 20 });
    if (res.code === 200) {
      setDataSource(res.data.list);
    }
  };
  const onDetail = (record: OrderApi.orderItem) => {
    console.log(record);
  };
  const onDelete = (record: OrderApi.orderItem) => {
    console.log(record);
  };
  useEffect(() => {
    queryList();
  }, []);
  const statusEnum: Record<number, string> = {
    0: '已下单',
    1: '已接单',
  };
  const columns = [
    {
      title: '订单ID',
      dataIndex: '_id',
    },
    {
      title: '下单时间',
      dataIndex: 'createdAt',
      render: (text: string) => <div>{text.slice(0, 10)}</div>,
    },
    {
      title: '收货信息',
      dataIndex: 'info',
    },
    {
      title: '订单金额（RMB）',
      dataIndex: 'totalPrice',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      render: (text: number) => <div>{statusEnum[text]}</div>,
    },
    {
      title: ' ',
      dataIndex: 'action',
      render: (record: any) => (
        <div>
          <Space size="middle">
            <a onClick={() => onDetail(record)}>查看</a>
            <a onClick={() => onDelete(record)}>删除</a>
          </Space>
        </div>
      ),
    },
  ];
  return (
    <PageContainer>
      <Table rowKey="_id" size="small" columns={columns} dataSource={dataSource} />
    </PageContainer>
  );
};

export default Order;
