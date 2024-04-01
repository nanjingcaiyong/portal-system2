type Method = 'get'| 'delete'| 'post'| 'put'| 'cancelGet' | 'cancelPost';

declare interface ApiConfig {
  name: string,
  path: string,
  type: Method,
  moduleName?: string
}

declare const $API: API;
declare const createStore: createStore;