import { useCallback, useMemo, useState } from 'react'

export type Value = string

export type SetValue = (value: Value) => void

export type UseLocalStoreResult = [Value, SetValue]

export const useLocalStore = (key: string, defaultValue: string = ''): UseLocalStoreResult => {
  const initialValue = useMemo<Value>(() => {
    return localStorage.getItem(key) || defaultValue
  }, [key])

  const [value, setValue] = useState<Value>(initialValue)

  const handleSetValue = useCallback((value: Value): void => {
    setValue(value)
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, handleSetValue]
}
