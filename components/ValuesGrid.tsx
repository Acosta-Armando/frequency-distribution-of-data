import React, { FC } from 'react'
import Title from './common/Title'

interface ValuesGridProps {
  title: string
  numbersArray: number[]
}

const ValuesGrid: FC<ValuesGridProps> = ({ title, numbersArray }) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      <Title title={title} />
      <div className='grid grid-cols-5'>
        {numbersArray.map((number, index) => (
          <div
            key={index}
            className='border border-gray-300 flex items-center justify-center'
          >
            <p>{number}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ValuesGrid
