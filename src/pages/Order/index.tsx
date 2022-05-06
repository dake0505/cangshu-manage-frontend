import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Order: React.FC = () => {
  return (
    <PageContainer>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="采购订单" key="1">
          买入
        </TabPane>
        <TabPane tab="销售订单" key="2">
          卖出
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default Order;
