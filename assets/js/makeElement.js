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
  text,
  attributes = [],
  dataset = [],
  listeners = []
}) {
  const newElement = document.createElement(type);
  const newElementSetProps = setPropsFromArr.bind(newElement, newElement);

  newElement.className = className;
  newElement.id = id;
  
  dataset.forEach(newElementSetProps((elt, prop, val) => elt.dataset[prop] = val));
  attributes.forEach(newElementSetProps('setAttribute'));
  listeners.forEach(newElementSetProps('addEventListener'));
  newElement.textContent = text;

  if (parent) {
    parent.append(newElement);
  }

  return newElement;
}

export default makeElement;