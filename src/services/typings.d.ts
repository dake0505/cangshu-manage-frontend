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
    commodityPrice?: number;
    commodityCount?: number;
    commoditySale?: number;
    isValid?: boolean;
  };
}

declare namespace UserApi {
  type signInParams = {};
}
