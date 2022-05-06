import type { Effect, Reducer } from 'umi';

import { login, queryUserInfo } from '@/services/user';

export interface Commodity {
  commodityName: string;
}

export interface ShopcarModelState {
  commodityList?: [Commodity?];
}

export interface ShopcarModelType {
  namespace: 'shopcar';
  state: ShopcarModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    updateCommoditylist: Reducer<ShopcarModelState>;
  };
}

const ShopcarModel: ShopcarModelType = {
  namespace: 'shopcar',

  state: {
    commodityList: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(login, _.payload);
      console.log(response, _);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryUserInfo);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    updateCommoditylist(state, action) {
      console.log(state, action);
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};

export default ShopcarModel;
