/**
 * DOM helpers.
 * Creates DOM elements safely and robustly.
 */
window.Portfolio = window.Portfolio || {};

window.Portfolio.el = function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined) continue;

    if (key === 'class' || key === 'className') {
      node.className = value;
    } else if (key === 'html') {
      node.innerHTML = value;
    } else if (key.startsWith('data-')) {
      node.setAttribute(key, String(value));
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (typeof value === 'boolean') {
      if (value) {
        node.setAttribute(key, '');
      } else {
        node.removeAttribute(key);
      }
    } else {
      node.setAttribute(key, String(value));
    }
  }

  const kids = Array.isArray(children) ? children : [children];
  kids.forEach((child) => {
    if (child === null || child === undefined || child === false) return;
    if (typeof child === 'string' || typeof child === 'number') {
      node.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      node.appendChild(child);
    }
  });

  return node;
};
