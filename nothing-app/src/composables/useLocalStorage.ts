
export const STORAGE_KEYS = {
  chatUser: 'chat-user',
  currentLevels: 'current-levels',
  toolbarPosition: 'toolbar-position',
  favorites: 'favorites'
};
export type StorageKeys = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];


/**
+ * Composable for type-safe localStorage operations
+ * @returns Object with getItem, setItem, and removeItem methods
+ */
export default function useLocalStorage() {

  /**
   *
   * @param key - use STORAGE_KEYS values only.
   * @returns JSON.parsed(item) || warning
   */
  const getItem = (key: StorageKeys) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.warn(`Failed to parse localStorage item for key "${key}":`, error)
      return null
    }
  }
  /**
   * remove item from local storage
   * @param key - use STORAGE_KEYS values only.
   *
   */
  const removeItem = (key: StorageKeys) => {
    localStorage.removeItem(key)
  }
  /**
   *
   * @param key use STORAGE_KEYS values only.
   * @param value - data to be stored as a string using JSON.stringify
   */
  const setItem = (key: StorageKeys, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Failed to store item for key "${key}":`, error)
      throw error // Re-throw to let caller handle if needed
    }
  }

  return {
    getItem,
    removeItem,
    setItem
  }
}
