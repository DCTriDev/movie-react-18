import { useEffect, useState } from 'react'
import { DELAY } from '@config/debounce.config'

function useDebounce(input, delay = DELAY) {
  const [debouncedValue, setDebouncedValue] = useState(input)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedValue(input)
    }, delay)

    return () => {
      clearTimeout(delayDebounceFn)
    }
  }, [input, delay])

  return debouncedValue
}

export default useDebounce
