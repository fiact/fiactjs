import ReactReconciler = require('react-reconciler');

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
    return rootHostContext;
  },
  getChildHostContext(parentHostContext, type, instance) {
    console.log('[getChildHostContext]')
    return parentHostContext;
  },
  getPublicInstance(instance) {
    console.log('[getPublicInstance]')
    return instance;
  },
  createInstance (type, { children, ...rest }, container) {
    console.log('[createInstance]')
    return null
  },,
  appendInitialChild(parent, child) {
    console.log('[appendInitialChild]')
    parent.addChild(child);
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
  // scheduleDeferredCallback: window.requestIdleCallback,
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
    parent.addChild(child);
  },
  appendChildToContainer(container, child) {
    console.log('[appendChildToContainer]')
    container.addChild(child);
  },
  insertBefore(parent, child, beforeChild) {
    console.log('[insertBefore]')
    parent.insertBefore(child, beforeChild);
  },
  insertInContainerBefore(container, child, beforeChild) {
    console.log('[insertInContainerBefore]')
    // invariant(false, 'insertInContainerBefore is NOOP. Make sure you implement it.');
  },
  removeChild(parent, child) {
    console.log('[removeChild]')
    parent.removeChild(child);
  },
  removeChildFromContainer(container, child) {
    console.log('[removeChildFromContainer]')
    container.removeChild(child);
  }
};
const ReactReconcilerInst = ReactReconciler(hostConfig);

export default {
  render: function (reactElement, domElement, callback) {
    // Create a root Container if it doesnt exist
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
    }

    // update the root Container
    return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
  }
};