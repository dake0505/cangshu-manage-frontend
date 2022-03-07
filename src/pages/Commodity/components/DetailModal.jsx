import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

class DetailModal extends Component {
  render() {
    const { visible, onClose, goodInfo } = this.props;
    console.log(goodInfo);
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const onFinish = (values) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
      <div>
        <Modal title="Basic Modal" visible={visible} onOk={onClose} onCancel={onClose}>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="商品名称"
              name="goodName"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input value={goodInfo.goodName} />
            </Form.Item>
            <Form.Item
              label="商品价格"
              name="goodPrice"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="商品类别"
              name="goodType"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="库存数量"
              name="repertoryCount"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="是否折扣"
              name="discount"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Select initialvalues="false" style={{ width: 120 }}>
                <Option value="true">是</Option>
                <Option value="false">否</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="折扣率"
              name="discountRate"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default DetailModal;
