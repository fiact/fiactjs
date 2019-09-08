import net = require('net');

import React = require('react');


// import { connect, useCtxState } from './Storage';

import { logInReconciler } from '../../../utils/react-reconciler';

function Server ({
    children = null,
}: React.PropsWithChildren<{
    id?: string
}>) {
    // const [, dispatch] = useCtxState()

    React.useEffect(() => {
    }, [])

    return <></>
}

export default /* connect */(Server)