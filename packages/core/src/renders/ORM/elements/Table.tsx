/// <reference types="@fxjs/db-driver" />

import React = require('react')
import assert = require('assert')

import DDLSync = require('@fxjs/sql-ddl-sync')

import Column from './Column';
import DBIndex from './DBIndex';
import useRunOnce from '../../../utils/react-hooks/use-runonce';
import { logInReconciler } from '../../../utils/react-reconciler';

export default function Table ({
    children = null,
    table,
    driver,
    schema_id,

    keepAlive = false
}: React.PropsWithChildren<{
    table: string,
    driver: FxDbDriverNS.Driver,
    schema_id: string,

    keepAlive?: boolean
}>) {
    assert.ok(!!driver, `[Table Element] driver is required`)
    assert.ok(!!schema_id, `[Table Element] schema_id is required`)
    assert.ok(!!table, `[Table Element] table is required`)

    const allColumnsConfig = []
    const allKeyColumns: string[] = []

    const dialect = DDLSync.dialect(driver.type as FxOrmSqlDDLSync__Dialect.DialectType)

    const [ existed, setExisted ] = React.useState<undefined | boolean>(true)

    React.useEffect(() => {
        logInReconciler(`[Table] table existed?`, existed)
        // logInReconciler('allColumnsConfig', allColumnsConfig);

        if (!dialect.hasCollectionSync(driver, table)) {
            React.Children.forEach(
                children,
                (element: React.ReactElement) => {
                    const props = element.props;

                    switch (element.type) {
                        case Column:
                            if (props.name)
                                allColumnsConfig.push({name: props.name, property: props.property})
                            if (props.property.key)
                                allKeyColumns.push(props.name)
                            break
                        default:
                            break
                    }
                }
            )
            
            const columns = allColumnsConfig.map(({name: colname, property}) => {
                const typeResult = dialect.getType(
                    table,
                    property,
                    driver,
                    !existed ? {for: 'create_table'} : {}
                )

                return typeResult ? `${colname} ${typeResult.value}` : ''
            }).filter(x => x);

            dialect.createCollectionSync(driver, table, columns, allKeyColumns)
            setExisted(dialect.hasCollectionSync(driver, table));

            logInReconciler()
            logInReconciler(`created table ${table} with columns ${columns.join(', ')}, details:`)
            logInReconciler(`${JSON.stringify(dialect.getCollectionColumnsSync(driver, table), null, '\t')}`)
        }
    }, [existed]);

    // add interval to check if it existed.
    if (true || keepAlive)
        React.useEffect(() => {
            const interval = setInterval(() => {
                // console.log('[Schema.Table] loop check', dialect.hasCollectionSync(driver, table));
                setExisted(dialect.hasCollectionSync(driver, table));
            }, 1000);

            return () => clearInterval(interval);
        }, []);

    if (!existed)
        return null

    return React.Children.map(
        children,
        (element: React.ReactElement) => {
            switch (element.type) {
                case Column:
                    return (<element.type table={table} driver={driver} {...element.props} />)
                case DBIndex:
                    return (<element.type table={table} driver={driver} {...element.props} />)
                default:
                    return (<element.type table={table} {...element.props} />)
            }
        }
    )
}