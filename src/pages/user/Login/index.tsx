// import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel, connect, useDispatch } from 'umi';
import { login, register } from '@/services/user';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  // const user = useSelector((state: any) => state.user);
  const { setInitialState } = useModel('@@initialState');
  const dispatch = useDispatch();

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const msg = await login({ ...values, type });
      if (msg.code === 200) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        setInitialState({ currentUser: msg.data });
        dispatch({
          type: 'user/saveCurrentUser',
          payload: msg.data,
        });
        localStorage.setItem('token', msg.data.token);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }

      console.log(msg); // 如果失败去设置用户错误信息

      setUserLoginState(msg);
    } catch (error) {
      console.log(error);
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  const handleRegister = async (values: API.LoginParams) => {
    const form = values;
    form.email = values.username;
    const res = await register(values);
    if (res.code === 200) {
      message.success('注册成功');
      setType('account');
    }
  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            if (type === 'account') {
              await handleSubmit(values as API.LoginParams);
            } else {
              await handleRegister(values);
            }
          }}
          submitter={{
            searchConfig: {
              submitText: type === 'account' ? '登录' : '注册',
            },
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'登录'} />
            <Tabs.TabPane key="mobile" tab={'注册'} />
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  // prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  // prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  // prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="username"
                placeholder={'输入账号'}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  // prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'输入密码'}
                name="password"
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            {/* <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                // float: 'right',
              }}
            >
              忘记密码 ?
            </a> */}
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }: any) => {
  return {
    ...user,
  };
};

export default connect(mapStateToProps)(Login);
