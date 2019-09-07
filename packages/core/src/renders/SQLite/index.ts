import ReactReconciler = require('react-reconciler');

import { Root, Node } from './Node';

function traceWrap(hostConfig: any): any {
  let traceWrappedHostConfig = {};
  Object.keys(hostConfig).map(key => {
    const func = hostConfig[key];
    traceWrappedHostConfig[key] = (...args: any[]) => {
      console.log(`[${key}]`);
      return func(...args);
    };
  });
  return traceWrappedHostConfig;
}

const Components = {
  Schema: require('./elements/Schema').default,
  Table: require('./elements/Table').default,
  Column: require('./elements/Column').default,
  DBIndex: require('./elements/DBIndex').default
}

type COMS = typeof Components

const hostConfig: ReactReconciler.HostConfig<
  // Type,
  COMS[keyof COMS],
  // Props,
  any,
  // Container,
  any,
  // Instance,
  any,
  // TextInstance,
  any,
  // HydratableInstance,
  any,
  // PublicInstance,
  any,
  // HostContext,
  any,
  // UpdatePayload,
  any,
  // ChildSet,
  any,
  // TimeoutHandle,
  any,
  // NoTimeout,
  any
> = {
  getRootHostContext(rootHostContext) {
    return {};
  },
  getChildHostContext(parentHostContext, type, instance) {
    return {};
  },
  getPublicInstance(instance) {
    return instance;
  },
  createInstance(type, { children, ...rest }, rootContainerInstance) {
    console.log('[createInstance:type]', type)
    return new Node()
  },
  appendInitialChild(parent, child) {
    parent.addChild(child);
  },
  finalizeInitialChildren(instance, type, props) {
    return true;
  },
  prepareUpdate(instance, type, oldProps, newProps, container, hostContext) {
    return [];
  },
  shouldSetTextContent(type, props) {
    return false;
  },
  shouldDeprioritizeSubtree(type, props) {
    return false;
  },
  createTextInstance(text, container, hostContext, internalInstanceHandle) {
    // return text;
    return new Node()
  },
  scheduleDeferredCallback() {
  },
  cancelDeferredCallback() {
  },
  shouldYield() {
  },
  prepareForCommit() {
  },
  resetAfterCommit() {
  },
  now: Date.now,
  // schedulePassiveEffects: scheduleCallback,
  // cancelPassiveEffects: cancelCallback,
  supportsMutation: true,
  commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
    // updateProps(instance, updatePayload);
  },
  commitMount(instance, type, newProps, internalInstanceHandle) {
  },
  commitTextUpdate(instance, type, newProps, internalInstanceHandle) {
  },
  resetTextContent(instance) {
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  appendChildToContainer(container, child) {
    container.appendChild(child);
  },
  insertBefore(parent, child, beforeChild) {
    parent.appendChildBefore(child, beforeChild);
  },
  insertInContainerBefore(container, child, beforeChild) {
    // invariant(false, 'insertInContainerBefore is NOOP. Make sure you implement it.');
  },
  removeChild(parent, child) {
    parent.removeChild(child);
  },
  removeChildFromContainer(container, child) {
    container.removeChild(child);
  }
};
const ReactReconcilerInst = ReactReconciler(traceWrap(hostConfig));

const Renders = {
  render: function (reactElement, domElement, callback) {
    // Create a root Container if it doesnt exist
    if (!domElement) {
      domElement = new Root();
      reactElement._owner = domElement;
    }

    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false, false);
    }

    // update the root Container
    return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
  },
  ...Components
};

export default Renders