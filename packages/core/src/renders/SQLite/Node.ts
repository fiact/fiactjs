import * as React from 'react';

export class Node<
  P extends React.Props<{}> = Fibjs.AnyObject,
  S extends Fibjs.AnyObject = Fibjs.AnyObject
> extends React.Component<P, S> {
  parent: Node | null = null;
  children: Node[] = []

  get name (): string {
    return 'node'
  }
  
  constructor(props?: P) {
    super(props)
  }

  appendChild(child: Node) {
    if (child) {
      child.parent = this;
      this.children.push(child);
    }
  }

  appendChildBefore(child: Node, beforeChild: Node) {
    const index = this.children.indexOf(beforeChild);

    if (index !== -1 && child) {
      child.parent = this;
      this.children.splice(index, 0, child);
    }
  }

  removeChild(child: Node) {
    const index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
    }
  }

  removeAllChilds() {
    const children = [...this.children];
    for (let i = 0; i < children.length; i++) {
      children[i].remove();
    }
  }

  remove() {
    this.parent.removeChild(this);
  }

  render () {
    return null   
  }
}

export class Root extends Node {
  constructor () {
    super()
    this.parent = null
  }
}