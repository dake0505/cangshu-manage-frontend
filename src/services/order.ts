import { request } from '@/utils/request';

export async function queryOrderList(params: OrderApi.queryParams, options?: Record<string, any>) {
  return request('/api/order/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function createOrder(data: OrderApi.orderItem, options?: Record<string, any>) {
  return request('/api/order', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function deleteOrder(params: OrderApi.orderItem) {
  return request('/api/order', {
    method: 'DELETE',
    params: { ...params },
  });
}
