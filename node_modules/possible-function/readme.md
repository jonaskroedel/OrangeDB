# possible-function

Defines fallback behavior in case a variable is not a function. Perfect for optional callback parameters. Packaged as a [Node.js](https://nodejs.org/) module.

## Installation

```
npm install possible-function --save
```

The module exposes a single factory function.

## Usage

`PossibleFunction` wraps a value that may or may be a function. If the underlying value is not a function, then the `PossibleFunction` wrapper will execute one of the following fallback behaviors.

### Passthrough Fallback

If the wrapped value turns out to not be a function, the wrapping function will, by default, pass through whatever is given as the first argument. This is useful for optional filters.

```javascript
const PossibleFunction = require('possible-function')

function sayHello (name, filter) {
  filter = PossibleFunction(filter)
  return filter('Hello, ' + name)
}

// No filter is provided, so the hello message is returned without change:
sayHello('world') // 'Hello, world'

// A filter is provided which changes the hello message:
sayHello('world', m => m + '!!') // 'Hello, world!!'
```

### Return-Value Fallback

If the wrapped value turns out to not be a function, the wrapping function can be configured to return a value of your choosing.

```javascript
const PossibleFunction = require('possible-function')

function sayHello (nameCallback) {
  nameCallback = PossibleFunction(nameCallback, 'world')
  return 'Hello, ' + nameCallback()
}

sayHello() // 'Hello, world'
sayHello(() => 'Dolly') // 'Hello, Dolly'
```

### Self Fallback

If you provide the possible function as its own fallback, then you can accept either a value or a function as an argument for your code. For example, the `sayHello` function in the following example can accept either a string or a function.

```javascript
const PossibleFunction = require('possible-function')

function sayHello (nameCallback) {
  nameCallback = PossibleFunction(nameCallback, nameCallback)
  return 'Hello, ' + nameCallback()
}

sayHello('world') // 'Hello, world'
sayHello(() => 'world') // 'Hello, world'
```

### Custom Fallback

If the wrapped value turns out to not be a function, the wrapping function can execute a custom fallback function instead:

```javascript
const PossibleFunction = require('possible-function')
const mightBeAFunction = null
const callback = PossibleFunction(mightBeAFunction, (...args) => args.length)
callback('arg 1', 'arg 2') // 2
```
