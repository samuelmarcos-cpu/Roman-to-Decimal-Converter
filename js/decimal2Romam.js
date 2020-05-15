function getRomamNumberSubtracter (letter) {
  const subtracterLetter = findRomamNumberSubtracter(letter)
  const subtracterValue = romamTable[subtracterLetter]
  const value = romamTable[letter]
  return {
    equation: `-${subtracterValue} +${value}`,
    letters: subtracterLetter + letter,
    value: value - subtracterValue
  }
}

function nearestRomanNumberWidthTable (decimal, romamTable) {
  const distancesRomam = []
  let lastDistance
  for (let letter in romamTable) {
    const value = romamTable[letter]
    const distance = Math.abs(decimal - value)
    if (lastDistance < distance) break

    const romamInfo = { letter, value, distance }
    if (distance == 0) {
      return romamInfo
    }
    distancesRomam.push(romamInfo)

    lastDistance = distance
  }

  return distancesRomam.length === 1
    ? distancesRomam[0]
    : distancesRomam.sort((a, b) => a.distance > b.distance)[0]
}

const nearestRomanNumber = decimal =>
  nearestRomanNumberWidthTable(decimal, romamTable)

function nearestRomanNumberLessThan (decimal) {
  const newRomamTable = {}
  for (let letter in romamTable) {
    if (romamTable[letter] <= decimal) {
      newRomamTable[letter] = romamTable[letter]
    }
  }
  return nearestRomanNumberWidthTable(decimal, newRomamTable)
}

function romanConverter (decimal, romam) {
  if (decimal == 0) {
    romam.equation = romam.equation.join(' ')
    romam.value = romam.value.join('')
    return romam
  }

  let nearest = nearestRomanNumber(decimal)
  let result = decimal - nearest.value
  if (result < 0) {
    const subtracter = getRomamNumberSubtracter(nearest.letter)
    result = decimal - subtracter.value

    if (result < 0) {
      nearest = nearestRomanNumberLessThan(decimal)
    } else {
      subtracter.letter = subtracter.letters
      nearest = subtracter
    }
  }

  romam.equation.push(nearest.equation || '+' + nearest.value)
  romam.value.push(nearest.letter)

  let count = 0
  romam.value.every(letter => {
    count++
    return letter == nearest.letter && count < 4
  })
  if (count > 3) return

  return romanConverter(decimal - nearest.value, romam)
}

const decimal2Romam = decimal => {
  if (decimal <= 0) {
    return {
      equation: '0',
      value: ''
    }
  }
  return romanConverter(decimal, {
    equation: [],
    value: []
  })
}
