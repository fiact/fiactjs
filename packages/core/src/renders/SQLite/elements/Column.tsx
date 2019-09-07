/// <reference types="@fxjs/db-driver" />

import React = require('react')
import assert = require('assert')

import DDLSync = require('@fxjs/sql-ddl-sync')
import useRunOnce from '../../../utils/react-helpers/use-runonce'

import DBIndex from './DBIndex';

export default function Column ({
    children = null,
    table,
    property,
    name,
    driver
}: React.PropsWithChildren<{
    name: string
    property: FxOrmSqlDDLSync__Column.Property
    table?: string,
    driver?: FxDbDriverNS.Driver<Class_SQLite>
}>) {
    assert.ok(!!table, `[Column Element] table is required`)
    
    assert.ok(!!name, `[Column Element] name is required`)
    assert.ok(!!property, `[Column Element] property is required`)

    useRunOnce(() => {
        const dialect = DDLSync.dialect('sqlite')

        console.log(
            `[Column] table ${table} has column ${name}?`,
            dialect.hasCollectionColumnsSync(driver, table, name)
        )
    }, [driver])
    
    return React.Children.map(
        children,
        (element: React.ReactElement) => {
            switch (element.type) {
                case DBIndex:
                    return <element.type table={table} driver={driver} columns={[name]} {...element.props} />
                default:
                    return null
            }
        }
    ) as any as React.ReactElement
}