const test = require('test')
test.setup()

const React = require('react')
const Renders = require('../').Renders
const NativeRenders = require('../').NativeRenders

odescribe('renders-orm', () => {
    it('DB Schema', () => {
        const DB = Renders.ORM.DB

        function UserSchema () {
            return (
                <DB.Schema
                    // connection={`sqlite::memory:`}
                    connection={`mysql://root:@127.0.0.1:3306/fiact-test`}
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

        Renders.ORM.render(<UserSchema />, null);
    });

    xdescribe('DB Model', () => {
        it('Init Data', () => {
            const ORM = Renders.ORM

            function UserModel () {
                return (
                    <ORM.Model
                        connection={`sqlite::memory:`}
                    >
                        <ORM.Property
                            name="username"
                            mapsTo="username"
                            type="string"
                            key={true}
                        />
                    </ORM.Model>
                )
            }
    
            Renders.ORM.render(<UserModel />, null);
        });
    })

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
