const romamTable = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
}

function findRomamNumberSubtracter (letter) {
  const romamLetters = Object.keys(romamTable)

  let indexLetter = romamLetters.findIndex(
    romamLetter => romamLetter === letter
  )

  const indexSubtracter = indexLetter - ((indexLetter + 1) % 2) - 1
  return romamLetters[indexSubtracter]
}
