/// <reference types="@fxjs/db-driver" />

import React = require('react')
import assert = require('assert')

import DDLSync = require('@fxjs/sql-ddl-sync')
import useRunOnce from '../../../utils/react-hooks/use-runonce'
import { logInReconciler } from '../../../utils/react-reconciler';

import Column from '../elements/Column'

export default function Property ({
    table,
    
    name,
    mapsTo = name,
    type = 'string',
    
    unique = false,
    serial = false,
    primary = false,
    required = false,

    colsize = 4,
    rational = false,
    time = false,
    big = false,
    values = []
}: React.PropsWithChildren<{
    table: string,

    colsize: FxOrmSqlDDLSync__Column.Property['size'] 
} & Exclude<FxOrmSqlDDLSync__Column.Property, 'size'>>) {
    return (
        <Column
            table={table}
            name={mapsTo}
        />
    )
}