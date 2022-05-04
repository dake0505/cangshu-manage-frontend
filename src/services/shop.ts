import { request } from '@/utils/request';

export async function queryList(params: CommodityApi.queryParams, options?: Record<string, any>) {
  return request('/api/shop/commodity-list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
