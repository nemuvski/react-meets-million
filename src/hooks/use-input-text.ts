import { useDeferredValue, useState } from 'react'

function useInputText(initialValue: string) {
  const [value, setValue] = useState(initialValue)
  const defValue = useDeferredValue(value)
  return [defValue, setValue] as const
}

export default useInputText
