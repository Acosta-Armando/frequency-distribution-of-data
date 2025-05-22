'use client'
import cn from 'classnames'
import { ComponentType, HTMLAttributes, ReactElement } from 'react'

interface Props {
  className?: string
  children?: any
  el?: HTMLElement | string
  clean?: boolean
  style?: React.CSSProperties
  id?: string
}

const Container = ({
  children,
  className,
  el = 'div',
  clean,
  style,
  id
}: Props): ReactElement => {
  const rootClassName = cn(className, {
    'mx-auto max-w-[1920px] px-4 md:px-8 lg:px-24 2xl:px-16': !clean
  })

  let Component: ComponentType<HTMLAttributes<HTMLDivElement>> = el as any

  return (
    <Component className={rootClassName} style={style}>
      {children}
    </Component>
  )
}

export default Container