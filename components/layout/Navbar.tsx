import React from 'react'
import Container from '../ui/Container'

const Navbar = () => {
  return (
    <nav className='bg-primary h-16 flex items-center justify-center text-white'>
      <Container>
        <h1 className='text-white font-bold text-base md:text-2xl'>
          Frequency Distribution Of Data
        </h1>
      </Container>
    </nav>
  )
}

export default Navbar
