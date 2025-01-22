import React from 'react'
import {Link } from 'react-router-dom'

const Categorysheader = ({title, link}) => {
  return (
    <div className='w-full flex justify-between items-center pr-5 text-2xl'>
        <h1 className='text-3xl'>{title}</h1>
        <Link to={`/${link}`} className='text-[18px] text-[#4a5370] font-bold tracking-wider'>See all</Link>
    </div>
  )
}

export default Categorysheader