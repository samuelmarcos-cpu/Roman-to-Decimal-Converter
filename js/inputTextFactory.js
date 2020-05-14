function inputTextFactory (handler) {
  return class extends HTMLElement {
    _template = `
    <div class="pure-form">
      <input 
      type="text"
      id="display"
      class="pure-u-1"
      readonly
      ></input>
    </div>
    `

    static get observedAttributes () {
      return ['value']
    }

    get value () {
      return this._value
    }

    set value (decimal) {
      this._value = decimal
      this.display.value = decimal

      if (this.display == undefined || this.result == undefined) return

      const { total, equation } = handler(decimal)
      this.result.value = total
      this.equation.value = equation
    }

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = this._template

      this.display = this.shadowRoot.getElementById('display')
      this.result = document.getElementById(this.getAttribute('result'))
      this.equation = document.getElementById(this.getAttribute('equation'))

      this.value = this.getAttribute('value')

      this.addStyle()
    }

    addStyle () {
      const styles = document.getElementsByTagName('link')
      for (let i = 0; i < styles.length; i++) {
        this.shadowRoot.appendChild(styles[i].cloneNode(true))
      }
    }

    attributeChangedCallback (name, _, newValue) {
      this[name] = newValue
    }
  }
}
