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

const decimal2RomamArrayTest = [
  { value: 1, result: 'I' },
  { value: 2, result: 'II' },
  { value: 3, result: 'III' },
  { value: 4, result: 'IV' },
  { value: 5, result: 'V' },
  { value: 6, result: 'VI' },
  { value: 7, result: 'VII' },
  { value: 8, result: 'VIII' },
  { value: 9, result: 'IX' },
  { value: 10, result: 'X' },
  { value: 15, result: 'XV' },
  { value: 20, result: 'XX' },
  { value: 30, result: 'XXX' },
  { value: 50, result: 'L' },
  { value: 100, result: 'C' },
  { value: 150, result: 'CL' },
  { value: 500, result: 'D' },
  { value: 1000, result: 'M' },
  { value: 1500, result: 'MD' },
  { value: 3000, result: 'MMM' },
  { value: 1998, result: 'MCMXCVIII' },
  { value: 3838, result: 'MMMDCCCXXXVIII' },
  { value: 3999, result: 'MMMCMXCIX' }
]

function decimal2RomamTest (arrayTest) {
  arrayTest.every(({ value, result }, index) => {
    const { total } = decimal2Romam(value)
    const passed = result == total
    console.log(`${index + 1}) ! ${passed} ! ${total} => ${result} | ${total}`)
    return passed
  })
}
