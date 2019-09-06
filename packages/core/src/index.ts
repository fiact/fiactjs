import * as Renders from './renders'
export { Renders }

import { getSandbox as createSandbox } from './utils/sandbox'
export { createSandbox }

const defaultSandbox = createSandbox()
exports.require = defaultSandbox.require.bind(defaultSandbox)

import { getJsxTplTag } from './utils/jsx';
export { getJsxTplTag }
export const jsx = getJsxTplTag()