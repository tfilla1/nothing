
export const STORAGE_KEYS = {
  chatUser: 'chat-user',
  toolbarPosition: 'toolbar-position'
};
export type StorageKeys = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];


export default function useLocalStorage() {
  const getItem = (key: StorageKeys) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.warn(`Failed to parse localStorage item for key "${key}":`, error)
      return null
    }
  }
  const removeItem = (key: StorageKeys) => {
    localStorage.removeItem(key)
  }
  const setItem = (key: StorageKeys, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return {
    getItem,
    removeItem,
    setItem
  }
}
