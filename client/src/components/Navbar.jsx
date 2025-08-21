import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className=' fixed top-5 w-4/5 text-platinum left-1/2 -translate-x-1/2 border-2 border-white rounded-md !p-2.5 text-xl font-lato font-bold bg-[rgba(255,255,255,0.05)] backdrop-blur-lg flex justify-between items-center z-50'>
        <Link to="/" className=''>Blogspot</Link>
        <span className='w-1/3 flex justify-around items-center'>
          <Link to="/blogs" className='relative after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-platinum after:transition-[width] after:duration-300 after:ease-in-out hover:after:w-full'>Blogs</Link>
          <Link to="/login" className='relative after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-platinum after:transition-[width] after:duration-300 after:ease-in-out hover:after:w-full'>Login/Signup</Link>
        </span>
        
    </div>
  )
}

export default Navbar