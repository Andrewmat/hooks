import { act, cleanup, testHook } from 'react-testing-library'
import useToggle from './useToggle'

beforeEach(cleanup)

describe('useToggle', () => {
  it('starts with false', () => {
    let val
    testHook(() => ([val] = useToggle()))
    expect(val).toBe(false)
  })

  it('starts with initial value', () => {
    let val
    testHook(() => ([val] = useToggle(true)))
    expect(val).toBe(true)
  })

  it('returns a toggle function', () => {
    let val
    let toggle
    testHook(() => ([val, toggle] = useToggle()))
    expect(val).toBe(false)
    act(() => {
      toggle()
    })
    expect(val).toBe(true)
  })

  it('returns a toggle function', () => {
    let val
    let toggle
    testHook(() => ([val, toggle] = useToggle()))
    expect(val).toBe(false)
    act(() => {
      toggle()
    })
    expect(val).toBe(true)
  })
})
