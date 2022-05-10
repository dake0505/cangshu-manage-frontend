import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import { Tabs, Button, Table, Statistic } from 'antd';
import { signIn, querySignInList } from '@/services/user';
import moment from 'moment';
import Address from './address';

const { TabPane } = Tabs;

const AccountCenter: React.FC = () => {
  const [signInList, setSignInList] = useState([]);
  const [hasSignIn, setHasSignIn] = useState(false);
  const { initialState, refresh } = useModel('@@initialState');
  const getSignInList = async () => {
    const res = await querySignInList();
    setSignInList(res.data);
  };
  const handleSignIn = async () => {
    const res = await signIn();
    if (res) {
      console.log(res);
      refresh();
      getSignInList();
    }
  };
  const signInColumns = [
    {
      title: '签到日期',
      dataIndex: 'createdAt',
      render: (text: any) => <span>{text.slice(0, 10)}</span>,
    },
    { title: '获得积分', dataIndex: 'current', render: (text: any) => <span>{text * 5}</span> },
  ];
  useEffect(() => {
    const currentMoment = moment(new Date());
    const lastMoment = moment(initialState?.currentUser?.lastSignIn);
    if (currentMoment.isSame(lastMoment, 'date')) {
      setHasSignIn(true);
    } else {
      setHasSignIn(false);
    }
  }, [initialState]);
  useEffect(() => {
    getSignInList();
  }, []);
  return (
    <PageContainer>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="我的积分" key="1">
          <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
            <Statistic title="当前积分" value={initialState?.currentUser?.score} />
            <Button disabled={hasSignIn} onClick={handleSignIn}>
              {hasSignIn ? '今日已签到' : '签到'}
            </Button>
          </div>
          <Table size="small" columns={signInColumns} dataSource={signInList} />
        </TabPane>
        <TabPane tab="个人信息" key="2">
          个人信息
        </TabPane>
        <TabPane tab="地址管理" key="3">
          <Address />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default AccountCenter;
