import request from '@/utils/request'

export async function commodityList (params) {
    return request('/api/commodity/list', {
      params,
    });
  }