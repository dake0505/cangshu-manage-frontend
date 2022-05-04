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
}

declare namespace UserApi {
  type signInParams = {};
}
