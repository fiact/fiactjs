const test = require('test')
test.setup()

const Core = require('../')

require('./basic')
Core.require('./renders', __dirname)
Core.require('./renders-orm', __dirname)
require('./tag-jsx')

test.run(console.DEBUG)