# every

A better `Array.prototype.every()`. Supports iterables, whitelist testing, and more.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i @lamansky/every
```

## API

The module exports a single function.

### Parameters

1. Bindable: `iter` (iterable)
2. Optional: `test` (function, array, or any): If a function is provided, iterated values will be evaluated on whether `test` returns `true` when passed the value. If an array is provided, iterated values will be evaluated on whether they are contained in the array. If some other value is provided, iterated values will be evaluated on whether they strictly equal `test`. If `test` is omitted, iterated values will be evaluated on whether they are truthy.
3. Optional: Object argument (_or_ a value for `vacuously`):
    * `vacuously` (boolean): What to return if `iter` doesn’t iterate anything. Defaults to `true`. Thiis is for consistency with [`Array.prototype.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every), which interprets any test on an empty array as being [vacuously true](https://en.wikipedia.org/wiki/Vacuous_truth).

### Return Values

* If `iter` doesn’t iterate anything, returns `vacuously` if set, otherwise `true`.
* Otherwise, returns `true` if every one of the iterated values of `iter` passes `test`; otherwise returns `false`.

## Example

```javascript
const every = require('@lamansky/every')

const arr = [1, 2, 3]

every(arr, n => n >= 1) // true
every(arr, [1, 2, 3, 4]) // true

every(arr, n => n > 1) // false
every(arr, 1) // false
every(arr, [1, 2]) // false
```

## Related

* [some](https://github.com/lamansky/some)
