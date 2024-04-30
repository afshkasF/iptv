import React, { useCallback, useMemo, useState } from 'react'

export interface Size {
  width: number
  height: number
}

export interface UseResizeObserverResult<T extends Element> extends Size {
  ref: React.Ref<T>
}

export const useResizeObserver = <T extends Element>(): UseResizeObserverResult<T> => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  const observer = useMemo(() => {
      return new ResizeObserver((entries) => {
        const { contentRect } = entries[0]
        setWidth(contentRect.width)
        setHeight(contentRect.height)
      })
    },
    []
  )

  const ref = useCallback((element: T): void => {
    if (element) {
      observer.observe(element)
    } else {
      observer.disconnect()
    }
  }, [observer])

  return { ref, width, height }
}
