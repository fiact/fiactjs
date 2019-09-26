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
}: React.PropsWithChildren<{
    table: string,
    driver: FxDbDriverNS.Driver,
    schema_id: string
}>) {
    assert.ok(!!schema_id, `[Table Element] schema_id is required`)
    assert.ok(!!table, `[Table Element] table is required`)

    const allColumnsConfig = []
    const allKeyColumns: string[] = []
    const nodes = []

    React.Children.map(
        children,
        (element: React.ReactElement) => {
            const props = element.props;

            switch (element.type) {
                case Column:
                    if (props.name)
                        allColumnsConfig.push({name: props.name, property: props.property})
                    if (props.property.key)
                        allKeyColumns.push(props.name)

                    nodes.push(<element.type table={table} driver={driver} {...element.props} />)
                    break
                case DBIndex:
                    nodes.push(<element.type table={table} driver={driver} {...element.props} />)
                    break
                default:
                    nodes.push(<element.type table={table} {...element.props} />)
                    break
            }
        }
    ) as any as React.ReactElement

    useRunOnce(() => {
        const dialect = DDLSync.dialect(driver.type as FxOrmSqlDDLSync__Dialect.DialectType)
        
        let existed = dialect.hasCollectionSync(driver, table);
        logInReconciler(`[Table] table existed?`, existed)
        logInReconciler('allColumnsConfig', allColumnsConfig);
        
        const columns = allColumnsConfig.map(({name: colname, property}) => {
            const typeResult = dialect.getType(
                table,
                property,
                driver,
                {for: 'create_table'}
            )

            return typeResult ? `${colname} ${typeResult.value}` : ''
        }).filter(x => x);

        if (!existed)
            dialect.createCollectionSync(driver, table, columns, allKeyColumns)

        existed = dialect.hasCollectionSync(driver, table)
        logInReconciler(
            `[Table] now table existed?`,
            existed
        )

        if (existed) {
            logInReconciler()
            logInReconciler(`created table ${table} with columns ${columns.join(', ')}, details:`)
            logInReconciler(`${JSON.stringify(dialect.getCollectionColumnsSync(driver, table), null, '\t')}`)
        }
    }, [driver])

    return nodes
}