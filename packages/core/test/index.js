const test = require('test')
test.setup()

const Core = require('../')

require('./basic')
Core.require('./renders', __dirname)

test.run(console.DEBUG)