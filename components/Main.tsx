'use client'
import React, { useEffect, useState } from 'react'
import Container from './ui/Container'
import Title from './ui/Title'
import Button from './ui/Button'
import ValuesGrid from './ValuesGrid'
import {
  calculateMedian,
  calculateModa,
  createGroupedArrays,
  handleCalculateLiFi,
  handleKeyPress,
  roundNumber,
} from '@/utils/utils'
import ButtonsTable from './ButtonsTable'
import DirectDataTable from './DirectDataTable'
import GroupedDataTable from './GroupedDataTable'
import { createDirectTable, createGroupedTable } from '@/utils/createTables'
import { DirectDataFrequency, GroupedDataFrequency } from '@/interface'
import pushToast from '@/utils/pushToast'
import { work1, work2 } from '@/utils/work'

/**
 * Main component for the frequency distribution application.
 * Manages user input, data processing, and rendering of direct and grouped frequency tables.
 */
const Main = () => {
  const isWork = true
  const workHome = work2
  let round = []
  for (let work in workHome) {
    round.push(roundNumber(workHome[work]))
  }
  const initialNumbersArr = isWork ? workHome : []
  const initialRound = isWork ? round : []

  // State variables for input and general data management
  const [inputValue, setInputValue] = useState<number | ''>('')
  const [numbersArr, setNumbersArr] = useState<Array<number>>(initialNumbersArr)
  const [roundedNumbersArr, setRoundedNumbersArr] = useState<Array<number>>(initialRound)
  const N = roundedNumbersArr.length

  // State variables for direct data results
  const [directDataResults, setDirectDataResults] = useState<Array<DirectDataFrequency>>([])
  const [directDataPromedio, setDirectDataPromedio] = useState<number>(0)
  const [directMedian, setDirectMedian] = useState<number>(0)
  const [directModa, setDirectModa] = useState<Array<number>>([])
  const directDeviation = directDataResults.reduce((acc, data) => acc + (data.fxminProd2 || 0), 0) / N

  // State variables for grouped data results
  const [ni, setNi] = useState<number | '' | undefined>('')
  const [nota, setNota] = useState<{ Xi: number, Xs: number }>({ Xi: 0, Xs: 0 })
  const [aT, setAT] = useState<number>(0)
  const [i, setI] = useState<number>(0)
  const [groupedDataResults, setGroupedDataResults] = useState<Array<GroupedDataFrequency>>([])
  const [groupedDataPromedio, setGroupedDataPromedio] = useState<number>(0)

  // Variables for grouped data median calculation
  const N2 = N / 2 // N/2 for median formula
  const [li, setLi] = useState<number | null>(null)
  const [fi, setFi] = useState<number | null>(null)
  const [f, setF] = useState<number | null>(null)

  const groupedMedian = (li !== null && fi !== null && f !== null && i !== 0) ? (li + ((N2 - fi) / f) * i) : 0
  const groupedDeviation = groupedDataResults.reduce((acc, data) => acc + (data.fXmminProd2 || 0), 0) / N
  const viewCreateButtons = directDataResults.length === 0 && groupedDataResults.length === 0

  // Data for displaying other direct data statistics
  const otherDirectData = [
    { title: 'Arithmetic Mean (X̅)', value: `${directDataPromedio} pts` },
    { title: 'Median (md)', value: `${directMedian} pts` },
    {
      title: 'Mode (X₀)',
      value: directModa.map((value) => `${value} pts`).join(', '),
    },
    {
      title: 'Standard Deviation (S)',
      value: `${Math.sqrt(directDeviation).toFixed(2)} pts`,
    },
  ]

  // Data for displaying other grouped data statistics
  const otherGroupedData = [
    { title: 'ni', value: `${ni}` },
    { title: 'Xi', value: `${nota.Xi} pts` },
    { title: 'Xs', value: `${nota.Xs} pts` },
    { title: 'At', value: `${aT} pts` },
    { title: 'i', value: `${i} pts` },
    { title: '', value: `` }, // Placeholder for spacing
    { title: 'Arithmetic Mean (X̅)', value: `${groupedDataPromedio} pts` },
    { title: 'Median (md)', value: `${groupedMedian.toFixed(2)} pts` },
    { title: 'fm', value: `${12} participants` },
    // { title: 'Mode (X₀1)', value: `${11.05} pts` },
    // { title: 'Mode (X₀2)', value: `${37.94} pts` },
    {
      title: 'Standard Deviation (S)',
      value: `${Math.sqrt(groupedDeviation).toFixed(2)} pts`,
    },
  ]

  /**
   * Handles inserting a new number into the arrays.
   * Validates input and adds both original and rounded values to state.
   */
  const handleInsertValue = () => {
    if (inputValue === '' || isNaN(inputValue)) {
      pushToast.error('Please insert a valid number')
      return
    }
    setNumbersArr((prevArray) => [...prevArray, inputValue])
    setRoundedNumbersArr((prevArray) => [...prevArray, roundNumber(inputValue)])
    setInputValue('') // Clear the input field
  }

  /**
   * Handles changes to the interval number input for grouped data.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChangeNi = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber
    if (isNaN(newValue)) {
      setNi('')
    } else {
      setNi(newValue)
    }
  }


  // Clears all data and resets the application to its initial state.
  const handleClear = () => {
    setInputValue('')
    setNumbersArr([])
    setRoundedNumbersArr([])
    setDirectDataResults([])
    setDirectDataPromedio(0)
    setDirectMedian(0)
    setDirectModa([])
    setNi('')
    setNota({ Xi: 0, Xs: 0 })
    setAT(0)
    setI(0)
    setGroupedDataResults([])
    setLi(null)
    setFi(null)
    setF(null)
  }

  /**
   * Creates and populates the direct frequency distribution table.
   * Also calculates and sets the median and mode for direct data.
   */
  const handleCreateDirectTable = () => {
    createDirectTable(
      roundedNumbersArr,
      setDirectDataResults,
      setDirectDataPromedio
    )
    const newMedian = calculateMedian(roundedNumbersArr)
    setDirectMedian(newMedian)
    const newModa = calculateModa(roundedNumbersArr)
    setDirectModa(newModa)
  }

  /**
   * Creates and populates the grouped frequency distribution table.
   * Requires the 'ni' (number of intervals) to be set.
   */
  const handleCreateGroupedTable = () => {
    if (ni === '' || ni === undefined || isNaN(ni)) {
      pushToast.error('Please insert the interval number (ni)')
      return
    }
    if (ni > N) {
      pushToast.error('Interval number (ni) cannot be greater than the number of data points')
      return
    }
    const minNumber = Math.min(...roundedNumbersArr)
    const maxNumber = Math.max(...roundedNumbersArr)
    setNota({ Xi: minNumber, Xs: maxNumber })
    const newAT = maxNumber - minNumber + 1 // Calculate Amplitude Total
    setAT(newAT)
    const newI = roundNumber(newAT / ni) // Calculate Class Width (i)
    setI(newI)
    const newGroupedArray = createGroupedArrays(minNumber, maxNumber, newI) // Create intervals
    createGroupedTable(
      roundedNumbersArr,
      newGroupedArray,
      setGroupedDataResults,
      setGroupedDataPromedio
    )

  }

  /**
   * Effect hook to recalculate Li, Fi, and F whenever groupedDataResults changes.
   * These values are essential for the grouped median calculation.
   */
  useEffect(() => {
    handleCalculateLiFi(
      groupedDataResults,
      N2, // N/2, used in median formula
      setLi,
      setFi,
      setF
    )
  }, [groupedDataResults, N2]) // Dependencies: groupedDataResults and N2

  /**
   * Removes the last entered number from both the original and rounded number arrays.
   */
  const handleEraser = () => {
    if (numbersArr.length > 0) {
      setNumbersArr((prevArray) => prevArray.slice(0, -1))
      setRoundedNumbersArr((prevArray) => prevArray.slice(0, -1))
    }
  }

  return (
    <Container className='py-5 flex flex-col gap-8 h-full'>
      {/* Input section for numbers */}
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

      {/* Input section for interval number (ni) for grouped data */}
      {groupedDataResults.length === 0 && (
        <section className='w-full flex flex-col gap-2'>
          <Title title='Insert interval number (ni) here:' />
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

      {/* Display inserted and rounded values */}
      {roundedNumbersArr.length > 0 && (
        <section className='w-full flex flex-col md:flex-row gap-8'>
          <ValuesGrid title='Values inserted' numbersArray={numbersArr} />
          <ValuesGrid title='Rounded values' numbersArray={roundedNumbersArr} />
        </section>
      )}

      {/* Buttons to create frequency tables and clear data */}
      {roundedNumbersArr.length > 0 && (
        <ButtonsTable
          handleCreateDirectTable={handleCreateDirectTable}
          handleCreateGroupedTable={handleCreateGroupedTable}
          handleClear={handleClear}
          directDataResults={directDataResults}
          groupedDataResults={groupedDataResults}
        />
      )}

      {/* Display Direct Data Table and its statistics */}
      {directDataResults.length > 0 && (
        <>
          <section className='flex flex-col gap-2 border-t pt-2'>
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

      {/* Display Grouped Data Table and its statistics */}
      {groupedDataResults.length > 0 && (
        <>
          <section className='flex flex-col gap-2 border-t pt-2'>
            <Title title='Grouped Data Table' />
            <div>
              {otherGroupedData.map((data, idx) => (
                <h2 key={idx} className='text-semibold text-lg md:text-xl'>
                  {data.title}
                  {data.title !== '' ? ': ' : <br />} {data.value}
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
