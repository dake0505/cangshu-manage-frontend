import React, { useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';

const ShopCar: React.FC = () => {
  const [listVisible, setListVisible] = useState(false);
  return (
    <div className="shop-car">
      {listVisible ? <div className="car-goods">123</div> : null}
      <ShoppingCartOutlined className="car-icon" onClick={() => setListVisible(!listVisible)} />
    </div>
  );
};

export default ShopCar;
