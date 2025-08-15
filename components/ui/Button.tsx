'use client'
import React, { Children, FC, PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren {
  type: 'button' | 'reset'
  className?: string
  onClick: () => void
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({ children, type, className, onClick, disabled }) => {
  const buttonColor = type === 'button' ? 'bg-tertiary' : 'bg-error'
  return (
    <button
      className={`px-6 h-9 w-fit flex items-center justify-center rounded-xl hover:opacity-70 disabled:bg-gray-300 disabled:text-black ${buttonColor} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
