function setPropsFromArr(element, cb) {
  return ([prop, val]) => {
    if (typeof val === 'function'){
      val = val.bind(element);
    } 

    if(typeof cb === 'string'){
      element[cb].call(element, prop, val);
    } else {
      cb(element, prop, val);
    }
  }
}

function makeElement({
  type = 'p',
  parent = null,
  text = '',
  properties = {},
  attr = {},
  dataset = {},
  listeners = {},
  children = []
}) {
  const newElement = document.createElement(type);
  const newElementSetProps = setPropsFromArr.bind(newElement, newElement);
  
  Object.entries(dataset)
    .forEach(newElementSetProps((elt, prop, val) => elt.dataset[prop] = val));
  Object.entries(attr)
    .forEach(newElementSetProps('setAttribute'));
  Object.entries(listeners)
    .forEach(newElementSetProps('addEventListener'));
  Object.entries(properties)
    .forEach(newElementSetProps((elt, prop, val) => elt[prop] = val))

  if(children.length) {
    if(children[0] instanceof HTMLElement) {
      newElement.append(...children);
    }else {
      newElement.append(...children.map(makeElement));
    }
  }

  newElement.append(document.createTextNode(text));

  if (parent) {
    parent.append(newElement);
  }

  return newElement;
}

export default makeElement;