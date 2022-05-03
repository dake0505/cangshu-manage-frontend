import errorHandler from '@/utils/errorHandle';
import { extend } from 'umi-request';
import type { RequestOptionsInit } from 'umi-request';

// 请求拦截
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  return {
    url: `${url}`,
    options: {
      ...options,
      interceptors: true,
    },
  };
};
// 响应后拦截
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const demoResponseInterceptors = (response: Response, options: RequestOptionsInit) => {
  return response;
};
// 配置request
const request = extend({
  credentials: 'include',
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [demoResponseInterceptors],
  middlewares: [],
});

request.interceptors.request.use((url, options) => {
  // console.log(getDvaApp()._models);
  const auth = localStorage.getItem('token');
  const headers = {
    Authorization: 'Bearer ' + auth,
  };
  return {
    url,
    options: { ...options, headers },
  };
});

export { request };
