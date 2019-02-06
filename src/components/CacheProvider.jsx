import React, { createContext, useContext, useState } from 'react'
import { throwError } from '../utils/devconsole'

const sendInitError = () => {
  throwError(new Error('[CacheProvider] Uninitialized cache context'))
}

export const CacheContext = createContext({
  _cache: {},
  getCache: () => ({
    size: 0,
    get: sendInitError,
    set: sendInitError,
    remove: sendInitError,
    clear: sendInitError,
  }),
  resetCache: sendInitError,
})

function cacheFactory(namespace, cacheState, setCacheState) {
  function initNamespace() {
    cacheState._cache[namespace] = new Map()
  }
  function getNamespace() {
    return cacheState._cache[namespace]
  }

  function get(key) {
    return getNamespace().get(key)
  }
  function set(key, value) {
    getNamespace().set(key, value)
    setCacheState(cacheState)
  }
  function remove(key) {
    getNamespace().delete(key)
    setCacheState(cacheState)
  }
  function clear() {
    getNamespace().clear()
    setCacheState(cacheState)
  }

  if (!getNamespace()) {
    initNamespace()
  }

  return {
    size: getNamespace().size,
    get,
    set,
    remove,
    clear,
  }
}

export default function CacheProvider({ children }) {
  const cacheContent = useContext(CacheContext)
  const [cacheState, setCacheState] = useState(cacheContent)

  function getCache(namespace) {
    return cacheFactory(namespace, cacheState, setCacheState)
  }
  function resetCache() {
    cacheState._cache = {}
  }

  return (
    <CacheContext.Provider value={{ ...cacheState, getCache, resetCache }}>
      {children}
    </CacheContext.Provider>
  )
}
