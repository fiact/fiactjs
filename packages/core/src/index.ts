import * as Renders from './renders'
export { Renders }

import { getSandbox as createSandbox } from './utils/sandbox'
export { createSandbox }

const defaultSandbox = createSandbox()
exports.require = defaultSandbox.require.bind(defaultSandbox)

export { tag as jsx } from './utils/jsx';