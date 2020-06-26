import { capitalize } from "./utils";

export class DomListener {
  constructor(root, listeners = []) {
    if (!root) {
      throw new Error("No root porvided for DomListener");
    }

    this.root = root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    for (const listener of this.listeners) {
      const callbackName = getCallbackName(listener);

      if (!this[callbackName]) {
        throw new Error(
          `Method ${getCallbackName(listener)} is not provided in ${
            this.constructor.name
          }`
        );
      }
      this[callbackName] = this[callbackName].bind(this);
      this.root.on(listener, this[callbackName]);
    }
  }

  removeDOMListeners() {
    for (const listener of this.listeners) {
      this.root.off(listener, this[getCallbackName(listener)]);
    }
  }
}

function getCallbackName(eventName) {
  return `on${capitalize(eventName)}`;
}
