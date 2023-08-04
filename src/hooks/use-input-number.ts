import { useDeferredValue, useState } from 'react'

function useInputNumber(initialValue: number) {
  const [value, setValue] = useState(initialValue)
  const defValue = useDeferredValue(value)
  return [defValue, setValue] as const
}

export default useInputNumber
