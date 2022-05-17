// @ts-ignore
/* eslint-disable */
declare namespace CommodityApi {
  type queryParams = {
    pageNumber: number;
    pageSize: number;
  };
  type ListItem = {
    key?: number;
    title?: string;
    dataIndex?: string;
  };
  type createParams = {
    commodityName: string;
    commodityDesc: string;
  };
  type CommodityItem = {
    _id?: string;
    commodityName?: string;
    commodityDisplayName?: string;
    commodityDesc?: string;
    commodityPrice?: number | 0;
    commodityCount?: number;
    commoditySale?: number;
    isValid?: boolean;
    count?: number | 0;
  };
}

declare namespace UserApi {
  type signInParams = {};
  type queryParams = {
    pageNumber: number;
    pageSize: number;
  };
  type deleteParams = {
    email: string;
  };
}

declare namespace OrderApi {
  type queryParams = {
    pageNumber: number;
    pageSize: number;
  };
  type orderItem = {
    _id?: string;
    status?: number;
    totalPrice?: number;
    goods?: CommodityApi.CommodityItem[];
  };
}
