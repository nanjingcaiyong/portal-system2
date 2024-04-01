import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver,
} from 'unplugin-vue-components/resolvers';
import legacy from '@vitejs/plugin-legacy' // need this
import inject from '@rollup/plugin-inject';
import path from 'path';
import { Plugin, UserConfig } from 'vite';
const resolve = (filePath: string) => path.resolve(__dirname, filePath);
const API_ENTRY_PATH = resolve('../src/apis/index.ts')
const STORE_ENTRY_PATH = resolve('../src/utils/reactive.ts');
const ROUTER_ENTRY_PATH = resolve('../src/router')
import { legacyQiankun } from 'vite-plugin-legacy-qiankun'

const plugins: Plugin[] = [
  vue(),
  vueJsx({}),
  ...legacy({
    targets: ['defaults']
  }),
  ...legacyQiankun({
    name: 'app2',
    devSandbox: true  
  }),
  inject({
    $API: API_ENTRY_PATH,
    createStore: STORE_ENTRY_PATH,
    router: ROUTER_ENTRY_PATH
  }),
  Components({
    resolvers: [
      AntDesignVueResolver({
        importStyle: 'less',
      }),
    ],
  }),
]
const config: UserConfig = {
  plugins,
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".json"],
    alias: {
      '@src': path.resolve(__dirname, '..' ,'src')
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import $API from '@/apis'`
  },
}

export default config