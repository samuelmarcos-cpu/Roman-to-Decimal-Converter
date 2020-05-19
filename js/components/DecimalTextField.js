customElements.define(
  'x-decimal-text-field',
  class DecimalTextField extends TextField {
    handler (decimal) {
      return decimal2Romam(decimal)
    }
  }
)
