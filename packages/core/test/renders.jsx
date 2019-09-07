const test = require('test')
test.setup()

const React = require('react')
const Renders = require('../').Renders

describe('renders', () => {
    it('Sample', () => {
        const Sample = Renders.Sample

        function App () {
            return (
                <Sample.End></Sample.End>
            )
        }

        const root = new Sample.Root();

        Sample.render(<App />, root);
    })

    it('SQLite', () => {
        const SQLite = Renders.SQLite

        function UserSchema () {
            return (
                <SQLite.Schema
                    connection={`:memory:`}
                >
                    <SQLite.Table
                        table="user"
                    >
                        <SQLite.Column
                            name="id"
                            property={{
                                type: 'text',
                                key: true
                            }}
                        />

                        <SQLite.Column
                            name="username"
                            property={{
                                type: 'text',
                            }}
                            forceSync
                        >
                            <SQLite.DBIndex />
                        </SQLite.Column>

                        <SQLite.Column
                            name="password"
                            property={{
                                type: 'text',
                            }}
                            forceSync
                        />

                        <SQLite.Column
                            name="birthday"
                            property={{
                                type: 'date',
                                time: true
                            }}
                            forceSync
                        />

                        <SQLite.DBIndex columns={['username', 'gender']} />
                    </SQLite.Table>
                </SQLite.Schema>
            )
        }

        SQLite.render(<UserSchema />, null);
    })
})

if (require.main === module)
    test.run(console.DEBUG)
