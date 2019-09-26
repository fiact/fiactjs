/// <reference types="@fxjs/db-driver" />

import React = require('react')
import assert = require('assert')

import DDLSync = require('@fxjs/sql-ddl-sync')
import useRunOnce from '../../../utils/react-hooks/use-runonce'
import { logInReconciler } from '../../../utils/react-reconciler';

export default function Model ({
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
    return null
}