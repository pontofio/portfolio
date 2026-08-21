/**
 * DOM helpers.
 * Single responsibility: create elements safely. No knowledge of content
 * shape or app behaviour lives here.
 */
window.Portfolio = window.Portfolio || {};

window.Portfolio.el = function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') {
      node.className = value;
    } else if (key === 'html') {
      node.innerHTML = value;
    } else if (key.startsWith('data-')) {
      node.setAttribute(key, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      node.setAttribute(key, value);
    }
  }

  const kids = Array.isArray(children) ? children : [children];
  kids.filter(Boolean).forEach((child) => {
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  });

  return node;
};
