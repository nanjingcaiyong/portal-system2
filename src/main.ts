import { createApp } from 'vue';
import App from './App.vue';
import 'tailwindcss/tailwind.css';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './router';
import pkg from '../package.json';
import { createLifecyle, getMicroApp } from 'vite-plugin-legacy-qiankun'

const microApp = getMicroApp(pkg.name)

type EntityProps = {
  container: HTMLElement;
  name: string;
  mountParcel: Function;
  onGlobalStateChange: Function;
  route: string;
  setGlobalState: Function;
  singleSpa: {
    [key: string]: any
  },
  getGlobalState: (key?: string) => any
}

function render (container?: HTMLElement, props?: Record<string, any>) {
  const router = createRouter({
    history: createWebHistory(microApp.__POWERED_BY_QIANKUN__ ? pkg.name : '/'),
    routes
  })

  createApp(App, props)
    .use(router)
    .mount(container ? container.querySelector('#app2') as HTMLElement : '#app2')
}

// app2 独立运行时
if (microApp.__POWERED_BY_QIANKUN__) {
  console.log('乾坤启动')
  createLifecyle(pkg.name, {
    mount(props) {
      let { container, route } = props
      render(container);
    },
    bootstrap() {
      console.log('bootstrap', pkg.name);
    },
    unmount() {
      console.log('unmount', pkg.name)
    }
  })
} else {
  console.log('非乾坤启动')
  render()
}

