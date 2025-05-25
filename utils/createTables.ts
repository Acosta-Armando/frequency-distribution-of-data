import { DirectDataFrequency, GroupedDataFrequency } from '@/interface'
import { roundNumber } from './utils'

export const createDirectTable = (
  roundedNumbersArr: Array<number>,
  setResults: (value: Array<DirectDataFrequency>) => void,
  setPromedio: (value: number) => void
) => {
  const N = roundedNumbersArr.length
  // Contar las ocurrencias de cada número
  const frequencyMap: { [key: number]: number } = {}
  roundedNumbersArr.forEach((num) => {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1
  })
  // Crear un array de números únicos
  const uniqueNumbers = Object.keys(frequencyMap).map(Number)
  // Crear el nuevo array de objetos
  const resultArray: DirectDataFrequency[] = uniqueNumbers.map((num) => ({
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
    item.h = (item.f / N)
    item.p = (item.h * 100)
    item.H = (item.F / N)
    item.P = (item.H * 100)
    item.fxX = item.f * item.X
  })

  const totalfxX = resultArray.reduce((acc, data) => acc + data.fxX!, 0)
  const promedio = roundNumber(totalfxX / N)
  setPromedio(promedio)

  resultArray.forEach((item) => {
    cumulativeF += item.f
    item.XminProd = item.X - promedio
    item.XminProd2 = item.XminProd * item.XminProd
    item.fxminProd2 = item.f * item.XminProd2
  })
  setResults(resultArray)
}

export const createGroupedTable = (
  roundedNumbersArr: Array<number>,
  groupedArray: Array<number[]>,
  setResults: (value: Array<GroupedDataFrequency>) => void
) => {
  const results: GroupedDataFrequency[] = []
  const N = roundedNumbersArr.length // Total de grupos
  let cumulativeF = 0
  groupedArray.forEach((interval) => {
    const [lowerBound, upperBound] = interval
    // Calcular XiXs
    const XiXs = interval
    // Calcular LiLs
    const LiLs = [lowerBound - 0.5, upperBound + 0.5]
    // Calcular f
    const f = roundedNumbersArr.filter(
      (num) => num >= lowerBound && num <= upperBound
    ).length
    // Calcular F
    cumulativeF += f
    const F = cumulativeF
    // Calcular h, p, H, P
    const h = N > 0 ? (f / N) : 0
    const p = (h * 100)
    const H = N > 0 ? (F / N) : 0
    const P = (H * 100)
    // Agregar el objeto al resultado
    results.push({
      XiXs,
      LiLs,
      f,
      F,
      h,
      p,
      H,
      P,
    })
  })
  setResults(results)
}
