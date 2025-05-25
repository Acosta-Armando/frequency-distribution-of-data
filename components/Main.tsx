'use client'
import React, { useState } from 'react'
import Container from './common/Container'
import Title from './common/Title'
import Button from './common/Button'
import ValuesGrid from './ValuesGrid'
import {
  calculateMedian,
  calculateModa,
  createGroupedArrays,
  handleKeyPress,
  roundNumber,
} from '@/utils/utils'
import ButtonsTable from './ButtonsTable'
import DirectDataTable from './DirectDataTable'
import GroupedDataTable from './GroupedDataTable'
import { createDirectTable, createGroupedTable } from '@/utils/createTables'
import { DirectDataFrequency, GroupedDataFrequency } from '@/interface'
import pushToast from '@/utils/pushToast'

const Main = () => {
  // input and general values
  const [inputValue, setInputValue] = useState<number | ''>('')
  const [numbersArr, setNumbersArr] = useState<Array<number>>([])
  const [roundedNumbersArr, setRoundedNumbersArr] = useState<Array<number>>([])
  const N = roundedNumbersArr.length
  // direct data results
  const [directDataResults, setDirectDataResults] = useState<Array<DirectDataFrequency>>([])
  const [directDataPromedio, setDirectDataPromedio] = useState<number>(0)
  const [median, setMedian] = useState<number>(0)
  const [moda, setModa] = useState<Array<number>>([])
  const desviacion = directDataResults.reduce((acc, data) => acc + data.fxminProd2!, 0) / N
  // grouped data results
  const [ni, setNi] = useState<number | '' | undefined>('')
  const [nota, setNota] = useState<{ Xi: number; Xs: number }>({
    Xi: 0,
    Xs: 0,
  })
  const [aT, setAT] = useState<number>(0)
  const [i, setI] = useState<number>(0)
  const [groupedDataResults, setGroupedDataResults] = useState<Array<GroupedDataFrequency>>([])
  const viewCreateButtons = directDataResults.length === 0 && groupedDataResults.length === 0

  const otherDirectData = [
    { title: 'Media aritmética (X̅)', value: `${directDataPromedio} pts` },
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
  
  const otherGroupedData = [
    { title: 'Xi', value: `${nota.Xi} pts` },
    { title: 'Xs', value: `${nota.Xs} pts` },
    { title: 'At', value: `${aT} pts` },
    { title: 'i', value: `${i} pts` },
  ]

  const handleInsertValue = () => {
    if (inputValue === '') return
    setNumbersArr((prevArray) => [...prevArray, inputValue])
    setRoundedNumbersArr((prevArray) => [...prevArray, roundNumber(inputValue)])
    setInputValue('')
  }

  const handleChangeNi = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber
    if (isNaN(newValue)) {
      setNi('')
    } else {
      setNi(newValue)
    }
  }

  const handleClear = () => {
    setInputValue('')
    setNumbersArr([])
    setRoundedNumbersArr([])
    setDirectDataResults([])
    setDirectDataPromedio(0)
    setMedian(0)
    setModa([])
    setNi('')
    setNota({ Xi: 0, Xs: 0 })
    setAT(0)
    setI(0)
    setGroupedDataResults([])
  }

  const handleCreateDirectTable = () => {
    createDirectTable(
      roundedNumbersArr,
      setDirectDataResults,
      setDirectDataPromedio
    )
    const newMedian = calculateMedian(roundedNumbersArr)
    setMedian(newMedian)
    const newModa = calculateModa(roundedNumbersArr)
    setModa(newModa)
  }

  const handleCreateGroupedTable = () => {
    if (ni === '' || ni === undefined) {
      pushToast.error('Please insert the interval number')
      return
    }
    const minNumber = Math.min(...roundedNumbersArr)
    const maxNumber = Math.max(...roundedNumbersArr)
    setNota({ Xi: minNumber, Xs: maxNumber })
    const newAT = maxNumber - minNumber + 1
    setAT(newAT)
    const newI = roundNumber(newAT / ni)
    setI(newI)
    const newGroupedArray = createGroupedArrays(minNumber, maxNumber, newI)
    createGroupedTable(
      roundedNumbersArr,
      newGroupedArray,
      setGroupedDataResults
    )
  }

  const handleEraser = () => {
    setNumbersArr((prevArray) => prevArray.slice(0, -1))
    setRoundedNumbersArr((prevArray) => prevArray.slice(0, -1))
  }

  return (
    <Container className='py-5 flex flex-col gap-8 h-full'>
      {/* insert numbers section */}
      {viewCreateButtons && (
        <section className='w-full flex flex-col gap-2'>
          <Title title='Insert numbers here:' />
          <div className='flex flex-col md:flex-row gap-2'>
            <div className='flex flex-col md:flex-row gap-2'>
              <input
                type='number'
                className='bg-white text-black rounded-xl px-4 h-9 outline-0'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.valueAsNumber)}
                onKeyDown={(e) => handleKeyPress(e, handleInsertValue)}
              />
              <Button
                type={'button'}
                onClick={handleInsertValue}
                className='w-full md:w-fit'
              >
                Insert
              </Button>
            </div>
            {roundedNumbersArr.length > 0 && (
              <Button
                type={'reset'}
                onClick={handleEraser}
                className='w-full md:w-fit'
              >
                Eraser
              </Button>
            )}
          </div>
        </section>
      )}
      {groupedDataResults.length === 0 && (
        <section className='w-full flex flex-col gap-2'>
          <Title title='Insert interval number here:' />
          <div className='flex flex-col md:flex-row gap-2'>
            <input
              type='number'
              className='bg-white text-black rounded-xl px-4 h-9 outline-0'
              value={ni}
              onChange={handleChangeNi}
            />
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
          handleCreateDirectTable={handleCreateDirectTable}
          handleCreateGroupedTable={handleCreateGroupedTable}
          handleClear={handleClear}
          directDataResults={directDataResults}
          groupedDataResults={groupedDataResults}
        />
      )}
      {/* frequency table */}
      {directDataResults.length > 0 && (
        <>
          <section className='flex flex-col gap-2'>
            <Title title='Direct Data Table' />
            <div>
              {otherDirectData.map((data, idx) => (
                <h2 key={idx} className='text-semibold text-lg md:text-xl'>
                  {data.title}: {data.value}
                </h2>
              ))}
            </div>
          </section>
          <DirectDataTable tableData={directDataResults} />
        </>
      )}
      {groupedDataResults.length > 0 && (
        <>
          <section className='flex flex-col gap-2'>
            <Title title='Grouped Data Table' />
            <div>
              {otherGroupedData.map((data, idx) => (
                <h2 key={idx} className='text-semibold text-lg md:text-xl'>
                  {data.title}: {data.value}
                </h2>
              ))}
            </div>
          </section>
          <GroupedDataTable tableData={groupedDataResults} />
        </>
      )}
    </Container>
  )
}

export default Main
