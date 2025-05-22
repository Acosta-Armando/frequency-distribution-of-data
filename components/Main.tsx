'use client'
import React, { useState } from 'react'
import Container from './common/Container'
import Title from './common/Title'
import Button from './common/Button'
import ValuesGrid from './ValuesGrid'
import FrequencyTable from './FrequencyTable'
import {
  calculateMedian,
  calculateModa,
  createTable,
  roundNumber,
} from '@/utils/utils'
import ButtonsTable from './ButtonsTable'

export interface NumberFrequency {
  X: number
  f: number
  F?: number
  h?: number
  p?: number
  H?: number
  P?: number
  fxX?: number
  XminProd?: number
  XminProd2?: number
  fxminProd2?: number
}

const Main = () => {
  const [numbersArr, setNumbersArr] = useState<Array<number>>([])
  const [roundedNumbersArr, setRoundedNumbersArr] = useState<Array<number>>([])
  const [numbers, setNumbers] = useState<number | ''>('')
  const [results, setResults] = useState<Array<NumberFrequency>>([])
  const [promedio, setPromedio] = useState<number>(0)
  const [median, setMedian] = useState<number>(0)
  const [moda, setModa] = useState<Array<number>>([])
  const desviacion =
    results.reduce((acc, data) => acc + data.fxminProd2!, 0) /
    roundedNumbersArr.length
  const N = roundedNumbersArr.length
  const tableHead = [
    'n',
    'X',
    'f',
    'F',
    'h',
    'p',
    'H',
    'P',
    'f . X',
    'X - X̅',
    '(X - X̅)²',
    'f (X - X̅)²',
    '',
  ]
  const otherData = [
    { title: 'Media aritmética (X̅)', value: `${promedio} pts` },
    { title: 'Mediana (md)', value: `${median} pts` },
    {
      title: 'Moda (X₀)',
      value: moda.map((value) => `${value} pts`).join(', '),
    },
    {
      title: 'Desviacion tipica (S)',
      value: `${Math.sqrt(desviacion).toFixed(2)} pts`,
    },
  ]

  const handleOnClick = () => {
    if (numbers === '') return
    setNumbersArr((prevArray) => [...prevArray, numbers])
    const roundedNumber = roundNumber(numbers)
    setRoundedNumbersArr((prevArray) => [...prevArray, roundedNumber])
    setNumbers('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOnClick()
    }
  }

  const handleCreateTable = () => {
    createTable(roundedNumbersArr, N, setResults, setPromedio)
    const median = calculateMedian(roundedNumbersArr)
    setMedian(median)
    const newModa = calculateModa(roundedNumbersArr)
    setModa(newModa)
  }

  const handleClear = () => {
    setNumbersArr([])
    setRoundedNumbersArr([])
    setNumbers('')
    setResults([])
  }

  const handleEraser = () => {
    setNumbersArr((prevArray) => prevArray.slice(0, -1))
    setRoundedNumbersArr((prevArray) => prevArray.slice(0, -1))
  }

  return (
    <Container className='py-5 flex flex-col gap-8'>
      {/* insert numbers section */}
      {results.length === 0 && (
        <section className='w-full flex flex-col gap-2'>
          <Title title='Insert numbers here:' />
          <div className='flex flex-col md:flex-row gap-2'>
            <div className='flex flex-col md:flex-row gap-2'>
              <input
                type='number'
                className='bg-white text-black rounded-xl px-4 h-9 outline-0'
                value={numbers}
                onChange={(e) => setNumbers(e.target.valueAsNumber)}
                onKeyDown={handleKeyPress}
              />
              <Button
                type={'button'}
                onClick={handleOnClick}
                className='w-full md:w-fit'
              >
                Insert
              </Button>
            </div>
            {roundedNumbersArr.length > 0 && (
              <>
                {results.length === 0 && (
                  <Button
                    type={'reset'}
                    onClick={handleEraser}
                    className='w-full md:w-fit'
                  >
                    Eraser
                  </Button>
                )}
                <ButtonsTable
                  handleClear={handleClear}
                  handleCreateTable={handleCreateTable}
                  className='hidden md:flex'
                  results={results}
                />
              </>
            )}
          </div>
        </section>
      )}

      {/* frequency distribution section */}
      {roundedNumbersArr.length > 0 && (
        <section className='w-full flex flex-col md:flex-row gap-8'>
          <ValuesGrid title='Values inserted' numbersArray={numbersArr} />
          <ValuesGrid title='Rounded values' numbersArray={roundedNumbersArr} />
        </section>
      )}

      {/* create table button */}
      {roundedNumbersArr.length > 0 && (
        <ButtonsTable
          handleClear={handleClear}
          handleCreateTable={handleCreateTable}
          className='flex md:hidden'
          results={results}
        />
      )}

      {/* frequency table */}
      {results.length > 0 && (
        <>
          <Button
            type={'reset'}
            onClick={handleClear}
            className='w-fit hidden md:flex'
          >
            Clear
          </Button>
          <section className='flex flex-col gap-2'>
            <Title title='Data Table' />
            <div>
              {otherData.map((data, idx) => (
                <h2 key={idx} className='text-semibold text-lg md:text-xl'>
                  {data.title}: {data.value}
                </h2>
              ))}
            </div>
          </section>
          <FrequencyTable tableHead={tableHead} tableData={results} />
        </>
      )}
    </Container>
  )
}

export default Main
