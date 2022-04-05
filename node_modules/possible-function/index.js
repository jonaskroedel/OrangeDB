'use strict'

/**
 * Wraps what might be a function. Returns a wrapper-function that provides
 * fallback behavior in case the underlying value is not a function.
 * @param  {function|array=} mightBeAFunction A value that might be a function,
 *   or a two-element array with [object, 'method'] that might refer to an
 *   object method.
 * @param  {function|any=} elseReturn A value to return if `mightBeAFunction`
 *   is not a function, or a function that generates such a return value.
 *   If omitted, the first argument given to the returned wrapper-function is
 *   passed through.
 * @return {function} A function that calls `mightBeAFunction` if it’s a
 *   function, and if not, returns a value as defined by `elseReturn`.
 */
module.exports = function PossibleFunction (mightBeAFunction, elseReturn) {
  if (this instanceof PossibleFunction) {
    throw new TypeError('PossibleFunction is not a constructor')
  }

  if (Array.isArray(mightBeAFunction) && mightBeAFunction.length === 2) {
    const [object, functionName] = mightBeAFunction
    if (typeof object === 'object' && typeof functionName === 'string' && typeof object[functionName] === 'function') {
      mightBeAFunction = object[functionName].bind(object)
    }
  }

  return function () {
    if (typeof mightBeAFunction === 'function') {
      return mightBeAFunction(...arguments)
    }

    if (typeof elseReturn === 'undefined' && arguments.length > 0) {
      return arguments[0]
    }

    if (typeof elseReturn === 'function') {
      return elseReturn(...arguments)
    }

    return elseReturn
  }
}
