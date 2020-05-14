buttonFactory({
  name: 'digit',
  click () {
    const display = parentGetElementById(this, this.getAttribute('display'))
    display.setAttribute(
      'value',
      display.getAttribute('value') + this.innerHTML
    )
  }
})
