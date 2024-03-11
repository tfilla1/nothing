// Utilities
import { defineStore } from 'pinia'
import {Item} from '../classes/Item'
export const useAppStore = defineStore('app', {
  state: () => ({
    //
    items: [] as Item[]
  }),
})
