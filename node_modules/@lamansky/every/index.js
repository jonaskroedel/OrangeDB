'use strict'

const ffn = require('ffn')
const plainify = require('plainify')
const sbo = require('sbo')

module.exports = sbo(function every (iter, test, options) {
  const {vacuously = true} = plainify('vacuously', options)
  test = ffn(test)
  let empty = true
  for (const val of iter) {
    empty = false
    if (!test(val)) return false
  }
  return !empty || !!vacuously
})
