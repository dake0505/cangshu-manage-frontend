import React, { useState, useEffect } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Tag, Modal, Button, Form, Input, InputNumber, Switch } from 'antd';
import { getCommodityList, postCommodity } from '@/services/commodity';

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

  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const queryList = async () => {
    const res = await getCommodityList({
      pageNumber: 1,
      pageSize: 20,
    });
    setDataSource(res.data.list);
  };

  const create = async () => {
    const data = form.getFieldsValue(true);
    const res = await postCommodity(data);
    if (res) {
      setIsModalVisible(false);
      queryList();
    }
  };

  useEffect(() => {
    queryList();
  }, []);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleOk = () => {
    create();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <PageContainer>
      <Button type="primary" onClick={showModal}>
        新增商品
      </Button>
      <Modal title="商品详情" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="商品名称" name="commodityName">
            <Input />
          </Form.Item>
          <Form.Item label="展示名称" name="commodityDisplayName">
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="commodityDesc">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="价格" name="commodityPrice">
            <InputNumber />
          </Form.Item>
          <Form.Item label="库存" name="commodityCount">
            <InputNumber />
          </Form.Item>
          <Form.Item label="是否有效" name="isValid" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
      <Table rowKey="_id" size="small" columns={columns} dataSource={dataSource} />
    </PageContainer>
  );
};

export default CommodityPage;
