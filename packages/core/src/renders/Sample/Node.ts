export class Node {
  parent: Node | null = null;
  children: Node[] = []
  
  constructor() {
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

    child.cleanup();
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

export class Root extends Node {}