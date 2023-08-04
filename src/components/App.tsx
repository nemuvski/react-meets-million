import { block, For } from 'million/react'
import type { FC } from 'react'
import useInputNumber from '~/hooks/use-input-number.ts'
import useInputText from '~/hooks/use-input-text.ts'

const _ListBlock: FC<{ num: number }> = block(function listBlock({ num }) {
  return (
    <ol>
      <For each={Array.from({ length: num })}>{(_, index) => <li key={index}>block</li>}</For>
    </ol>
  )
})

const _InputText: FC = () => {
  const [inputText, setInputText] = useInputText('Hello')

  return (
    <div>
      <label>
        Text: <input type='text' value={inputText} onChange={(event) => setInputText(event.target.value)} />
      </label>
      <p>入力された値: {inputText}</p>
    </div>
  )
}

const App = () => {
  const [inputNumber, setInputNumber] = useInputNumber(10)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <_InputText />

      <div>
        <label>
          Number:{' '}
          <input
            type='number'
            value={inputNumber}
            min={1}
            step={1}
            onChange={(event) => setInputNumber(Number(event.target.value))}
          />
        </label>
        <_ListBlock num={inputNumber} />
      </div>
    </div>
  )
}

export default App
