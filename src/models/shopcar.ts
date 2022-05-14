import type { Effect, Reducer } from 'umi';

import { login } from '@/services/user';

export interface Commodity {
  commodityName: string;
  commodityCount: number;
  commodityPrice: number;
  commodityId: string;
  count: number;
}

export interface ShopcarModelState {
  commodityList?: Commodity[];
}

export interface ShopcarModelType {
  namespace: 'shopcar';
  state: ShopcarModelState;
  effects: {
    fetch: Effect;
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
  },

  reducers: {
    updateCommoditylist(state, action) {
      // console.log(state, action);
      return {
        ...state,
        commodityList: action.payload || {},
      };
    },
  },
};

export default ShopcarModel;
