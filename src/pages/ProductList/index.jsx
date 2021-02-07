import React, { Component } from 'react'
import { Button, Table, Input } from 'antd'

const { Search } = Input

const productColumns = [
    {
      title: '商品名称',
      dataIndex: 'productName',
      key: 'productName'
    },
    {
      title: '价格',
      dataIndex: 'productPrice',
      key: 'productPrice',
    },
    {
      title: ' ',
      dataIndex: 'edit',
      key: 'edit',
      render: () => <Button>编辑</Button>,
    }
]

const productData = [
    {
        key: '1',
        productName: '商品一',
        productPrice: 100
    }
]

class ProductList extends Component {

    productSearch () {
        console.log('商品搜索')
    }

    render () {
        return (
            <div>
                <Search
                    style={{width: '25%', marginBottom: 20}}
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={this.productSearch}
                />
                <Table columns={productColumns} dataSource={productData}></Table>
            </div>
        )
    }
}

export default ProductList