export const handleKeyPress = (
  e: React.KeyboardEvent<HTMLInputElement>,
  func: () => void
) => {
  if (e.key === 'Enter') {
    func()
  }
}

export const roundNumber = (num: number) => {
  const integerPart = Math.floor(num)
  const decimalPart = num - integerPart
  if (decimalPart > 0.59) {
    return integerPart + 1
  } else if (decimalPart < 0.5) {
    return integerPart
  } else {
    if (integerPart % 2 === 0) {
      return integerPart
    } else {
      return integerPart + 1
    }
  }
}

export const calculateMedian = (arr: Array<number>): number => {
  const sortedArr = [...arr].sort((a, b) => a - b) // Ordenar el array de menor a mayor
  const length = sortedArr.length

  if (length === 0) return 0 // Manejar el caso de un array vacío

  if (length % 2 === 1) {
    // Si la cantidad de números es impar
    return sortedArr[Math.floor(length / 2)]
  } else {
    // Si la cantidad de números es par
    const mid1 = sortedArr[length / 2 - 1]
    const mid2 = sortedArr[length / 2]
    return (mid1 + mid2) / 2 // Promedio de los dos valores centrales
  }
}

export const calculateModa = (arr: Array<number>) => {
  const frequencyMap = new Map()

  // Contar la frecuencia de cada número
  arr.forEach((num) => {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1)
  })

  // Encontrar la frecuencia máxima
  let maxFrequency = 0
  frequencyMap.forEach((freq) => {
    if (freq > maxFrequency) {
      maxFrequency = freq
    }
  })

  // Recoger todos los números que tienen la frecuencia máxima
  const mostFrequentNumbers: Array<number> = []
  frequencyMap.forEach((freq, num) => {
    if (freq === maxFrequency) {
      mostFrequentNumbers.push(num)
    }
  })

  return mostFrequentNumbers
}

export const createGroupedArrays = (
  minNumber: number,
  maxNumber: number,
  newI: number,
) => {
  // Crear los intervalos
  const intervals = []
  let start = minNumber
  while (start <= maxNumber) {
    const end = start + newI - 1 // -1 para incluir el límite superior en el intervalo
    intervals.push([start, end])
    start = end + 1 // El siguiente intervalo comienza justo después del límite superior
  }

  // Asegurarse de que el último intervalo incluya el maxNumber
  if (intervals[intervals.length - 1][1] < maxNumber) {
    intervals[intervals.length - 1][1] = maxNumber
  }
  return intervals
}
