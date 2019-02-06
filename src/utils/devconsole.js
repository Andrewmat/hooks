function _console(func, args) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console[func](...args)
  }
}

export function log(...args) {
  _console('log', args)
}

export function warn(...args) {
  _console('warn', args)
}

export function error(...args) {
  _console('error', args)
}

export function count(...args) {
  _console('count', args)
}

export function table(...args) {
  _console('table', args)
}

export function throwError(error) {
  try {
    throw error
  } catch (e) {
    _console('error', error)
  }
}

const devconsole = {
  log,
  warn,
  error,
  count,
  table,
  throwError,
}

export default devconsole
