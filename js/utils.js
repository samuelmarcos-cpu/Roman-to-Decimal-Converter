function createLinkStyle (href) {
  const linkStyle = document.createElement('link')
  linkStyle.setAttribute('rel', 'stylesheet')
  linkStyle.setAttribute('href', href)
  return linkStyle
}

function parentGetElementById (el, id) {
  const parentChildren = el.parentElement.children
  return Object.values(parentChildren).find(children => children.id === id)
}
