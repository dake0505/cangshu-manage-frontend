import React, { Component } from 'react';
import { Table, Space, Button, Modal } from 'antd';

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={this.onUpdateUser.bind(this, record)}>编辑</a>
              <a>删除</a>
            </Space>
          ),
        },
      ],
      data: [
        {
          name: 'a',
          age: 1,
        },
      ],
      userFormVisible: false,
    };
  }

  onClickAddUser = () => {
    this.setState({
      userFormVisible: true,
    });
  };

  onUpdateUser = (data) => {
    console.log(data);
  };

  onSubmitUserForm = () => {
    this.setState({
      userFormVisible: false,
    });
  };

  onCancelUserForm = () => {
    this.setState({
      userFormVisible: false,
    });
  };

  render() {
    const { data, columns } = this.state;
    return (
      <div>
        <div style={{ marginBottom: '15px' }}>
          <Button onClick={this.onClickAddUser}>新增用户</Button>
        </div>
        <Table rowKey={(item) => item.name} dataSource={data} columns={columns} />
        <Modal
          title="Basic Modal"
          visible={this.state.userFormVisible}
          onOk={this.onSubmitUserForm}
          onCancel={this.onCancelUserForm}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default UserManage;
