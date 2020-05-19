customElements.define(
  'x-digit-button',
  class Digit extends Button {
    _name = 'digit'

    click () {
      const display = parentGetElementById(this, this.getAttribute('display'))
      display.setAttribute(
        'value',
        display.getAttribute('value') + this.innerHTML
      )
    }
  }
)
