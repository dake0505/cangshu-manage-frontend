import React, { Component } from 'react'
import { Table, Button, Modal, Form, Input } from 'antd'

class Manage extends Component {
  formRef = React.createRef()
  constructor () {
    super()
    this.state = {
      name: 1,
      userList: [
        { userName: 'a', createTime: '2020-02-01' }
      ],
      modalVisible: false
    }
  }

  onClickCreate () {
    this.setState({
      modalVisible: true
    })
  }

  onClickOk () {
    this.setState({
      modalVisible: false
    })
  }

  render () {
    const column = [
      { dataIndex: 'userName', title: '账号' },
      { dataIndex: 'createTime', title: '创建时间' },
      { dataIndex: 'updateTime', title: '更新时间' }
    ]
    return (
      <div>
        <Button onClick={() => this.onClickCreate()}>新增用户</Button>
        {this.state.name}
        Manage
        <Table rowKey={(record) => record.userName} columns={column} dataSource={this.state.userList} />
        <Modal title="用户详情" visible={this.state.modalVisible} onOk={() => this.onClickOk()}>
          <Form
            ref={this.formRef}
            name="用户详情"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Manage