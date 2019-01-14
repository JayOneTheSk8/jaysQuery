class DOMNodeCollection {
  constructor(nodes) {
    const items = [];
    for (let i = 0; i < nodes.length; i++) {
      items.push(nodes[i]);
    }
    this.nodes = items;
    this.classCache = {};
  }

  each(callback){
    this.nodes.forEach(callback);
  }

  html(string){
    if (typeof string === 'string') {
      this.each((node) => {
        node.innerHTML = string;
      });
    } else if (string === undefined) {
      return this.nodes[0].innerHTML;
    }
  }

  css(propertyName, value) {
    if (value) {
      this.each((node) => node.style[propertyName] = value);
    } else {
      return this.nodes[0].style[propertyName];
    }
  }

  empty() {
    this.html('');
  }

  append(arg) {
    if (typeof arg === 'string') this.each(node => node.innerHTML += arg);
    if (arg.constructor.name === HTMLElement) {
      this.each(node => node.innerHTML += arg.outerHTML);
    } else if (arg.constructor.name === DOMNodeCollection) {
      this.each((node) => {
        arg.each((nodeArg) => {
          this.appendChild(nodeArg)
        });
      });
    }
  }

  attr(attribute, data) {
    this.each((node) => {
      node[attribute] = data;
    });
  }

  addClass(newClass) {
    this.each((node) => {
      node.className += ` ${newClass}`;
    });
  }

  removeClass(classToRemove) {
    this.each((node) => {
      if (node.className.includes(classToRemove)) {
        let nodeClassName = node.className.split(' ');
        const truncatedClass = nodeClassName.map((nodeClass) => {
          if (nodeClass === classToRemove) {
            return "";
          } else {
            return nodeClass;
          }
        });
        node.className = truncatedClass.filter(Boolean).join(' ');
      }
    });
  }

  children() {
    let allChildren = [];
    this.each((node) => {
      allChildren = allChildren.concat([].slice.call(node.children));
    });
    return new DOMNodeCollection(allChildren);
  }

  parent() {
    const allParents = [];
    this.each((node) => {
      if (node.parentElement && !allParents.includes(node.parentElement)) {
        allParents.push(node.parentElement);
      }
    });
    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    const selected = [];
    this.each((node) => {
      let found = node.querySelectorAll(selector);
      if (found) {
        for (let i = 0; i < found.length; i++) {
          if (!selected.includes(found[i])) {
            selected.push(found[i]);
          }
        }
      }
    });
    return new DOMNodeCollection(selected);
  }

  remove(selector) {
    if (selector) {
      this.each((node) => {
        let targets = node.querySelectorAll(selector);
        if (targets) {
          for (let i = 0; i < targets.length; i++) {
            targets[i].parentElement.removeChild(targets[i]);
          }
        }
      });
    } else {
      this.each((node) => node.parentElement.removeChild(node));
    }
    this.nodes = [];
  }

  on(event, callback) {
    this.each((node) => {
      node.addEventListener(event, callback);
      const eventKey = `${event}event`
      if (!node[eventKey]) {
        node[eventKey] = [];
      }
      node[eventKey].push(callback)
    });
  }

  off(event) {
    this.each((node) => {
      const eventKey = `${event}event`
      if (node[eventKey]) {
        node[eventKey].forEach((callback) => {
          node.removeEventListener(event, callback);
        });
      }
      node[eventKey] = [];
    });
  }

  hide() {
    if (Object.keys(this.classCache).length !== 0) { return; }
    const nodes = this.nodes;
    for (let i = 0; i < nodes.length; i++) {
      this.classCache[i] = nodes[i].className;
      nodes[i].className = "hidden"; // must have hidden class in stylesheet
    }
  }

  show() {
    if (Object.keys(this.classCache).length === 0) { return; }
    const nodes = this.nodes;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].className = this.classCache[i];
    }
    this.classCache = {};
  }

  width() {
    return this.nodes[0].clientWidth;
  }

  height() {
    return this.nodes[0].clientHeight;
  }
}

module.exports = DOMNodeCollection;
