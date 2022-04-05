'use strict'

const f = (arr, {depth: d = Infinity} = {}) => d > 0 ? arr.reduce((r, x) => r.concat(Array.isArray(x) ? f(x, {depth: d - 1}) : [x]), []) : arr

module.exports = require('sbo')(f)
