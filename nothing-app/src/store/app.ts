// Utilities
import { defineStore } from 'pinia'
// nothing-app/src/store/app.ts

import type { Item } from '../types/Item'
export const useAppStore = defineStore('app', {
  state: () => ({
    //
    items: Array<Item>
  }),
})
