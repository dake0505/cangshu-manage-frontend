import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Tag, Modal, Button } from 'antd';
import { getCommodityList } from '@/services/commodity';

const CommodityPage: React.FC = () => {
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'commodityDisplayName',
    },
    {
      title: '商品价格',
      dataIndex: 'commodityPrice',
    },
    {
      title: '库存',
      dataIndex: 'commodityCount',
    },
    {
      title: '交易数量',
      dataIndex: 'commoditySale',
    },
    {
      title: '是否有效',
      dataIndex: 'isValid',
      render: (text: any) => (
        <div>
          <Tag color={text ? 'green' : 'volcano'}>{text ? '是' : '否'}</Tag>
        </div>
      ),
    },
  ];
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getCommodityList({
      pageNumber: 1,
      pageSize: 10,
    }).then((res) => {
      setDataSource(res.data.list);
    });
  }, []);

  return (
    <PageContainer>
      <Button type="primary" onClick={showModal}>
        新增商品
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Table rowKey="_id" columns={columns} dataSource={dataSource} />
    </PageContainer>
  );
};

export default CommodityPage;
