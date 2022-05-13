import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch, useModel } from 'umi';
import { Button, Modal, List, Select } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

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
        <Select size="large" style={{ width: 400 }}>
          {addressList.map((item) => (
            <Option key={item.address}>{item.address}</Option>
          ))}
        </Select>
        <List
          itemLayout="horizontal"
          dataSource={goodsList}
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
        <div>
          <Button>下单</Button>
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
