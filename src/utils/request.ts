import errorHandler from '@/utils/errorHandle';
import { extend } from 'umi-request';
import type { RequestOptionsInit } from 'umi-request';

// 请求拦截
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  // const authHeader = { Authorization: 'Bearer xxxxxx' };// 配置统一token使用
  return {
    url: `${url}`,
    options: { ...options, interceptors: true }, // headers: authHeader 配置统一token使用
  };
};
// 响应后拦截
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const demoResponseInterceptors = (response: Response, options: RequestOptionsInit) => {
  // console.log(response);
  return response;
};
// 配置request
export const request = extend({
  credentials: 'include',
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [demoResponseInterceptors],
  middlewares: [],
});
