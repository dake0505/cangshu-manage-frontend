import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'umi';
import { Button } from 'antd';
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';

interface ShopcarProps {
  commodityList?: [];
  children?: React.ReactNode;
}

const ShopCar: React.FC = (props: ShopcarProps) => {
  console.log(props);
  const shopcarModel = useSelector((state: any) => state.shopcar);
  const list = shopcarModel.commodityList;
  const [listVisible, setListVisible] = useState(false);
  const goodsList = props.commodityList;
  let totalPrice: number = 0;
  goodsList?.map((item: any) => {
    totalPrice += item.commodityPrice * item.count;
  });
  const onPay = () => {};
  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <div className="shop-car">
      {listVisible ? (
        <div className="car-goods">
          <p className="title">
            商品列表 <Button type="link">清空</Button>
          </p>
          <div className="goods-list">
            {goodsList
              ? goodsList.map((item: any) => (
                  <div className="goods-item" key={item.commodityDisplayName}>
                    <span>{item.commodityDisplayName}</span>
                    <span>{item.commodityPrice}</span>
                    <span>
                      <CloseOutlined />
                    </span>
                    <span>{item.count}</span>
                  </div>
                ))
              : null}
          </div>
          <div className="bottom-btn">
            <span>总计 {totalPrice}</span>
            <Button onClick={onPay}>结算</Button>
          </div>
        </div>
      ) : null}
      <ShoppingCartOutlined className="car-icon" onClick={() => setListVisible(!listVisible)} />
    </div>
  );
};

const mapStateToProps = ({ shopcar }: any) => {
  return {
    ...shopcar,
  };
};

export default connect(mapStateToProps)(ShopCar);
