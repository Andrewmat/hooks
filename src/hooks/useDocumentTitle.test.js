import { act, cleanup, testHook } from 'react-testing-library'
import useDocumentTitle from './useDocumentTitle'

afterEach(cleanup)

describe('useDocumentTitle', () => {
  it('changes document title', () => {
    document.title = 'a title'
    testHook(() => {
      useDocumentTitle('another title')
    })

    expect(document.title).toBe('another title')
  })

  it('returns to original document title when component is unmounted', () => {
    document.title = 'a title'
    const { unmount } = testHook(() => {
      useDocumentTitle('another title')
    })

    expect(document.title).toBe('another title')
    unmount()
    expect(document.title).toBe('a title')
  })
})
