import React, { Component } from 'react';
import { Table, Input, DatePicker, Select, Button } from 'antd';

const { Option } = Select;

class Insert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      type: '',
      name: '',
      detail: '',
      user: '',
    };
  }

  dateChange = (value) => {
    this.setState({
      date: value,
    });
  };

  typeChange = (value) => {
    this.setState({
      type: value,
    });
  };

  nameChange = (value) => {
    this.setState({
      name: value,
    });
  };

  detailChange = (e) => {
    this.setState({
      detail: e.target.value,
    });
  };

  userChange = (value) => {
    this.setState({
      user: value,
    });
  };

  submit = () => {
    console.log(this.state);
  };

  render() {
    const columns = [
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        render: () => <DatePicker onChange={this.dateChange} />,
      },
      {
        title: '类别',
        dataIndex: 'type',
        key: 'type',
        render: () => (
          <Select
            value={this.state.type}
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={this.typeChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        ),
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: () => (
          <Select
            value={this.state.name}
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={this.nameChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        ),
      },
      {
        title: '明细',
        dataIndex: 'detail',
        key: 'detail',
        render: () => <Input value={this.state.detail} onChange={this.detailChange} />,
      },
      {
        title: '用户',
        dataIndex: 'user',
        key: 'user',
        render: () => (
          <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.userChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        ),
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: () => (
          <div>
            <Button onClick={this.submit}>提交</Button>
            <Button>重置</Button>
          </div>
        ),
      },
    ];
    const data = [
      {
        key: 1,
        date: '',
        type: '',
        name: '',
        detail: '',
        user: '',
      },
    ];
    return (
      <div>
        <Table pagination={false} bordered columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default Insert;
