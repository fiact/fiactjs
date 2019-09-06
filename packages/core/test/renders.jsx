const test = require('test')
test.setup()

const React = require('react')
const events = require('events')
const Renders = require('../').Renders

describe('renders', () => {
    it('sample', () => {
        const Sample = Renders.Sample

        function App () {
            return (
                <Sample.End></Sample.End>
            )
        }

        const root = new Sample.Root();

        Sample.render(<App />, root);
    })
})

if (require.main === module)
    test.run(console.DEBUG)
