const test = require('test')
test.setup()

const Core = require('../')

describe('basic', () => {
    const react = require('react')

    it('react api check', () => {
        assert.isObject(react)

        assert.isObject(react.Children)
        assert.isFunction(react.createRef)
        assert.isObject(react.Component)
        assert.isObject(react.PureComponent)
        assert.property(react, 'Fragment')

        assert.isFunction(react.createContext)
        assert.isFunction(react.createElement)
        assert.isFunction(react.cloneElement)
        assert.isFunction(react.createFactory)
        assert.isFunction(react.isValidElement)
        assert.isString(react.version)

        if (react.version > "16.8.0") {
            assert.isFunction(react.forwardRef)
            assert.isFunction(react.useCallback)
            assert.isFunction(react.useContext)
            assert.isFunction(react.useDebugValue)
            assert.isFunction(react.useEffect)
            assert.isFunction(react.useImperativeHandle)
            assert.isFunction(react.useLayoutEffect)
            assert.isFunction(react.useMemo)
            assert.isFunction(react.useReducer)
            assert.isFunction(react.useRef)
            assert.isFunction(react.useState)
        }
    })

    it('exposed members', () => {
        assert.isObject(Core.Renders)
        
        assert.isFunction(Core.require)
        // assert.ok(Core.require.length === 2)

        assert.isFunction(Core.createSandbox)
        assert.isFunction(Core.jsx)
    })
})

if (require.main === module)
    test.run(console.DEBUG)
