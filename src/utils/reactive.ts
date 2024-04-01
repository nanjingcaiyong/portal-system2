import { reactive } from 'vue'
export const createStore = (data: any) => {
  return reactive(data)
} 