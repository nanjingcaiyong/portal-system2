import { Page1, Page2 } from '../views';

const routes = [
  {
    path: '/page1',
    name: 'page1',
    component: () => Page1
  },
  {
    path: '/page2',
    name: 'page2',
    component: () => Page2
  }
]

export default routes