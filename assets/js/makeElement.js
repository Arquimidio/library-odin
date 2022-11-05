function setPropsFromArr(element, cb) {
  return ([prop, val]) => {
    if (typeof val === 'function') val = val.bind(element);
    element[cb].call(element, prop, val);
  }
}

function makeElement({
  type = 'p',
  parent = null,
  className = '',
  id = '',
  attributes = [],
  text,
  listeners = []
}) {
  const newElement = document.createElement(type);
  const newElementSetProps = setPropsFromArr.bind(newElement, newElement);

  newElement.className = className;
  newElement.id = id;
  
  attributes.forEach(newElementSetProps(newElement.setAttribute));
  listeners.forEach(newElementSetProps('addEventListener'));
  newElement.textContent = text;

  if (parent) {
    parent.append(newElement);
  }

  return newElement;
}

export default makeElement;