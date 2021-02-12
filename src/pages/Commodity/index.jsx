import React, { Component } from 'react'
import { Button, Table, Input, message } from 'antd'
import { commodityList } from './service'
import DetailModal from './components/DetailModal'

const { Search } = Input

const productData = [
    {
        key: '1',
        productName: '商品一',
        productPrice: 100
    }
]

class Commodity extends Component {

    constructor (props) {
        super(props)
        this.state = {
            modalVisible: false
        }
    }

    showModal = () => {
        this.setState(
            { modalVisible: true }
        )
    }

    closeModal = () => {
        this.setState(
            { modalVisible: false }
        )
    }

    productSearch () {
    }

    getCommodityList = async () => {
        try {
            await commodityList ()
        } catch (error) {
            message.error('获取列表失败')
        }
    }

    componentDidMount () {
        this.getCommodityList()
    }

    render () {
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
            render: () => <Button onClick={this.showModal}>编辑</Button>,
            }
        ]
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
                <DetailModal visible={this.state.modalVisible} onOk={this.showModal} onClose={this.closeModal}></DetailModal>
            </div>
        )
    }
}

export default Commodity