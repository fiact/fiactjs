import * as React from 'react';
import { EventEmitter } from 'events';
import ReactReconciler = require('react-reconciler');

import { Root, Node } from './Node';

const emitter = new EventEmitter()

const Components = <Fibjs.AnyObject>{}

const hostConfig: ReactReconciler.HostConfig<
// Type,
// Props,
// Container,
// Instance,
// TextInstance,
// HydratableInstance,
// PublicInstance,
// HostContext,
// UpdatePayload,
// ChildSet,
// TimeoutHandle,
// NoTimeout,
> = {
  getRootHostContext(rootHostContext) {
    console.log('[getRootHostContext]')
    return {};
  },
  getChildHostContext(parentHostContext, type, instance) {
    console.log('[getChildHostContext]')
    return {};
  },
  getPublicInstance(instance) {
    console.log('[getPublicInstance]')
    return instance;
  },
  createInstance (type, { children, ...rest }, rootContainerInstance) {
    console.log('[createInstance]')
    return new Node()
  },
  appendInitialChild(parent, child) {
    console.log('[appendInitialChild]', parent, child)
    // parent.addChild(child);
  },
  finalizeInitialChildren(instance, type, props) {
    console.log('[finalizeInitialChildren]')
    return true;
  },
  prepareUpdate(instance, type, oldProps, newProps, container, hostContext) {
    console.log('[prepareUpdate]')
    return [];
  },
  shouldSetTextContent(type, props) {
    console.log('[shouldSetTextContent]')
    return false;
  },
  shouldDeprioritizeSubtree(type, props) {
    console.log('[shouldDeprioritizeSubtree]')
    return false;
  },
  createTextInstance(text, container, hostContext, internalInstanceHandle) {
    console.log('[createTextInstance]')
    return text;
  },
  scheduleDeferredCallback() {
    console.log('[scheduleDeferredCallback]')
  },
  cancelDeferredCallback() {
    console.log('[cancelDeferredCallback]')
  },
  shouldYield() {
    console.log('[shouldYield]')
  },
  prepareForCommit() {
    console.log('[prepareForCommit]')
  },
  resetAfterCommit() {
    console.log('[resetAfterCommit]')
  },
  // now,
  // schedulePassiveEffects: scheduleCallback,
  // cancelPassiveEffects: cancelCallback,
  supportsMutation: true,
  commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
    console.log('[commitUpdate]')
    // updateProps(instance, updatePayload);
  },
  commitMount(instance, type, newProps, internalInstanceHandle) {
    console.log('[commitMount]')
  },
  commitTextUpdate(instance, type, newProps, internalInstanceHandle) {
    console.log('[commitTextUpdate]')
  },
  resetTextContent(instance) {
    console.log('[resetTextContent]')
  },
  appendChild(parent, child) {
    console.log('[appendChild]')
    // parent.addChild(child);
  },
  appendChildToContainer(container, child) {
    console.log('[appendChildToContainer]', container)
    // container.addChild(child);
  },
  insertBefore(parent, child, beforeChild) {
    console.log('[insertBefore]')
    // parent.insertBefore(child, beforeChild);
  },
  insertInContainerBefore(container, child, beforeChild) {
    console.log('[insertInContainerBefore]')
    // invariant(false, 'insertInContainerBefore is NOOP. Make sure you implement it.');
  },
  removeChild(parent, child) {
    console.log('[removeChild]')
    // parent.removeChild(child);
  },
  removeChildFromContainer(container, child) {
    console.log('[removeChildFromContainer]')
    // container.removeChild(child);
  }
};
const ReactReconcilerInst = ReactReconciler(hostConfig);

const Renders = <{render: Function} & Fibjs.AnyObject>{
  render: function (reactElement, domElement, callback) {
    // Create a root Container if it doesnt exist
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false, false);
    }

    // update the root Container
    return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
  }
};

Renders.Root = Root

Renders.End = class End extends React.Component {
  render () {
    // const node = new Node()
    return '123'
  }
}

export default Renders