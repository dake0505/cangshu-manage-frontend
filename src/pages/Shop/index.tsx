import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Pagination, Modal } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { queryList } from '@/services/shop';
import './shop.less';

const { Meta } = Card;

const Shop: React.FC = () => {
  const [list, setList] = useState([]);
  const [queryParams, setQueryParams] = useState({ pageNumber: 1, pageSize: 10 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [count, setCount] = useState(Number);
  const [detailInfo, setDetailInfo] = useState({ commodityDisplayName: 'a' });
  const onClickCard = (info: any) => {
    console.log(info);
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
        <div style={{ display: 'flex' }}>
          <img
            alt="example"
            src="https://media.istockphoto.com/photos/crispy-fried-chicken-leg-on-grey-background-picture-id1345507270?k=20&m=1345507270&s=612x612&w=0&h=e-8aTD4aJ0k41xY-c7tsl6ZY6A2aZkp11VMNk40l0cM="
          />
          <div>
            <p>{detailInfo?.commodityDisplayName}</p>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default Shop;
