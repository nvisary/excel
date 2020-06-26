import { dom } from "../../core/dom";

export class Excel {
  constructor(selector, options) {
    this.el = dom(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const rootDomNode = dom.create("div", "excel");
    this.components = this.components.map((Component) => {
      const el = dom.create("div", Component.className);
      const component = new Component(el);

      el.html(component.toHTML());
      rootDomNode.append(el);
      return component;
    });

    return rootDomNode;
  }

  render() {
    this.el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }
}
