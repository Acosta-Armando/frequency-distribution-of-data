import React, { FC } from 'react'

interface TitleProps {
  title: string
}

const Title: FC<TitleProps> = ({title}) => {
  return <h2 className='text-semibold text-2xl'>{title}</h2>
}

export default Title
