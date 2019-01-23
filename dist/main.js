/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(nodes) {\n    const items = [];\n    for (let i = 0; i < nodes.length; i++) {\n      items.push(nodes[i]);\n    }\n    this.nodes = items;\n    this.classCache = {};\n  }\n\n  each(callback){\n    this.nodes.forEach(callback);\n  }\n\n  html(string){\n    if (typeof string === 'string') {\n      this.each((node) => {\n        node.innerHTML = string;\n      });\n    } else if (string === undefined) {\n      return this.nodes[0].innerHTML;\n    }\n  }\n\n  css(propertyName, value) {\n    if (value !== undefined) {\n      this.each((node) => node.style[propertyName] = value);\n    } else {\n      return this.nodes[0].style[propertyName];\n    }\n  }\n\n  empty() {\n    this.html('');\n  }\n\n  append(arg) {\n    if (typeof arg === 'string') {\n      this.each(node => node.innerHTML += arg)\n    } else if (arg.constructor.name === 'HTMLElement' || arg.constructor.__proto__.name === 'HTMLElement') {\n      this.each(node => node.innerHTML += arg.outerHTML);\n    } else if (arg.constructor.name === 'DOMNodeCollection') {\n      this.each((node) => {\n        arg.each((nodeArg) => {\n          node.appendChild(nodeArg)\n        });\n      });\n    }\n  }\n\n  attr(attribute, data) {\n    if (data !== undefined) {\n      this.each((node) => {\n        node[attribute] = data;\n      });\n    } else {\n      return this.nodes[0][attribute];\n    }\n  }\n\n  addClass(newClass) {\n    this.each((node) => {\n      node.className = node.className ? `${node.className} ${newClass}` : `${newClass}`;\n    });\n  }\n\n  removeClass(classToRemove) {\n    this.each((node) => {\n      if (node.className.includes(classToRemove)) {\n        let nodeClassName = node.className.split(' ');\n        const truncatedClass = nodeClassName.map((nodeClass) => {\n          if (nodeClass === classToRemove) {\n            return \"\";\n          } else {\n            return nodeClass;\n          }\n        });\n        node.className = truncatedClass.filter(Boolean).join(' ');\n      }\n    });\n  }\n\n  children() {\n    let allChildren = [];\n    this.each((node) => {\n      allChildren = allChildren.concat([].slice.call(node.children));\n    });\n    return new DOMNodeCollection(allChildren);\n  }\n\n  parent() {\n    const allParents = [];\n    this.each((node) => {\n      if (node.parentElement && !allParents.includes(node.parentElement)) {\n        allParents.push(node.parentElement);\n      }\n    });\n    return new DOMNodeCollection(allParents);\n  }\n\n  find(selector) {\n    const selected = [];\n    this.each((node) => {\n      let found = node.querySelectorAll(selector);\n      if (found) {\n        for (let i = 0; i < found.length; i++) {\n          if (!selected.includes(found[i])) {\n            selected.push(found[i]);\n          }\n        }\n      }\n    });\n    return new DOMNodeCollection(selected);\n  }\n\n  remove(selector) {\n    if (selector !== undefined) {\n      this.each((node) => {\n        let targets = node.querySelectorAll(selector);\n        if (targets) {\n          for (let i = 0; i < targets.length; i++) {\n            targets[i].parentElement.removeChild(targets[i]);\n          }\n        }\n      });\n    } else {\n      this.each((node) => node.parentElement.removeChild(node));\n      this.nodes = [];\n    }\n  }\n\n  on(event, callback) {\n    this.each((node) => {\n      node.addEventListener(event, callback);\n      const eventKey = `${event}event`\n      if (!node[eventKey]) {\n        node[eventKey] = [];\n      }\n      node[eventKey].push(callback)\n    });\n  }\n\n  off(event) {\n    this.each((node) => {\n      const eventKey = `${event}event`\n      if (node[eventKey]) {\n        node[eventKey].forEach((callback) => {\n          node.removeEventListener(event, callback);\n        });\n      }\n      node[eventKey] = [];\n    });\n  }\n\n  hide() {\n    if (Object.keys(this.classCache).length !== 0) { return; }\n    const nodes = this.nodes;\n    for (let i = 0; i < nodes.length; i++) {\n      this.classCache[i] = nodes[i].className;\n      nodes[i].className = \"hidden\"; // must have hidden class in stylesheet\n    }\n  }\n\n  show() {\n    if (Object.keys(this.classCache).length === 0) { return; }\n    const nodes = this.nodes;\n    for (let i = 0; i < nodes.length; i++) {\n      nodes[i].className = this.classCache[i];\n    }\n    this.classCache = {};\n  }\n\n  width() {\n    return this.nodes[0].clientWidth;\n  }\n\n  height() {\n    return this.nodes[0].clientHeight;\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nconst loadedFunctions = [];\nlet documentReady = false;\n\n$j = (arg) => {\n  if (arg instanceof HTMLElement) {\n    return new DOMNodeCollection([arg]);\n  } else if (typeof arg === \"string\") {\n    return new DOMNodeCollection(document.querySelectorAll(arg));\n  } else if (typeof arg === 'function') {\n    if (documentReady) {\n      arg()\n    } else {\n      loadedFunctions.push(arg);\n    }\n  }\n};\n\n$j.extend = (...objects) => {\n  const mergedObject = {};\n  for (let i = 0; i < objects.length; i++) {\n    let currentKeys = Object.keys(objects[i]);\n    currentKeys.forEach((key) => {\n      mergedObject[key] = objects[i][key];\n    });\n  }\n  return mergedObject;\n};\n\n$j.ajax = (options) => {\n  const defaultObject = {\n    method: 'GET',\n    url: \"\",\n    success: () => {},\n    error: () => {},\n    data: {},\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'\n  };\n  const merged = $j.extend(defaultObject, options);\n  if (merged.method === 'GET') {\n    merged.url += queryString(merged.data);\n  }\n  return sendRequest(merged);\n};\n\nfunction sendRequest(obj) {\n  const xml = new XMLHttpRequest();\n  return new Promise((resolve, reject) => {\n    xml.open(obj.method, obj.url);\n    xml.onload = (e) => {\n      const responseJson = JSON.parse(xml.response);\n      if (xml.status === 200) {\n        resolve(responseJson);\n      } else {\n        reject(responseJson);\n      }\n    };\n    xml.send(JSON.stringify(obj.data));\n  });\n}\n\nfunction queryString(data) {\n  const keys = Object.keys(data);\n  let qString = \"?\";\n  for (let i = 0; i < keys.length; i++) {\n    qString += `${keys[i]}=${data[keys[i]]}&`;\n  }\n  return qString.slice(0, qString.length - 1);\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  documentReady = true;\n  for (let i = 0; i < loadedFunctions.length; i++) {\n    loadedFunctions[i]();\n  }\n});\n\nwindow.$j = $j;\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });