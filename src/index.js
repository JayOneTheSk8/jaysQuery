const DOMNodeCollection = require('./dom_node_collection.js');

const loadedFunctions = [];
let documentReady = false;

$j = (arg) => {
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (typeof arg === "string") {
    return new DOMNodeCollection(document.querySelectorAll(arg));
  } else if (typeof arg === 'function') {
    if (documentReady) {
      arg()
    } else {
      loadedFunctions.push(arg);
    }
  }
};

$j.extend = (...objects) => {
  const mergedObject = {};
  for (let i = 0; i < objects.length; i++) {
    let currentKeys = Object.keys(objects[i]);
    currentKeys.forEach((key) => {
      mergedObject[key] = objects[i][key];
    });
  }
  return mergedObject;
};

$j.ajax = (options) => {
  const xhr = new XMLHttpRequest();
  const defaultObject = {
    method: 'GET',
    url: "",
    success: () => {},
    error: () => {},
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  const merged = $j.extend(defaultObject, options);
  if (merged.method === 'GET') {
    merged.url += queryString(merged.data);
  }
  return sendRequest(merged);
};

function sendRequest(obj) {
  const xml = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xml.open(obj.method, obj.url);
    xml.onload = (e) => {
      const responseJson = JSON.parse(xml.response);
      if (xml.status === 200) {
        resolve(responseJson);
      } else {
        reject(responseJson);
      }
    };
    xml.send(JSON.stringify(obj.data));
  });
}

function queryString(data) {
  const keys = Object.keys(data);
  let qString = "?";
  for (let i = 0; i < keys.length; i++) {
    qString += `${keys[i]}=${data[keys[i]]}&`;
  }
  return qString.slice(0, qString.length - 1);
}

document.addEventListener('DOMContentLoaded', () => {
  documentReady = true;
  for (let i = 0; i < loadedFunctions.length; i++) {
    loadedFunctions[i]();
  }
});
