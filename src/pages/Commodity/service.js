import request from '@/utils/request';

export async function goodList(params) {
  return request('/api/good/list', {
    params,
  });
}
