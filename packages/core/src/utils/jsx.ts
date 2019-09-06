import Babel = require('@babel/standalone')
import BabelPluginTransformReactJsx = require('@babel/plugin-transform-react-jsx');

const DFT_JSX_TRANSFORMT_OPS = {
    "pragma": "React.createElement",
    "pragmaFrag": "React.Fragment",
    "throwIfNamespace": true,
}
export function compileInputJsx (buf: Class_Buffer | string, jsxTransformOptions?: Fibjs.AnyObject) {
     const input = buf.toString()

    return Babel.transform(
        input,
        {
            plugins: [
                [BabelPluginTransformReactJsx, {
                    ...DFT_JSX_TRANSFORMT_OPS,
                    ...jsxTransformOptions
                }]
            ]
        }
    );
}

export function getJsxTplTag ({
    jsxTransformOptions = {...DFT_JSX_TRANSFORMT_OPS}
} : {
    jsxTransformOptions?: Fibjs.AnyObject
} = {}) {
    return (strings: string[]/* , ...exps: any[] */) => {
        return compileInputJsx(strings.join(''), jsxTransformOptions).code
    }
}