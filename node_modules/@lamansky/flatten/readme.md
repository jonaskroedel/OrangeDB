# flatten

A one-liner function that flattens arrays.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i @lamansky/flatten
```

## API

The module exports a single function.

### Parameters

1. Bindable: `arr` (Array): The array to be flattened
2. Object argument:
    * Optional: `depth` (integer): Defaults to `Infinity`. If `0`, the original `arr` is returned.

### Return Value

The flattened Array

## Example

```javascript
const flatten = require('@lamansky/flatten')

const arr = [[[1], 2], [3]]

flatten(arr) // [1, 2, 3]
flatten(arr, {depth: 1}) // [[1], 2, 3]
flatten(arr, {depth: 0}) // [[[1], 2], [3]]

// Supports the bind operator
arr::flatten() // [1, 2, 3]
arr::flatten({depth: 1}) // [[1], 2, 3]
```
