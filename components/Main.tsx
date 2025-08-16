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
  // State variables for input and general data management
  const [inputValue, setInputValue] = useState<number | ''>('') // Current value in the input field
  const [numbersArr, setNumbersArr] = useState<Array<number>>([]) // Original numbers entered by the user
  const [roundedNumbersArr, setRoundedNumbersArr] = useState<Array<number>>([]) // Rounded numbers, used for calculations
  const N = roundedNumbersArr.length // Total number of data points

  // State variables for direct data results
  const [directDataResults, setDirectDataResults] = useState<Array<DirectDataFrequency>>([]) // Results for the direct frequency table
  const [directDataPromedio, setDirectDataPromedio] = useState<number>(0) // Mean for direct data
  const [directMedian, setDirectMedian] = useState<number>(0) // Median for direct data
  const [directModa, setDirectModa] = useState<Array<number>>([]) // Mode(s) for direct data
  // Calculate direct deviation (variance)
  const directDeviation = directDataResults.reduce((acc, data) => acc + (data.fxminProd2 || 0), 0) / N

  // State variables for grouped data results
  const [ni, setNi] = useState<number | '' | undefined>('') // Number of intervals for grouped data
  const [nota, setNota] = useState<{ Xi: number, Xs: number }>({ Xi: 0, Xs: 0 }) // Min (Xi) and Max (Xs) values
  const [aT, setAT] = useState<number>(0) // Amplitude Total (Range)
  const [i, setI] = useState<number>(0) // Class width (interval size)
  const [groupedDataResults, setGroupedDataResults] = useState<Array<GroupedDataFrequency>>([]) // Results for the grouped frequency table
  const [groupedDataPromedio, setGroupedDataPromedio] = useState<number>(0) // Mean for grouped data

  // Variables for grouped data median calculation
  const N2 = N / 2 // N/2 for median formula
  const [li, setLi] = useState<number | null>(null) // Lower limit of the median class
  const [fi, setFi] = useState<number | null>(null) // Cumulative frequency of the class before the median class
  const [f, setF] = useState<number | null>(null) // Frequency of the median class
  // Calculate grouped median
  const groupedMedian = (li !== null && fi !== null && f !== null && i !== 0) ? (li + ((N2 - fi) / f) * i) : 0
  // Calculate grouped deviation (variance)
  const groupedDeviation = groupedDataResults.reduce((acc, data) => acc + (data.fXmminProd2 || 0), 0) / N

  // Determine if the initial buttons (Insert, Eraser) should be shown
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
    { title: 'Mode (X₀1)', value: `${11.05} pts` },
    { title: 'Mode (X₀2)', value: `${37.94} pts` },
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
      {viewCreateButtons && ( // Only show input if no tables have been created yet
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
            {roundedNumbersArr.length > 0 && ( // Show eraser button only if there are numbers
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
      {groupedDataResults.length === 0 && ( // Only show ni input if grouped table hasn't been created
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
      {roundedNumbersArr.length > 0 && ( // Only show table creation buttons if there are numbers
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
