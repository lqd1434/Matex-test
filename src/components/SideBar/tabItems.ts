export interface TabProps {
  text: string;
  route: string;
  active?: boolean;
}

export const tabItems: TabProps[] = [
  {
    text: '数据获取',
    route: '/collect'
  },
  {
    text: '虚拟接口',
    route: '/mock'
  },

  {
    text: '压力测试',
    route: '/benchmark'
  },
  {
    text: '敬请期待',
    route: '/ok'
  }
];
