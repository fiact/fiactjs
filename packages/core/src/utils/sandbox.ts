import vm = require('vm')
import getBuiltinModuleHash = require('@fibjs/builtin-modules/lib/util/get-builtin-module-hash')

import { compileInputJsx } from './jsx'
interface SetCompilerOptions {
    extensions?: string[] | string
    jsxTransformOptions?: Fibjs.AnyObject
}
function setReactCompiler (
    vbox: Class_SandBox,
    opts?: SetCompilerOptions
) {
    let {
        jsxTransformOptions = {},
        extensions = []
    } = opts || {};

    if (typeof extensions === 'string')
        extensions = [extensions]
    else if (!Array.isArray(extensions))
        extensions = ['.jsx']

    extensions.unshift('.jsx');
    extensions = Array.from(new Set(extensions.filter(x => x)))
     
    extensions.forEach(ext => {
        vbox.setModuleCompiler(ext, (buf) => {
            return compileInputJsx(buf, jsxTransformOptions).code;
        })
    })
}

export function getSandbox (
    {
        global: _global = undefined,
        jsxTransformOptions = {}
    }
    : {
        global?: Fibjs.AnyObject
    } & SetCompilerOptions = {}
) {
    const vbox = new vm.SandBox(
        getBuiltinModuleHash(),
        (name: string) => require(name),
        _global || undefined
    )
    
    setReactCompiler(vbox, { jsxTransformOptions })

    return vbox
}