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

  it.todo('returns to original document title when component is unmounted')
})
