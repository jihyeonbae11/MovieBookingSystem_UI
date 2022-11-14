export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: '영화예매시스템',
    icon: 'folder',
    items: [
      {
        text: '영화',
        path: '/movies'
      },
      {
        text: '예매',
        path: '/booking/list'
      },
      {
        text: '사용자',
        path: '/user/list'
      }
    ]
  }
];
