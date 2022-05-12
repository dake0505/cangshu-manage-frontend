import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { message, Table } from 'antd';
import { queryUserList, deleteUser } from '@/services/user';

const UserList: React.FC = () => {
  const [userList, setUserList] = useState([]);
  const onQueryList = async () => {
    const res = await queryUserList();
    setUserList(res.data.userList);
  };

  const onDelete = async (record: API.CurrentUser) => {
    if (!record.email) return;
    const res = await deleteUser({ email: record.email });
    console.log(res);
    if (res.code === 200) {
      message.success('删除成功');
      onQueryList();
    }
  };
  const columns = [
    {
      title: '用户Email',
      dataIndex: 'email',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: ' ',
      key: 'action',
      render: (record: API.CurrentUser) => <a onClick={() => onDelete(record)}>Delete</a>,
    },
  ];
  useEffect(() => {
    onQueryList();
  }, []);
  return (
    <PageContainer>
      <Table rowKey="_id" size="small" columns={columns} dataSource={userList} />
    </PageContainer>
  );
};

export default UserList;
