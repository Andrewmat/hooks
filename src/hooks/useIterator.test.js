import { act, cleanup, testHook } from 'react-testing-library'
import useIterator from './useIterator'

beforeEach(cleanup)

describe('useIterator', () => {
  let list
  beforeEach(() => {
    list = ['alice', 'bob', 'charles']
  })

  it('starts with first index', () => {
    let controller
    testHook(() => (controller = useIterator(list)))
    expect(controller.index).toBe(0)
    expect(controller.item).toBe(list[0])
  })

  it('starts with given index', () => {
    let controller
    testHook(() => (controller = useIterator(list, false, 2)))
    expect(controller.index).toBe(2)
    expect(controller.item).toBe(list[2])
  })

  it('iterates to the previous value', () => {
    let controller
    testHook(() => (controller = useIterator(list, false, 1)))

    expect(controller.item).toBe(list[1])
    expect(controller.index).toBe(1)

    act(() => {
      controller.previous()
    })
    expect(controller.item).toBe(list[0])
    expect(controller.index).toBe(0)
  })

  it('supports chaining next and previous functions', () => {
    let controller
    testHook(() => (controller = useIterator(list)))

    expect(controller.item).toBe(list[0])
    expect(controller.index).toBe(0)

    act(() => {
      controller.next().next()
    })
    expect(controller.item).toBe(list[2])
    expect(controller.index).toBe(2)

    act(() => {
      controller.previous().previous()
    })
    expect(controller.item).toBe(list[0])
    expect(controller.index).toBe(0)

    let item
    let index
    act(() => {
      ;({ item, index } = controller.next())
    })
    expect(item).toBe(list[1])
    expect(index).toBe(1)
  })

  it('returns if has previous index', () => {
    let controller
    testHook(() => (controller = useIterator(list)))
    expect(controller.hasPrevious).toBe(false)
    act(() => {
      controller.next()
    })
    expect(controller.hasPrevious).toBe(true)
  })

  it('returns if has previous index', () => {
    let controller
    testHook(() => (controller = useIterator(list, false, 2)))
    expect(controller.hasNext).toBe(false)
    act(() => {
      controller.previous()
    })
    expect(controller.hasNext).toBe(true)
  })

  it('loops between last and first indexes', () => {
    let controller
    testHook(() => (controller = useIterator(list, true)))
    expect(controller.index).toBe(0)
    expect(controller.item).toBe(list[0])
    expect(controller.hasPrevious).toBe(true)

    act(() => {
      controller.previous()
    })
    expect(controller.index).toBe(list.length - 1)
    expect(controller.item).toBe(list[list.length - 1])
    expect(controller.hasNext).toBe(true)

    act(() => {
      controller.next()
    })
    expect(controller.index).toBe(0)
    expect(controller.item).toBe(list[0])
  })
})
