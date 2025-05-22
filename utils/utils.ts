import { NumberFrequency } from '@/components/Main'

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

export const createTable = (
  roundedNumbersArr: Array<number>,
  N: number,
  setResults: (value: Array<NumberFrequency>) => void,
  setPromedio: (value: number) => void,
) => {
  // Contar las ocurrencias de cada número
  const frequencyMap: { [key: number]: number } = {}
  roundedNumbersArr.forEach((num) => {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1
  })
  // Crear un array de números únicos
  const uniqueNumbers = Object.keys(frequencyMap).map(Number)
  // Crear el nuevo array de objetos
  const resultArray: NumberFrequency[] = uniqueNumbers.map((num) => ({
    X: num,
    f: frequencyMap[num],
  }))
  // Ordenar de menor a mayor
  resultArray.sort((a, b) => a.X - b.X)
  // Calcular la propiedad F
  let cumulativeF = 0
  resultArray.forEach((item) => {
    cumulativeF += item.f
    item.F = cumulativeF // Ahora F es reconocida
  })
  // Agregar números faltantes con f = 0 dentro del rango
  const minNumber = Math.min(...uniqueNumbers)
  const maxNumber = Math.max(...uniqueNumbers)
  for (let i = minNumber; i <= maxNumber; i++) {
    if (!frequencyMap[i]) {
      resultArray.push({ X: i, f: 0, F: cumulativeF }) // Mantener el valor anterior de F
    }
  }
  // Ordenar nuevamente después de agregar números faltantes
  resultArray.sort((a, b) => a.X - b.X)
  // Actualizar F y calcular h, p, H, P para los números
  cumulativeF = 0 // Reiniciar cumulativeF para calcular correctamente
  resultArray.forEach((item) => {
    cumulativeF += item.f
    item.F = cumulativeF // Actualizar F
    item.h = parseFloat((item.f / N).toFixed(2))
    item.p = parseFloat((item.h * 100).toFixed(2))
    item.H = parseFloat((item.F / N).toFixed(2))
    item.P = parseFloat((item.H * 100).toFixed(2))
    item.fxX = item.f * item.X
  })

  const totalfxX = resultArray.reduce((acc, data) => acc + data.fxX!, 0)
  const promedio = roundNumber(totalfxX / roundedNumbersArr.length)
  setPromedio(promedio)

  resultArray.forEach((item) => {
    cumulativeF += item.f
    item.XminProd = item.X - promedio
    item.XminProd2 = item.XminProd * item.XminProd
    item.fxminProd2 = item.f * item.XminProd2
  })
  setResults(resultArray)
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
