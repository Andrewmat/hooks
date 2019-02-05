# Andrewmat/hooks

I've developed some custom hooks making the SWBD project, and now I'm sharing it. Just that.

## Usage

Add it to your project

```
npm install @andrewmat/hooks
yarn add @andrewmat/hooks
```

Starting using it

```jsx
import { useCache, CacheProvider } from '@andrewmat/hooks'
import { useCounter } from '@andrewmat/hooks'
import { useDocumentTitle } from '@andrewmat/hooks'
import { useIterator } from '@andrewmat/hooks'
import { useToggle } from '@andrewmat/hooks'
```

## So... where they are?

Inside the `/src/hooks` there are multiple hooks that I developed. I'm avoiding using external package dependencies, and focusing only on the original React resources for now

### useToggle

**Standalone hook**

It stores one of two options, and returns the current option and a function that changes to the other option.
As default, it simply changes between booleans, with false as initial value.

```jsx
function MyComponent() {
  const [myBool, toggleMyBool] = useToggle()

  // button label is false/true
  return (
    <button onClick={toggleMyBool}>
      {myBool}
    </button>
  )
}
```

It also can receive a initial boolean value

```jsx
function MyComponent() {
  const initialValue = true
  const [myBool, toggleMyBool] = useToggle(initialValue)

  // button label is true/false
  return (
    <button onClick={toggleMyBool}>
      {myBool}
    </button>
  )
}
```

It also can receive an array of two elements, and if so, it toggles between then. The index 0 will be the initial value in this case

```jsx
function MyComponent() {
  const [theme, toggleTheme] = useToggle(['blue', 'pink'])

  return (
    <>
      This is the {theme} theme!
      <button onClick={toggleTheme} className={`${theme}-theme`}>
        Toggle
      </button>
    </>
  )
}
```

### useCounter

**Standalone hook**

It returns the current value, and an increment function, in array form

```jsx
function MyComponent() {
  const [value, increment] = useCounter();
  return <button onClick={increment}>value</button>
}
```

### useDocumentTitle

**Standalone hook**

It receives an title to apply to the document. It also returns to the previous title when the component unmounts

```jsx
function MyComponent() {
  useDocumentTitle('Example Title')
  // ...
}
```

### useIterator

**Standalone hook**

It receives an array, and returns an controller to iterate in this array

```jsx
function MyComponent() {
  const myList = ['Alice', 'Ben', 'Charles']
  const iterator = useIterator(list)
  return (
    <>
      <button onClick={iterator.previous}>Previous</button>
      {iterator.item}
      <button onClick={iterator.next}>Next</button>
    </>
  )
}
```

useIterator also can received two more arguments

```jsx
// loop: Whether or not should the list loop. Defaults to false
// startIndex: What index should be the initial item. Defaults to 0
useIterator(list, loop, startIndex)
```

The controller returned by this hook is composed of the following attributes:

```jsx
const iterator = useIterator(list)

// current item being iterated
iterator.item

// index of the current item
iterator.index

// function to iterate to the next item on the list
// returns the controller so it can be chained
const nextIterator = iterator.next()

// function to iterate to the previous item on the list
// returns the controller so it can be chained
const previousIterator = iterator.previous()

// boolean that detects if it has a next item on the list
// it also accounts if the iterator loops
iterator.hasNext

// boolean that detects if it has a previous item on the list
// it also accounts if the iterator loops
iterator.hasPrevious
```

### useCache

A "complex" system to use cache in the application. It uses the CacheProvider (inside `/src/components`) that creates an context used for caching resources

It receives an async function, and it returns an async function that mimics the given function, using caching resources whenever possible

```jsx
function myFetch(id) {
  returns fetch(`${apiUrl}/${id}`)
}

function MyComponent() {
  const myCachedFetch = useCache(myFetch)

  return (
    <MyAnotherComponent onChange={myCachedFetch} />
  )
}
```

It receives a namespace as second argument. If not set, it uses `__root` as default, althought I recommend to always use it to avoid name clashes between diferent contexts

```jsx
function MyComponent() {
  const myCachedFetch = useCache(myFetch, 'myNamespace')

  return (
    <MyAnotherComponent onChange={myCachedFetch} />
  )
}
```

It also receives a config object as third parameter. The config object is as follows:

```jsx
const cacheConfig = {
  // optional function that generates key
  // It receives an array of parameters and must return an string
  keyGenerator,

  // optional key of cache entry
  // It overwrites the keyGenerator function
  key,

  // optional key to limit entries inside the namespace
  limit
}
useCache(myFetch, 'myNamespace', cacheConfig)

```

The returned function also has a new attribute: `clearCache`, a function that removes all the entries from the cache of the given namespace

```jsx
function MyComponent({ data }) {
  const cachedFetch = useCache(myFetch, { namespace: 'my-fetch' })

  return (
    <>
      <button onClick={() => cachedFetch(data)}>Fetch data<button>
      <button onClick={() => cachedFetch.clearCache()}>Reset cache<button>
    </>
  )
}
```
