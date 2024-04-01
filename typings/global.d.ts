// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { AxiosRequestConfig } from 'axios';
import { UnwrapNestedRefs } from 'vue';
import { Router } from 'vue-router';

declare global {
  interface Window { 
    [key: string]: any
  }


  type $t = {
    [key: string]: string
  }

  const router: Router

  type createStore = <T>(target: T) => UnwrapNestedRefs<T>

  var __webpack_public_path__: string
}
declare module 'axios' {
  export interface AxiosInstance {
    [key: string]: any;
  }
}

export {};