type EventHandler = (...args: any[]) => void

const listeners: Record<string, EventHandler[]> = {}

export const EVENT_KEYS = {
  setSearch: 'search:query',
  clearSearch: 'search:clear',
};
export type EventKeys = typeof EVENT_KEYS[keyof typeof EVENT_KEYS];


export default function useEventBus() {
  function on(event: EventKeys, handler: EventHandler) {
    (listeners[event] || (listeners[event] = [])).push(handler)
  }

  function off(event: EventKeys, handler: EventHandler) {
    if (!listeners[event]) return
    listeners[event] = listeners[event].filter(h => h !== handler)
  }

  function emit(event: EventKeys, ...args: any[]) {
    (listeners[event] || []).forEach(handler => handler(...args))
  }

  return { on, off, emit }
}
