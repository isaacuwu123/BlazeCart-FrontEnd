/**
 * Utility functions for localStorage management
 */
export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading from localStorage key "${key}":`, error)
      return defaultValue
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error)
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Error removing from localStorage key "${key}":`, error)
    }
  },

  clear() {
    try {
      localStorage.clear()
    } catch (error) {
      console.warn('Error clearing localStorage:', error)
    }
  },
}

/**
 * Constants for storage keys
 */
export const STORAGE_KEYS = {
  THEME: 'blazecart_theme',
  LANGUAGE: 'blazecart_language',
  USER_PREFERENCES: 'blazecart_user_preferences',
  SIDEBAR_STATE: 'blazecart_sidebar_state',
}