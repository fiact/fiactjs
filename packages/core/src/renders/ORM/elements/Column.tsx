/// <reference types="@fxjs/db-driver" />

import React = require('react')
import assert = require('assert')

import DDLSync = require('@fxjs/sql-ddl-sync')
import useRunOnce from '../../../utils/react-hooks/use-runonce'
import { logInReconciler } from '../../../utils/react-reconciler';

import DBIndex from './DBIndex';

const SqlQueryDialects = require('@fxjs/sql-query/lib/Dialects')

export default function Column ({
    children = null,
    table,
    property,
    name,
    driver
}: React.PropsWithChildren<{
    name: string
    property: FxOrmSqlDDLSync__Column.Property
    table: string,
    driver?: FxDbDriverNS.Driver<Class_SQLite | Class_MySQL | Class_MSSQL>
}>) {
    assert.ok(!!table, `[Column Element] table is required`)
    assert.ok(!!name, `[Column Element] name is required`)
    assert.ok(!!property, `[Column Element] property is required`)

    const [ existed, setExisted ] = React.useState(true)

    const dialect = DDLSync.dialect(driver.type as FxOrmSqlDDLSync__Dialect.DialectType)

    React.useEffect(() => {
        setInterval(() => {
            dialect.hasCollectionColumnsSync(driver, table, name)
        }, 1000)
    }, [])
    
    React.useEffect(() => {
        if (!existed) {
            driver.trans(() => {
                const typeInfo = dialect.getType(table, property, driver, { for: 'add_column' });
                if (typeInfo) {
                    try {
                        dialect.addCollectionColumnSync(
                            driver,
                            table,
                            SqlQueryDialects[driver.type].escapeId(name) + " " + typeInfo.value,
                            false
                        );
                    } catch (error) {
                    }
                }

                setExisted(dialect.hasCollectionColumnsSync(driver, table, name))
            })
            logInReconciler(
                `[Column] table ${table} has column ${name}?`,
                dialect.hasCollectionColumnsSync(driver, table, name)
            )
        }

    }, [existed])

    if (!existed)
        return null
    
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