/// <reference types="@fxjs/db-driver" />

import React = require('react')
import assert = require('assert')
import useRunOnce from '../../../utils/react-helpers/use-runonce'

function dftIndexName (table: string, columns: string[]) {
    return `${table}_idx_${columns.join('_')}`
}

export default function Index ({
    table = '',
    name = '',
    columns = [],
    driver = null
}: React.PropsWithChildren<{
    table: string
    columns: string[]
    driver: FxDbDriverNS.Driver<Class_SQLite>
    name?: string
}>) {
    assert.ok(!!table, `[Index Element] table is required`)
    assert.ok(Array.isArray(columns), `[Index Element] columns should be string array`)

    if (!name)
        name = dftIndexName(table, columns)

    useRunOnce(() => {
        console.log(`[Index] ??? table ${table}'s index '${name}' for cols: ${columns.join(', ')}`)
    }, [driver], () => !!driver && !!columns.length)

    return null
}