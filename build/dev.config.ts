import baseConfig from './base.config';
import { merge } from 'webpack-merge'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite';

const rootPath = process.cwd();

export default ({command, mode}: ConfigEnv): UserConfig => {
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, rootPath + '/config', '');
  return merge(baseConfig, {
    server: {
      port: 5175,
    },
    define: {
      'process.env': env,
    }
  })
}