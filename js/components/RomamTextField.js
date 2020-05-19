customElements.define(
  'x-romam-text-field',
  class RomamTextField extends TextField {
    handler (decimal) {
      return romam2Decimal(decimal)
    }
  }
)
