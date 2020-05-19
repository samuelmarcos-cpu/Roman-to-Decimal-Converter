customElements.define(
  'x-toggle-button',
  class Toggle extends Button {
    _name = 'toggle'

    click () {
      this.toggle = this.toggle == false

      const elTrue = parentGetElementById(this, this.getAttribute(true))
      elTrue.style.display = this.toggle == false ? 'none' : ''

      const elFalse = parentGetElementById(this, this.getAttribute(false))
      elFalse.style.display = this.toggle ? 'none' : ''

      this.innerHTML = this.toggle
        ? this.getAttribute('show')
        : this.getAttribute('hide')
      this.render()
    }
  }
)
