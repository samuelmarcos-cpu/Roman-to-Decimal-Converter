function buttonFactory ({ name, classes, click }) {
  classes = classes && classes.join(' ')

  customElements.define(
    `x-${name}-button`,
    class extends HTMLElement {
      get _template () {
        return `
        <button id="button" class="pure-button pure-u-1 ${name} ${classes} ">${this.innerHTML}</button>
      `
      }

      constructor () {
        super()

        this.attachShadow({ mode: 'open' })
        this.render()
      }

      render () {
        this.shadowRoot.innerHTML = this._template
        this.addEventListener('click', click)
        this.addStyle()
      }

      addStyle () {
        const styles = document.getElementsByTagName('link')
        for (let i = 0; i < styles.length; i++) {
          this.shadowRoot.appendChild(styles[i].cloneNode(true))
        }
      }
    }
  )
}
