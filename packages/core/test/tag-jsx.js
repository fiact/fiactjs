const test = require('test')
test.setup()

const jsx = require('../').jsx

describe('tag-jsx', () => {
    it('simple', () => {
        assert.equal(
            jsx`<div></div>`,
            "React.createElement(\"div\", null);"
        )
    });

    it('Custom Element', () => {
        assert.equal(
            jsx`<Server></Server>`,
            "React.createElement(Server, null);"
        )

        assert.equal(
            jsx`<Server port={3001} />`,
            "React.createElement(Server, {\n  port: 3001\n});"
        )

        assert.equal(
            jsx`
                <Server port={3001}>
                    <Routing method="post"/>
                </Server>
            `,
            "React.createElement(Server, {\n  port: 3001\n}, React.createElement(Routing, {\n  method: \"post\"\n}));"
        )
    });
})

if (require.main === module)
    test.run(console.DEBUG)
