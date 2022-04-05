'use strict'

const assert = require('assert')
const PossibleFunction = require('.')

describe('PossibleFunction()', function () {
  it('should call the underlying value if it’s a function', function (done) {
    PossibleFunction(done)()
  })

  it('should pass through the first argument if wrapped value is not a function', function () {
    assert.strictEqual(PossibleFunction(null)('test'), 'test')
  })

  it('should return fallback value if wrapped value is not a function', function () {
    assert.strictEqual(PossibleFunction(null, 'fallback')('test'), 'fallback')
  })

  it('should support class method arrays', function (done) {
    class Test {
      example (arg) {
        if (arg && this instanceof Test) done()
      }
    }
    const test = new Test()
    PossibleFunction([test, 'example'])(true)
  })

  it('should support a fallback function', function () {
    assert.strictEqual(PossibleFunction(null, arg => arg ? 'yes' : 'no')(true), 'yes')
  })
})
