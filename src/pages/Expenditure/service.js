import request from '@/utils/request';

export async function insertExpenditure(params) {
  return request('/api/expenditure/insertExpenditure', {
    method: 'POST',
    data: params,
  });
}
