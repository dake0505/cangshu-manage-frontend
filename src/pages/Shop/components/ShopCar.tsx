import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch, useModel } from 'umi';
import { Button, Modal, List, Select, Divider, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { createOrder } from '@/services/order';
interface ShopcarProps {
  commodityList?: [];
  children?: React.ReactNode;
}

const { Option } = Select;

const ShopCar: React.FC = (props: ShopcarProps) => {
  const dispatch = useDispatch();
  const { initialState } = useModel('@@initialState');
  const addressList = initialState?.currentUser?.address || [];
  const shopcarModel = useSelector((state: any) => state.shopcar);
  const list = shopcarModel.commodityList;
  const [listVisible, setListVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const goodsList: CommodityApi.CommodityItem[] = props.commodityList || [];
  let totalPrice: number = 0;
  goodsList?.map((item: any) => {
    totalPrice += item.commodityPrice * item.count;
  });
  const onClear = () => {
    dispatch({
      type: 'shopcar/updateCommoditylist',
      payload: [],
    });
  };
  const onPay = () => {
    setModalVisible(true);
    setListVisible(false);
  };
  const onOrder = async () => {
    const form = {
      goods: goodsList,
      status: 0,
      totalPrice: totalPrice,
    };
    const res = await createOrder(form);
    console.log(res);
    if (res.code === 200) {
      message.success('下单成功');
      setModalVisible(false);
      setListVisible(false);
      onClear();
    }
  };
  const onDelete = (item: CommodityApi.CommodityItem) => {
    const index = goodsList.findIndex((subItem) => subItem._id === item._id);
    dispatch({
      type: 'shopcar/updateCommoditylist',
      payload: goodsList.splice(index, 1),
    });
  };
  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <div className="shop-car">
      {listVisible ? (
        <div className="car-goods">
          <p className="title">
            商品列表{' '}
            <Button type="link" onClick={onClear}>
              清空
            </Button>
          </p>
          <div className="goods-list">
            <List
              itemLayout="horizontal"
              dataSource={goodsList}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a key="list-loadmore-edit" onClick={() => onDelete(item)}>
                      删除
                    </a>,
                  ]}
                >
                  <List.Item.Meta title={<a>{item.commodityDisplayName}</a>} />
                  <span>{item.commodityPrice}元 *</span>
                  <span>{item.count}</span>
                </List.Item>
              )}
            />
          </div>
          <div className="bottom-btn">
            <span>总计 {totalPrice}</span>
            <Button onClick={onPay}>结算</Button>
          </div>
        </div>
      ) : null}
      <ShoppingCartOutlined className="car-icon" onClick={() => setListVisible(!listVisible)} />

      <Modal
        title="订单详情"
        width={1000}
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <span>选择收货地址：</span>
        <Select size="large" style={{ width: 600 }}>
          {addressList.map((item) => (
            <Option key={item.address}>
              <span>{item.recipient}</span>
              <span>{item.tel}</span>
              <span>{item.address}</span>
            </Option>
          ))}
        </Select>
        <Divider>商品列表</Divider>
        <List
          itemLayout="horizontal"
          dataSource={goodsList}
          style={{ height: 400, overflow: 'auto' }}
          renderItem={(item) => (
            <List.Item
            // actions={[
            //   <a key="list-loadmore-edit" onClick={() => onDelete(item)}>
            //     删除
            //   </a>,
            // ]}
            >
              <List.Item.Meta title={<a>{item.commodityDisplayName}</a>} />
              <span>{item.commodityPrice}元 *</span>
              <span>{item.count}</span>
            </List.Item>
          )}
        />
        <div className="order-footer">
          <Button>取消</Button>
          <Button type="primary" onClick={onOrder}>
            下单
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ shopcar }: any) => {
  return {
    ...shopcar,
  };
};

export default connect(mapStateToProps)(ShopCar);
