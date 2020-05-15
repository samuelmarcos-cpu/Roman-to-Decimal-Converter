function validateRomamNumber (romam) {
  const romamLetters = [...romam]
  const countLetter = {}

  return romamLetters.every((letter, index) => {
    if (countLetter[letter]) {
      countLetter[letter]++
      if (countLetter[letter] > 3) {
        return false
      }
    } else {
      countLetter[letter] = 1
    }

    const lastLetter = romamLetters[index - 1]
    const lastValue = romamTable[lastLetter]
    if (lastValue < romamTable[letter]) {
      const subtracter = findRomamNumberSubtracter(letter)
      if (lastLetter != subtracter) return false

      const penultimateLetter = romamLetters[index - 2]
      const penultimateValue = romamTable[penultimateLetter]

      if (penultimateValue <= lastValue) return false
    }

    return true
  })
}

function romam2Decimal (romam) {
  if (validateRomamNumber(romam) == false) return

  const romamLetters = [...romam]
  const romamValues = []
  romamLetters.forEach(romam => {
    romamValues.push(romamTable[romam])
  })

  romamValues.reverse()
  const result = romamValues.reduce(
    (sum, value) => {
      if (value < sum.lastValue) {
        sum.value -= value
        sum.equation.unshift('-' + value)
      } else {
        sum.value += value
        sum.equation.unshift('+' + value)
      }

      sum.lastValue = value
      return sum
    },
    {
      value: 0,
      equation: [],
      lastValue: undefined
    }
  )
  delete result.lastValue
  result.equation = result.equation.join(' ')

  return result
}
