import React, { Component } from 'react';
import { Button, Table, Input, message } from 'antd';
import { goodList } from './service';
import DetailModal from './components/DetailModal';

const { Search } = Input;

class Commodity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      filterParams: {
        page: 1,
        size: 10,
        regex: '',
        discount: null,
      },
      commodityInfo: {},
      goodData: [],
    };
  }

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  addCommodity = () => {
    this.showModal();
  };

  productSearch() {}

  getgoodList = async () => {
    try {
      const res = await goodList({
        page: this.state.filterParams.page,
        size: 10,
      });
      this.setState({
        goodData: res.list,
      });
    } catch (error) {
      message.error('获取列表失败');
    }
  };

  componentDidMount() {
    this.getgoodList();
  }

  render() {
    const productColumns = [
      {
        title: '商品名称',
        dataIndex: 'goodName',
        key: 'goodName',
      },
      {
        title: '商品价格',
        dataIndex: 'goodPrice',
        key: 'goodPrice',
      },
      {
        title: '商品类别',
        dataIndex: 'goodType',
        key: 'goodType',
      },
      {
        title: '库存数量',
        dataIndex: 'repertoryCount',
        key: 'repertoryCount',
      },
      {
        title: '是否折扣',
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        title: '折扣率',
        dataIndex: 'discountRate',
        key: 'discountRate',
      },
      {
        title: ' ',
        dataIndex: 'edit',
        key: 'edit',
        render: () => <Button onClick={this.showModal}>编辑</Button>,
      },
    ];
    return (
      <div>
        <Button style={{ float: 'right' }} onClick={this.addCommodity}>
          新增商品
        </Button>
        <Search
          style={{ width: '25%', marginBottom: 20 }}
          placeholder="input search text"
          allowClear
          enterButton="Search"
          onSearch={this.productSearch}
        />
        <Table
          columns={productColumns}
          dataSource={this.state.goodData}
          pagination={{
            current: this.state.filterParams.page,
            total: 100,
            onChange: this.getgoodList,
          }}
        ></Table>
        <DetailModal
          commodityInfo={this.state.commodityInfo}
          visible={this.state.modalVisible}
          onOk={this.showModal}
          onClose={this.closeModal}
        ></DetailModal>
      </div>
    );
  }
}

export default Commodity;
