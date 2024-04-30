import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQuery = (name: string): string | null => {
  const location = useLocation()
  const { search } = location
  const searchParams = useMemo(() => {
    return new URLSearchParams(search)
  }, [search])
  return searchParams.get(name)
}
