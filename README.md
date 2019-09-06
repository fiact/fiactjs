# fiactjs

[![NPM version](https://img.shields.io/npm/v/fiact.svg)](https://www.npmjs.org/package/fiact)
[![Build Status](https://travis-ci.org/fiact/fiactjs.svg)](https://travis-ci.org/fiact/fiactjs)

run fibjs by react

## packages

### core
- @fiact/core: provide `.jsx` analysis sandbox; basic reconciler

### enhance built-in module
- @fiact/server: server instances
- @fiact/mq: message queue

## JSX?

file with `.jsx` extension cannot be required in fibjs directly, but we can resove them by special [Sandbox]'s setModuleCompiler :)

All non-core [packages](#packages) listed above are based @fiact/sandbox

```javascript
```

[reconcilization]:https://reactjs.org/docs/reconciliation.html
[Sandbox]:Sandbox