const test = require('test')
test.setup()

const React = require('react')
const NativeRenders = require('../').NativeRenders

describe('native-renders', () => {
    it('DB Schema', () => {
        const DB = NativeRenders.DB

        function UserSchema () {
            return (
                <DB.Schema
                    connection={`sqlite::memory:`}
                >
                    <DB.Table
                        table="user"
                    >
                        <DB.Column
                            name="id"
                            property={{
                                type: 'text',
                                key: true
                            }}
                        />

                        <DB.Column
                            name="username"
                            property={{
                                type: 'text',
                            }}
                            forceSync
                        >
                            <DB.DBIndex />
                        </DB.Column>

                        <DB.Column
                            name="password"
                            property={{
                                type: 'text',
                            }}
                            forceSync
                        />

                        <DB.Column
                            name="birthday"
                            property={{
                                type: 'date',
                                time: true
                            }}
                            forceSync
                        />

                        <DB.DBIndex columns={['username', 'gender']} />
                    </DB.Table>
                </DB.Schema>
            )
        }

        DB.render(<UserSchema />, null);
    });

    xdescribe('DB View', () => {
        it('render as http response', () => {
            const DB = NativeRenders.DB

            function UserStub () {
                return (
                    <DB.View
                        connection={`sqlite::memory:`}
                    >
                        <DB.Cache>

                        </DB.Cache>
                        <DB.Table
                            table="user"
                        >
                            
                        </DB.Table>
                    </DB.View>
                )
            }

            DB.render(<UserStub />);
        });
    })
})

if (require.main === module)
    test.run(console.DEBUG)
