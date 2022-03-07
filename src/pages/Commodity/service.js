import request from '@/utils/request';

export async function goodList(params) {
  return request('/api/good/list', {
    params,
  });
}
export async function updateGoodInfo(data) {
  return request('/api/good/updateGoodInfo', {
    method: 'post',
    data,
  });
}
