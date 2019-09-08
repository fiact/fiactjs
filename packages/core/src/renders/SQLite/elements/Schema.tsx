import hash = require('hash');
import uuid = require('uuid');

import React = require('react');

import DBDriver = require('@fxjs/db-driver');

import Table from './Table';

import { connect, useCtxState } from './Storage';

import { logInReconciler } from '../../../utils/react-reconciler';

function randomSchemaId () {
    return `${uuid.snowflake().hex()}`
}

function md5 (input: string) {
    return hash.md5(input as any).digest().hex()
}

function Schema ({
    children = null,
    connection = 'sqlite::memory:',
    id: init_sid/*  = md5(connection), */
}: React.PropsWithChildren<{
    id?: string
    connection?: string
}>) {
    const [ schema_id ] = React.useState(init_sid || randomSchemaId())

    if (!connection.startsWith('sqlite:'))
        connection = `sqlite:${connection}`

    const driver = DBDriver.create(connection)

    const [, dispatch] = useCtxState()

    React.useEffect(() => {
        dispatch({
            type: 'add-schema',
            schema_id,
            driver
        })
    }, [])

    return <>{
        React.Children.map(
            children,
            (element: React.ReactElement) => {
                switch (element.type) {
                    case Table:
                        return <element.type schema_id={schema_id} {...element.props} />
                    default:
                        return element
                }
            }
        )
    }</>
}

export default connect(Schema)