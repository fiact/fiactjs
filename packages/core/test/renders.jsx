const test = require('test')
test.setup()

const React = require('react')
const events = require('events')
const Renders = require('../').Renders

describe('renders', () => {
    it('sample', () => {
        function App () {
            return null
        }

        Renders.Sample.render(<App />, new events.EventEmitter())
    })
})

if (require.main === module)
    test.run(console.DEBUG)
