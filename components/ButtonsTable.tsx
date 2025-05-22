import React, { FC } from 'react'
import Button from './common/Button'
import { NumberFrequency } from './Main'

interface ButtonsTableProps {
  handleCreateTable: () => void
  handleClear: () => void
  className?: string
  results: Array<NumberFrequency>
}

const ButtonsTable: FC<ButtonsTableProps> = ({
  handleCreateTable,
  handleClear,
  className = 'flex',
  results,
}) => {
  return (
    <section
      className={`flex-col md:flex-row gap-2 items-center justify-center ${
        className ?? ''
      }`}
    >
      {results.length === 0 && (
        <Button
          type={'button'}
          onClick={handleCreateTable}
          className='w-full md:w-fit'
        >
          Create tables
        </Button>
      )}
      <Button type={'reset'} onClick={handleClear} className='w-full md:w-fit'>
        Clear
      </Button>
    </section>
  )
}

export default ButtonsTable
