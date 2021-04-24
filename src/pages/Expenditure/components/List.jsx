import React, { Component } from 'react';
import { Table, Button } from 'antd';
import Modal from './Modal';
import { insertExpenditure } from '../service';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      detail: {
        date: '',
        type: '',
        name: '',
        detail: '',
        user: '',
      },
    };
  }

  addExpenditure = async () => {
    try {
      await insertExpenditure();
    } catch (error) {
      throw new Error(error);
    }
  };

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  componentDidMount() {
    this.addExpenditure();
  }

  render() {
    const columns = [
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '类别',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '明细',
        dataIndex: 'detail',
        key: 'detail',
      },
      {
        title: '用户',
        dataIndex: 'user',
        key: 'user',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: () => (
          <div>
            <Button onClick={this.showModal}>修改</Button>
            <Button>删除</Button>
          </div>
        ),
      },
    ];
    const data = [
      {
        key: 1,
        date: '2020-03-10',
        type: '类型一',
        name: '名称一',
        detail: '详情一',
        user: 'sjy',
      },
    ];
    return (
      <div>
        <Table style={{ marginTop: 100 }} columns={columns} dataSource={data} />
        <Modal
          detail={this.state.detail}
          visible={this.state.modalVisible}
          onOk={this.showModal}
          onClose={this.closeModal}
        />
      </div>
    );
  }
}

export default List;
