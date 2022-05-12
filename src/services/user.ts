import { request } from '@/utils/request';

/**
 * 登录
 * @param body
 * @param options
 * @returns
 */
export async function login(body: API.LoginParams, options?: Record<string, any>) {
  return request('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function register(body: API.LoginParams, options?: Record<string, any>) {
  return request('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/**
 * 查询用户信息
 * @returns
 */
export async function queryUserInfo() {
  return request('/api/user/info', {
    method: 'get',
  });
}
export async function updateUserInfo(data: API.CurrentUser) {
  return request('/api/user', {
    method: 'PUT',
    data,
  });
}
/**
 * 用户签到
 * @param params 不需参数
 * @returns
 */
export async function signIn(params?: UserApi.signInParams) {
  return request('/api/user/sign-in', {
    method: 'GET',
    params,
  });
}
/**
 * 获取签到列表
 * @param params
 * @returns
 */
export async function querySignInList(params?: UserApi.signInParams) {
  return request('/api/user/sign-in-list', {
    method: 'GET',
    params,
  });
}
/**
 * 查询用户列表
 * @param params
 * @returns
 */
export async function queryUserList(params?: UserApi.queryParams) {
  return request('/api/user-list', {
    method: 'GET',
    params,
  });
}

export async function deleteUser(params?: UserApi.deleteParams) {
  return request('/api/user', {
    method: 'DELETE',
    params,
  });
}
