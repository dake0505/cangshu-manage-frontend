import React, { useState } from 'react';
import { useModel } from 'umi';
import { List, Button, Modal, Form, Input, Skeleton, message } from 'antd';
import { updateUserInfo } from '@/services/user';

const Address: React.FC = () => {
  const [form] = Form.useForm();
  const { initialState, refresh } = useModel('@@initialState');
  const [modalVisible, setModalVisible] = useState(false);
  const list: API.AddressItem[] = initialState?.currentUser?.address || [];
  const onClickAdd = () => {
    setModalVisible(true);
  };
  const handleOk = async () => {
    const data = form.getFieldsValue(true);
    const userInfo = JSON.parse(JSON.stringify(initialState?.currentUser));
    userInfo.address.push(data);
    const res = await updateUserInfo(userInfo);
    console.log(res);
    if (res.code === 200) {
      message.success('添加成功');
      refresh();
      setModalVisible(false);
    }
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <div>
      <Button type="primary" style={{ marginBottom: 20 }} onClick={onClickAdd}>
        新增地址
      </Button>
      <List
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">delete</a>]}
          >
            <Skeleton avatar loading={false} title={false}>
              <List.Item.Meta
                title={<a>收件人：{item.recipient}</a>}
                description={
                  <div>
                    <div>电话：{item.tel}</div>
                    <div>地址：{item.address}</div>
                  </div>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <Modal title="地址详情" visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form name="basic" form={form}>
          <Form.Item label="收件人" name="recipient">
            <Input />
          </Form.Item>
          <Form.Item label="电话" name="tel">
            <Input />
          </Form.Item>
          <Form.Item label="地址" name="address">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Address;
