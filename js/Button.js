class Button extends HTMLElement {
  _name = ''
  _classes = []

  get classes () {
    this._classes.join(' ')
  }

  get _template () {
    return `
        <button id="button" class="pure-button pure-u-1 ${this._name} ${this.classes} ">${this.innerHTML}</button>
      `
  }

  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render () {
    this.shadowRoot.innerHTML = this._template
    this.addEventListener('click', this.click)
    this.addStyle()
  }

  addStyle () {
    const styles = document.getElementsByTagName('link')
    for (let i = 0; i < styles.length; i++) {
      this.shadowRoot.appendChild(styles[i].cloneNode(true))
    }
  }

  click () {}
}
