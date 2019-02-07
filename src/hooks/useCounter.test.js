import { act, cleanup, testHook } from 'react-testing-library'
import useCounter from './useCounter'

afterEach(cleanup)

describe('useCounter', () => {
  it('starts with 0', () => {
    let val
    testHook(() => ([val] = useCounter()))
    expect(val).toBe(0)
  })

  it('starts with initial value', () => {
    let val
    testHook(() => ([val] = useCounter(5)))
    expect(val).toBe(5)
  })

  it('returns a increment function', () => {
    let val
    let increment
    testHook(() => ([val, increment] = useCounter(1)))
    expect(val).toBe(1)

    act(() => {
      increment()
    })
    expect(val).toBe(2)
  })
})
