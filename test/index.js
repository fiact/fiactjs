const test = require('test')
test.setup()

describe('basic requirement', () => {
    const react = require('react')

    it('api exists', () => {
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
})

test.run(console.DEBUG)