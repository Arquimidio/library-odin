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
  className = '',
  id = '',
  text = '',
  attributes = {},
  dataset = {},
  listeners = {},
  children = []
}) {
  const newElement = document.createElement(type);
  const newElementSetProps = setPropsFromArr.bind(newElement, newElement);

  newElement.className = className;
  newElement.id = id;
  
  Object.entries(dataset)
    .forEach(newElementSetProps((elt, prop, val) => elt.dataset[prop] = val));
  Object.entries(attributes)
    .forEach(newElementSetProps('setAttribute'));
  Object.entries(listeners)
    .forEach(newElementSetProps('addEventListener'));

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