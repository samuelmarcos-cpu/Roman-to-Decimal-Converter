function nearestRomanNumberWidthTable (decimal, romamTable) {
  const distancesRomam = []
  let lastDistance
  for (let letter in romamTable) {
    const value = romamTable[letter]
    const distance = Math.abs(decimal - value)
    if (lastDistance < distance) break

    const romamInfo = { letter, value, distance }
    if (distance === 0) {
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

let x = 0
function romamSeparator (decimal, romam) {
  if (decimal === 0) {
    romam.equation = romam.equation.join(' ')
    romam.total = romam.total.join('')
    return romam
  }

  let nearest = nearestRomanNumber(decimal)
  let result = decimal - nearest.value
  if (result < 0) {
    const lessThan = nearestRomanNumberLessThan(Math.abs(result))
    result += lessThan.value

    if (result < 0) {
      // console.log('LESS THAN')
      nearest = nearestRomanNumberLessThan(decimal)
    } else {
      nearest.equation = `-${lessThan.value} +${nearest.value}`
      nearest.letter = lessThan.letter + nearest.letter
      nearest.value -= lessThan.value
      delete nearest.distance
    }

    // console.log('RESULT', result)
    // console.log('NEAREST', nearest)
  }
  // console.log('RESULT', result)
  // console.log('NEAREST', nearest)
  // if (x >= 3) return nearest

  romam.equation.push(nearest.equation || '+' + nearest.value)
  romam.total.push(nearest.letter)
  x++
  return romamSeparator(decimal - nearest.value, romam)
}

// mudar total para value
const decimal2Romam = decimal => {
  if (decimal == undefined || decimal == false)
    return {
      equation: '',
      total: 0
    }
  x = 0
  return romamSeparator(decimal, {
    equation: [],
    total: []
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
  { value: 3000, result: 'MMM' }
]

function decimal2RomamTest (arrayTest) {
  arrayTest.forEach(({ value, result }, index) => {
    const { total } = decimal2Romam(value)
    console.log(`${index + 1}) ${value} => ${result} | ${total}`)
  })
}
