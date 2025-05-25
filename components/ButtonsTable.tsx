import React, { FC } from 'react'
import Button from './common/Button'
import { DirectDataFrequency, GroupedDataFrequency } from '@/interface'

interface ButtonsTableProps {
  handleCreateDirectTable: () => void
  handleCreateGroupedTable: () => void
  handleClear: () => void
  className?: string
  directDataResults: Array<DirectDataFrequency>
  groupedDataResults: Array<GroupedDataFrequency>
}

const ButtonsTable: FC<ButtonsTableProps> = ({
  handleCreateDirectTable,
  handleCreateGroupedTable,
  handleClear,
  className = 'flex',
  directDataResults,
  groupedDataResults,
}) => {
  return (
    <section
      className={`flex flex-col md:flex-row gap-2 items-center ${
        className ?? ''
      }`}
    >
      {directDataResults.length === 0 && (
        <Button
          type={'button'}
          onClick={handleCreateDirectTable}
          className='w-full md:w-fit'
        >
          Create Direct Data Table
        </Button>
      )}
      {groupedDataResults.length === 0 && (
        <Button
          type={'button'}
          onClick={handleCreateGroupedTable}
          className='w-full md:w-fit'
        >
          Create Grouped Data Table
        </Button>
      )}
      <Button type={'reset'} onClick={handleClear} className='w-full md:w-fit'>
        Clear All
      </Button>
    </section>
  )
}

export default ButtonsTable
