import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Pagination, Modal, Button, InputNumber } from 'antd';
import { TagOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { queryList } from '@/services/shop';
import './shop.less';
import ShopCar from './components/ShopCar';

const { Meta } = Card;

const Shop: React.FC = () => {
  const [list, setList] = useState([]);
  const [queryParams, setQueryParams] = useState<CommodityApi.queryParams>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [detailInfo, setDetailInfo] = useState<CommodityApi.CommodityItem>({});
  const onClickCard = (info: CommodityApi.CommodityItem) => {
    setDetailInfo(info);
    setIsModalVisible(true);
  };
  const onQueryList = async () => {
    const res = await queryList(queryParams);
    setList(res.data.list);
    setCount(res.data.count);
  };
  const onPageChange = (page: number) => {
    setQueryParams({ pageNumber: page, pageSize: 10 });
  };
  useEffect(() => {
    onQueryList();
  }, [queryParams]);
  return (
    <PageContainer>
      <ShopCar />
      <div className="card-list">
        {list.map((item: any) => (
          <Card
            key={item?._id}
            hoverable
            style={{ width: '18%' }}
            cover={
              <img
                alt="example"
                src="https://media.istockphoto.com/photos/crispy-fried-chicken-leg-on-grey-background-picture-id1345507270?k=20&m=1345507270&s=612x612&w=0&h=e-8aTD4aJ0k41xY-c7tsl6ZY6A2aZkp11VMNk40l0cM="
              />
            }
            onClick={() => onClickCard(item)}
          >
            <Meta
              title={item.commodityDisplayName}
              description={
                <span className="price">
                  <TagOutlined />
                  {item.commodityPrice + ' RMB'}
                </span>
              }
            />
          </Card>
        ))}
      </div>
      <Pagination current={queryParams.pageNumber} total={count} onChange={onPageChange} />

      <Modal
        title="商品详情"
        width={1000}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="detail-content">
          <img
            className="left-content"
            alt="example"
            src="https://media.istockphoto.com/photos/crispy-fried-chicken-leg-on-grey-background-picture-id1345507270?k=20&m=1345507270&s=612x612&w=0&h=e-8aTD4aJ0k41xY-c7tsl6ZY6A2aZkp11VMNk40l0cM="
          />
          <div className="right-content">
            <div className="detail-desc">
              <p>
                <span>商品名称</span>
                <span>{detailInfo?.commodityDisplayName}</span>
              </p>
              <p>
                <span>价格</span>
                <span>{detailInfo?.commodityPrice}</span>
              </p>
              <p>
                <span>库存</span>
                <span>{detailInfo?.commodityCount}</span>
              </p>
              <p>
                <span>描述</span>
                <span>{detailInfo?.commodityDesc}</span>
              </p>
            </div>
            <div>
              <InputNumber />
              <Button style={{ marginLeft: '10px' }}>
                <ShoppingCartOutlined /> 加入购物车
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default Shop;
