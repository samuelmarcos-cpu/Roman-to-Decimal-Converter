romamTable = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
}

function romam2Decimal (romam) {
  romamLetters = [...romam]
  romamValues = []
  romamLetters.forEach(romam => {
    romamValues.push(romamTable[romam])
  })

  romamValues.reverse()
  const result = romamValues.reduce(
    (sum, value) => {
      if (value < sum.lastValue) {
        sum.total -= value
        sum.equation.unshift('-' + value)
      } else {
        sum.total += value
        sum.equation.unshift('+' + value)
      }
      sum.lastValue = value
      return sum
    },
    {
      total: 0,
      equation: [],
      lastValue: undefined
    }
  )
  delete result.lastValue
  result.equation = result.equation.join(' ')

  return result
}
