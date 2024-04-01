import axios from 'axios';
const eagerImportModules = import.meta.glob('./*.ts', { eager: true }) as any;

const instance = axios.create({
  timeout: 5000
});

/**
 * @description 模块路径转模块名
 * @param modulePath 模块路径
 * @returns 
 */
const toModuleName = (modulePath: string) => /(?<=\/)[a-zA-Z]+(?=.ts)/.exec(modulePath)?.[0] || '';

/**
 * @description 组装api
 * @param modulePath 模块路径
 * @returns 
 */
const groupApi = (modulePath: string) => {
  return eagerImportModules[modulePath].default.reduce((api, config: ApiConfig) => {
    const isGetMethod = config.type.toUpperCase() === 'GET';
    const url = process.env.AUTH + config.path;
    return Object.assign({}, api, {
      [config.name]: async (obj, resetConfig: Record<string, any>) => {
        const params = Object.assign({}, obj, resetConfig);
        const res = await instance.post(url, isGetMethod ? {params} : params);
        const httpCode = res.status.toString()[0];
        if (httpCode === '2') {
          return res.data;
        }
        return {};
      }
    });
  }, {});
};

const apis = Object.keys(eagerImportModules).reduce((module, modulePath) =>{
  const moduleName = toModuleName(modulePath);
  return Object.assign({}, module, {[moduleName]: groupApi(modulePath)});
}, {});


export default apis;