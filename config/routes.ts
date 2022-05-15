export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '首页', icon: 'shop', component: './Shop' },
  { path: '/commodity', name: '仓库', icon: 'home', component: './Commodity' },
  { path: '/order', name: '订单', icon: 'unordered-list', component: './Order' },
  { path: '/analyse', name: '分析', icon: 'line-chart', component: './Analyse' },
  { path: '/userList', name: '用户', icon: 'team', component: './user/List' },
  {
    path: '/account',
    routes: [{ name: '个人中心', path: '/account/center', component: './user/Center' }],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
