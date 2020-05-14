buttonFactory({
  name: 'backspace',
  classes: ['pure-slim-button'],
  click () {
    const id = this.getAttribute('input-text')
    const inputText = parentGetElementById(this, id)
    inputText.setAttribute(
      'value',
      inputText.getAttribute('value').slice(0, -1)
    )
  }
})
