import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useSelector } from 'umi';
import { Tabs, Button, Table, Statistic } from 'antd';
import { querySignInList, signIn } from '@/services/user';

const { TabPane } = Tabs;

const AccountCenter: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const [signInList, setSignInList] = useState([]);
  const [hasSignIn, setHasSignIn] = useState('false');
  const getSignInList = async () => {
    const res = await querySignInList();
    setSignInList(res.data);
  };
  const handleSignIn = async () => {
    const res = await signIn();
    if (res) {
      console.log(res);
      localStorage.setItem('sign-in', 'true');
      setHasSignIn('true');
    }
  };
  useEffect(() => {
    getSignInList();
    setHasSignIn(localStorage.getItem('sign-in') || 'false');
  }, []);
  const signInColumns = [
    { title: '签到日期', dataIndex: 'createdAt' },
    { title: '获得积分', dataIndex: 'current', render: (text: any) => <span>{text * 5}</span> },
  ];
  console.log(user);
  return (
    <PageContainer>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="我的积分" key="1">
          <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
            <Statistic title="当前积分" value={user.currentUser.score} />
            <Button disabled={hasSignIn === 'true'} onClick={handleSignIn}>
              {hasSignIn === 'true' ? '今日已签到' : '签到'}
            </Button>
          </div>
          <Table size="small" columns={signInColumns} dataSource={signInList} />
        </TabPane>
        <TabPane tab="个人信息" key="2">
          个人信息
        </TabPane>
        <TabPane tab="地址管理" key="3">
          地址列表
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default AccountCenter;
