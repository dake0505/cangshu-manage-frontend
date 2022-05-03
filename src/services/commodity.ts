import { request } from '@/utils/request';

/** 登录接口 POST /api/login/account */
export async function getCommodityList(
  params: CommodityApi.queryParams,
  options?: Record<string, any>,
) {
  return request('/api/warehouse/commodity-list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function postCommodity(
  data: CommodityApi.createParams,
  options?: Record<string, any>,
) {
  return request('/api/warehouse/commodity', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
